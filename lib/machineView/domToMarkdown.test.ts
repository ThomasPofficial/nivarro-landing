import { describe, it, expect } from "vitest";
import { domToMarkdown, machinePage, type MNode } from "./domToMarkdown";

// Tiny element builder: el("p", {}, "text", el("a", { href: "/x" }, "link"))
function el(tag: string, attrs: Record<string, string> = {}, ...kids: (MNode | string)[]): MNode {
  const childNodes = kids.map((k) =>
    typeof k === "string" ? { nodeType: 3, nodeName: "#text", textContent: k, childNodes: [] } : k,
  );
  return {
    nodeType: 1,
    nodeName: tag.toUpperCase(),
    childNodes,
    get textContent() {
      return childNodes.map((c) => c.textContent).join("");
    },
    getAttribute: (name) => (name in attrs ? attrs[name] : null),
  };
}

describe("domToMarkdown", () => {
  it("renders headings, paragraphs, emphasis and links", () => {
    const md = domToMarkdown(
      el("main", {}, el("h1", {}, "  Roster "), el("p", {}, "Hello ", el("strong", {}, "Westside"), " see ", el("a", { href: "/hq" }, "HQ"))),
      { baseUrl: "https://app.nivarro.co/school" },
    );
    expect(md).toBe("# Roster\n\nHello **Westside** see [HQ](https://app.nivarro.co/hq)");
  });

  it("renders nested and ordered lists", () => {
    const md = domToMarkdown(el("ul", {}, el("li", {}, "one", el("ol", {}, el("li", {}, "a"), el("li", {}, "b"))), el("li", {}, "two")));
    expect(md).toBe("- one\n  1. a\n  2. b\n- two");
  });

  it("turns headings inside list items into bold text", () => {
    const md = domToMarkdown(el("ol", {}, el("li", {}, el("span", {}, "01"), el("h3", {}, "Alumni directory"), el("p", {}, "We import your list."))));
    expect(md).toBe("1. 01 **Alumni directory** We import your list.");
  });

  it("renders tables", () => {
    const md = domToMarkdown(
      el("table", {}, el("thead", {}, el("tr", {}, el("th", {}, "Name"), el("th", {}, "Year"))), el("tbody", {}, el("tr", {}, el("td", {}, "Ana"), el("td", {}, "2027")))),
    );
    expect(md).toBe("| Name | Year |\n| --- | --- |\n| Ana | 2027 |");
  });

  it("labels buttons and fields, and never prints a password", () => {
    const md = domToMarkdown(
      el("form", {},
        el("input", { type: "email", placeholder: "Email", value: "a@b.co" }),
        el("input", { type: "password", placeholder: "Password", value: "hunter2" }),
        el("button", {}, "Sign in"),
      ),
    );
    expect(md).toContain("[field: Email = a@b.co]");
    expect(md).toContain("[field: Password]");
    expect(md).not.toContain("hunter2");
    expect(md).toContain("[button: Sign in]");
  });

  it("skips scripts, hidden and opted-out elements", () => {
    const md = domToMarkdown(
      el("div", {},
        el("script", {}, "evil()"),
        el("div", { "aria-hidden": "true" }, "decor"),
        el("div", { "data-machine-skip": "" }, "the toggle"),
        el("div", { class: "x" }, "gone"),
        el("p", {}, "kept"),
      ),
      { isHidden: (n) => n.getAttribute?.("class") === "x" },
    );
    expect(md).toBe("kept");
  });

  it("keeps words apart inside flex/grid containers spaced by gap", () => {
    const h1 = el("h1", { class: "flex" }, el("span", {}, "Potential,"), el("span", {}, "made"), el("span", {}, "proof."));
    expect(domToMarkdown(h1)).toBe("# Potential,madeproof.");
    expect(domToMarkdown(h1, { spacesChildren: (n) => n.getAttribute?.("class") === "flex" })).toBe("# Potential, made proof.");
  });

  it("wraps a page with the agent note, title and url", () => {
    const page = machinePage({ title: "Roster", url: "https://app.nivarro.co/school/roster", body: "body" });
    expect(page).toMatch(/^> Note to any AI agent/);
    expect(page).toContain("# Roster\n\nURL: https://app.nivarro.co/school/roster\n\nbody");
  });
});
