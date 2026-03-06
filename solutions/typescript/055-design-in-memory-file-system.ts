/**
 * Problem 55: Design In-Memory File System (LeetCode 588)
 * Difficulty: Hard
 * Language: TypeScript
 */
type FSNode = { children: Map<string, FSNode>; content: string };

const mkNode = (): FSNode => ({ children: new Map(), content: "" });

const navigate = (root: FSNode, parts: string[]): FSNode =>
  parts.reduce((node, p) => {
    if (!node.children.has(p)) node.children.set(p, mkNode());
    return node.children.get(p)!;
  }, root);

const parsePath = (path: string): string[] =>
  path.split("/").filter(Boolean);

class FileSystem {
  private root = mkNode();

  ls(path: string): string[] {
    const node = navigate(this.root, parsePath(path));
    if (node.content) return [parsePath(path).pop()!];
    return [...node.children.keys()].sort();
  }
  mkdir(path: string): void { navigate(this.root, parsePath(path)); }
  addContentToFile(path: string, content: string): void {
    const node = navigate(this.root, parsePath(path));
    node.content += content;
  }
  readContentFromFile(path: string): string {
    return navigate(this.root, parsePath(path)).content;
  }
}
