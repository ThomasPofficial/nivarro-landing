import { describe, it, expect, vi } from "vitest";
import { fetchMachineView, safePagePath } from "./fetchMachineView";
import { htmlToMachinePage } from "./htmlToMarkdown";

const ORIGIN = "http://127.0.0.1:10000";
const PUBLIC = "https://app.nivarro.co";

function html(body: string, title = "Nivarro") {
  return `<!doctype html><html><head><title>${title}</title></head><body><nav>Sidebar</nav><main>${body}</main></body></html>`;
}

function fakeFetch(pages: Record<string, Response | (() => Response)>) {
  return vi.fn(async (url: string | URL | Request) => {
    const path = String(url).replace(ORIGIN, "");
    const page = pages[path];
    if (!page) return new Response("missing", { status: 404, headers: { "content-type": "text/html" } });
    return typeof page === "function" ? page() : page;
  }) as unknown as typeof fetch & ReturnType<typeof vi.fn>;
}

const htmlRes = (body: string, status = 200) =>
  new Response(body, { status, headers: { "content-type": "text/html; charset=utf-8" } });
const redirect = (location: string) => new Response(null, { status: 307, headers: { location } });

describe("safePagePath", () => {
  it("keeps plain page paths and drops view=machine", () => {
    expect(safePagePath("/c/westside?view=machine&tab=2")).toBe("/c/westside?tab=2");
    expect(safePagePath("/login")).toBe("/login");
  });
  it("refuses anything that could leave this server or hit internals", () => {
    for (const p of [null, "", "https://evil.test/", "//evil.test/x", "/\\evil.test", "/api/hq/history", "/_next/static/x.js", "c/x", "/x\u0000"]) {
      expect(safePagePath(p as string | null), String(p)).toBeNull();
    }
  });
});

describe("fetchMachineView", () => {
  it("fetches the page with the caller's cookie and returns its <main> as markdown", async () => {
    const f = fakeFetch({ "/trust": htmlRes(html("<h1>Trust</h1><p>We encrypt data.</p>", "Trust | Nivarro")) });
    const out = await fetchMachineView({ path: "/trust", cookie: "authjs.session-token=abc", publicOrigin: PUBLIC, origin: ORIGIN, fetchImpl: f });
    expect(out.status).toBe(200);
    expect(out.markdown).toContain("# Trust | Nivarro");
    expect(out.markdown).toContain("URL: https://app.nivarro.co/trust");
    expect(out.markdown).toContain("# Trust\n\nWe encrypt data.");
    expect(out.markdown).not.toContain("Sidebar");
    const init = f.mock.calls[0][1] as RequestInit;
    expect((init.headers as Record<string, string>).cookie).toBe("authjs.session-token=abc");
    expect((init.headers as Record<string, string>)["x-nivarro-machine"]).toBe("1");
    expect(init.redirect).toBe("manual");
  });

  it("follows a login redirect and says sign-in is needed", async () => {
    const f = fakeFetch({
      "/hq": redirect(`${PUBLIC}/login`),
      "/login": htmlRes(html("<h2>Welcome back</h2>")),
    });
    const out = await fetchMachineView({ path: "/hq", cookie: null, publicOrigin: PUBLIC, origin: ORIGIN, fetchImpl: f });
    expect(out.markdown).toMatch(/^> Requested \/hq, which redirected to \/login\. That page needs a signed-in Nivarro session/);
    expect(out.markdown).toContain("## Welcome back");
    expect(f).toHaveBeenCalledTimes(2);
    expect(String(f.mock.calls[1][0])).toBe(`${ORIGIN}/login`);
  });

  it("never follows a redirect to another site", async () => {
    const f = fakeFetch({ "/out": redirect("https://evil.test/steal") });
    const out = await fetchMachineView({ path: "/out", cookie: "c=1", publicOrigin: PUBLIC, origin: ORIGIN, fetchImpl: f });
    expect(out.status).toBe(502);
    expect(f).toHaveBeenCalledTimes(1);
  });

  it("stops on redirect loops", async () => {
    const f = fakeFetch({ "/a": () => redirect("/b"), "/b": () => redirect("/a") });
    const out = await fetchMachineView({ path: "/a", cookie: null, publicOrigin: PUBLIC, origin: ORIGIN, fetchImpl: f });
    expect(out.status).toBe(508);
  });

  it("refuses non-HTML responses", async () => {
    const f = fakeFetch({ "/x": new Response("{}", { headers: { "content-type": "application/json" } }) });
    const out = await fetchMachineView({ path: "/x", cookie: null, publicOrigin: PUBLIC, origin: ORIGIN, fetchImpl: f });
    expect(out.status).toBe(415);
  });
});

describe("htmlToMachinePage", () => {
  it("drops Tailwind-hidden and mobile-only copies, keeps desktop ones", () => {
    const md = htmlToMachinePage(
      html('<p class="hidden">never</p><p class="md:hidden">mobile copy</p><p class="hidden md:block">desktop copy</p><p style="display: none">gone</p>'),
      `${PUBLIC}/x`,
    );
    expect(md).toContain("desktop copy");
    expect(md).not.toMatch(/never|mobile copy|gone/);
  });

  it("keeps words apart in flex rows and skips scripts", () => {
    const md = htmlToMachinePage(
      html('<div style="display:flex;gap:10px"><span>Active</span><span>288 members</span></div><script>window.x=1</script><div class="flex gap-2"><b>A</b><b>B</b></div>'),
      `${PUBLIC}/x`,
    );
    expect(md).toContain("Active 288 members");
    expect(md).toContain("**A** **B**");
    expect(md).not.toContain("window.x");
  });

  it("falls back to <body> when a page has no <main>", () => {
    const md = htmlToMachinePage("<html><body><h1>Hi</h1></body></html>", `${PUBLIC}/x`);
    expect(md).toContain("# Hi");
  });
});

describe("requestedPagePath", () => {
  it("reads the proxy's header first, then ?path=, then the original URL", async () => {
    const { requestedPagePath } = await import("./fetchMachineView");
    expect(requestedPagePath(new Request("https://x.test/api/machine?path=/b", { headers: { "x-nivarro-machine-path": "/a?view=machine" } }))).toBe("/a");
    expect(requestedPagePath(new Request("https://x.test/api/machine?path=/b"))).toBe("/b");
    expect(requestedPagePath(new Request("https://x.test/trust?view=machine"))).toBe("/trust");
    expect(requestedPagePath(new Request("https://x.test/api/machine"))).toBeNull();
    expect(requestedPagePath(new Request("https://x.test/api/machine", { headers: { "x-nivarro-machine-path": "https://evil.test/" } }))).toBeNull();
  });
});
