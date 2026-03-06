/**
 * Problem 55: Design In-Memory File System (LeetCode 588)
 * Difficulty: Hard
 * Language: Scala
 */
case class FSNode(
  children: Map[String, FSNode] = Map.empty,
  content: String = ""
)

class FileSystem {
  private var root = FSNode()

  def ls(path: String): List[String] = {
    val parts = path.split("/").filter(_.nonEmpty)
    val node = parts.foldLeft(root)((n, p) => n.children.getOrElse(p, FSNode()))
    if (node.content.nonEmpty) List(parts.last)
    else node.children.keys.toList.sorted
  }

  def mkdir(path: String): Unit = { root = ensurePath(root, parsePath(path)) }

  def addContentToFile(path: String, content: String): Unit = {
    root = updateAt(root, parsePath(path), n => n.copy(content = n.content + content))
  }

  def readContentFromFile(path: String): String =
    parsePath(path).foldLeft(root)((n, p) => n.children(p)).content

  private def parsePath(p: String) = p.split("/").filter(_.nonEmpty).toList
  private def ensurePath(node: FSNode, parts: List[String]): FSNode = parts match {
    case Nil => node
    case h :: t =>
      val child = node.children.getOrElse(h, FSNode())
      node.copy(children = node.children + (h -> ensurePath(child, t)))
  }
  private def updateAt(node: FSNode, parts: List[String], f: FSNode => FSNode): FSNode =
    parts match {
      case h :: Nil =>
        val child = node.children.getOrElse(h, FSNode())
        node.copy(children = node.children + (h -> f(child)))
      case h :: t =>
        val child = node.children.getOrElse(h, FSNode())
        node.copy(children = node.children + (h -> updateAt(child, t, f)))
      case Nil => f(node)
    }
}
