/**
 * Problem 106: Design Add and Search Words Data Structure (LeetCode 211)
 * Difficulty: Med
 * Language: Scala
 */
case class WordDict(ch: Map[Char, WordDict] = Map(), end: Boolean = false) {
  def add(w: String): WordDict = w.headOption match {
    case None => copy(end = true)
    case Some(c) => copy(ch = ch + (c -> ch.getOrElse(c, WordDict()).add(w.tail)))
  }
  def search(w: String): Boolean = w.headOption match {
    case None => end
    case Some('.') => ch.values.exists(_.search(w.tail))
    case Some(c) => ch.get(c).exists(_.search(w.tail))
  }
}
