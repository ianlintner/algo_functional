/**
 * Problem 103: Implement Trie (Prefix Tree) (LeetCode 208)
 * Difficulty: Med
 * Language: Scala
 */
case class Trie(ch: Map[Char, Trie] = Map(), end: Boolean = false) {
  def insert(w: String): Trie = w.headOption match {
    case None => copy(end = true)
    case Some(c) => copy(ch = ch + (c -> ch.getOrElse(c, Trie()).insert(w.tail)))
  }
  def search(w: String): Boolean = w.headOption match {
    case None => end
    case Some(c) => ch.get(c).exists(_.search(w.tail))
  }
  def startsWith(p: String): Boolean = p.headOption match {
    case None => true
    case Some(c) => ch.get(c).exists(_.startsWith(p.tail))
  }
}
