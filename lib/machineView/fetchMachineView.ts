// Fetches one of this site's own pages and returns it as markdown, for the
// per-page machine view (?view=machine). Copied from the app (Goal-APP) so
// both behave the same. It never reaches anything but this site: the path is
// appended to the request's own origin, and redirects only stay on it.
import { htmlToMachinePage } from "./htmlToMarkdown";

import { MACHINE_HEADER, MACHINE_PATH_HEADER } from "./headers";

export { MACHINE_HEADER, MACHINE_PATH_HEADER };

// Which page /api/machine was asked for: the proxy's header, the ?path= query,
// or — when the handler sees the original URL — that URL itself.
export function requestedPagePath(req: Request): string | null {
  const url = new URL(req.url);
  const raw =
    req.headers.get(MACHINE_PATH_HEADER) ??
    url.searchParams.get("path") ??
    (url.pathname !== "/api/machine" ? url.pathname + url.search : null);
  return safePagePath(raw);
}
const MAX_HOPS = 4;
const MAX_BYTES = 5 * 1024 * 1024;

// "/c/westside?tab=1" → same, or null for anything that isn't a plain page path on this site.
export function safePagePath(raw: string | null): string | null {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || /[\\\u0000-\u001f]/.test(raw)) return null;
  const base = "http://internal.invalid";
  let url: URL;
  try {
    url = new URL(raw, base);
  } catch {
    return null;
  }
  if (url.origin !== base) return null;
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/")) return null;
  url.searchParams.delete("view");
  return url.pathname + url.search;
}

export interface MachineViewResult {
  status: number;
  markdown: string;
}

export async function fetchMachineView(opts: {
  path: string;
  cookie: string | null;
  publicOrigin: string;
  origin: string;
  fetchImpl?: typeof fetch;
}): Promise<MachineViewResult> {
  const origin = opts.origin;
  const doFetch = opts.fetchImpl ?? fetch;
  let path = opts.path;

  for (let hop = 0; hop <= MAX_HOPS; hop++) {
    const res = await doFetch(origin + path, {
      redirect: "manual",
      headers: {
        accept: "text/html",
        [MACHINE_HEADER]: "1",
        ...(opts.cookie ? { cookie: opts.cookie } : {}),
      },
    });

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      const next = location ? sameSitePath(location, origin, opts.publicOrigin) : null;
      if (!next) return note(502, opts, path, "This page redirects off-site, so there is no machine view for it.");
      path = next;
      continue;
    }

    const type = res.headers.get("content-type") ?? "";
    if (!type.includes("text/html")) {
      return note(415, opts, path, `This address returns ${type || "non-HTML content"}, not a page.`);
    }
    const html = (await res.text()).slice(0, MAX_BYTES);
    let markdown = htmlToMachinePage(html, opts.publicOrigin + path);
    if (path.split("?")[0] !== opts.path.split("?")[0]) {
      markdown = redirectNote(opts.path, path) + markdown;
    }
    return { status: res.status, markdown };
  }
  return note(508, opts, path, "Too many redirects.");
}

function sameSitePath(location: string, origin: string, publicOrigin: string): string | null {
  let url: URL;
  try {
    url = new URL(location, origin);
  } catch {
    return null;
  }
  const host = url.host;
  // Next builds redirects from the request it saw, which may be the internal
  // address, localhost, or the public domain. All of those are us.
  const ours = [new URL(origin).host, new URL(publicOrigin).host];
  if (!ours.includes(host) && !/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return null;
  return safePagePath(url.pathname + url.search);
}

function redirectNote(asked: string, landed: string): string {
  const signIn = landed.startsWith("/login");
  return (
    `> Requested ${asked}, which redirected to ${landed}.` +
    (signIn ? " That page needs a signed-in Nivarro session; send the session cookie with your request." : "") +
    "\n\n"
  );
}

function note(status: number, opts: { publicOrigin: string }, path: string, message: string): MachineViewResult {
  return { status, markdown: `# Machine view unavailable\n\nURL: ${opts.publicOrigin}${path}\n\n${message}\n` };
}
