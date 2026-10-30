// Server half of the machine view: rendered HTML in, markdown out. Lets an
// agent fetch any page as `?view=machine` without running a browser. Uses the
// same converter as the in-page switch, adapted to htmlparser2's tree.
import { parseDocument } from "htmlparser2";
import type { AnyNode, Element } from "domhandler";
import { domToMarkdown, machinePage, type MNode } from "./domToMarkdown";

function adapt(node: AnyNode): MNode {
  if (node.type === "text") {
    return { nodeType: 3, nodeName: "#text", textContent: node.data, childNodes: [] };
  }
  if (node.type === "root") {
    return { nodeType: 1, nodeName: "BODY", textContent: textOf(node), childNodes: node.children.map(adapt), getAttribute: () => null };
  }
  if (node.type !== "tag" && node.type !== "script" && node.type !== "style") {
    return { nodeType: 8, nodeName: "#other", textContent: "", childNodes: [] };
  }
  const el = node as Element;
  let kids: MNode[] | null = null;
  return {
    nodeType: 1,
    nodeName: el.name.toUpperCase(),
    get childNodes() {
      return (kids ??= el.children.map(adapt));
    },
    get textContent() {
      return textOf(el);
    },
    getAttribute: (name) => (name in el.attribs ? el.attribs[name] : null),
  };
}

function textOf(node: AnyNode): string {
  if (node.type === "text") return node.data;
  if ("children" in node) return node.children.map(textOf).join("");
  return "";
}

// No layout engine on the server, so read visibility and flex/grid off the
// markup: inline styles plus the Tailwind classes this app uses. Pages are
// read as a desktop browser would show them.
const SHOWN_AT_BREAKPOINT = /^(sm|md|lg|xl):(block|flex|grid|inline|inline-block|inline-flex|inline-grid|table)$/;

function classes(n: MNode): string[] {
  return (n.getAttribute?.("class") ?? "").split(/\s+/).filter(Boolean);
}

export function isHiddenByMarkup(n: MNode): boolean {
  const style = (n.getAttribute?.("style") ?? "").replace(/\s+/g, "").toLowerCase();
  if (style.includes("display:none") || style.includes("visibility:hidden")) return true;
  const cls = classes(n);
  if (cls.some((c) => /^(sm|md|lg|xl):hidden$/.test(c))) return true; // mobile-only copy
  return cls.includes("hidden") && !cls.some((c) => SHOWN_AT_BREAKPOINT.test(c));
}

export function spacesChildrenByMarkup(n: MNode): boolean {
  const style = (n.getAttribute?.("style") ?? "").replace(/\s+/g, "").toLowerCase();
  if (/display:(inline-)?(flex|grid)/.test(style)) return true;
  return classes(n).some((c) => /^(md:|lg:|sm:)?(inline-)?(flex|grid)$/.test(c));
}

function find(node: AnyNode, name: string): Element | null {
  if (node.type === "tag" && (node as Element).name === name) return node as Element;
  if ("children" in node) {
    for (const c of node.children) {
      const hit = find(c, name);
      if (hit) return hit;
    }
  }
  return null;
}

export function htmlToMachinePage(html: string, url: string): string {
  const doc = parseDocument(html);
  const title = find(doc, "title");
  const root = find(doc, "main") ?? find(doc, "body") ?? doc;
  const body = domToMarkdown(adapt(root as AnyNode), {
    baseUrl: url,
    isHidden: isHiddenByMarkup,
    spacesChildren: spacesChildrenByMarkup,
  });
  return machinePage({ title: title ? textOf(title).trim() || "Nivarro" : "Nivarro", url, body });
}
