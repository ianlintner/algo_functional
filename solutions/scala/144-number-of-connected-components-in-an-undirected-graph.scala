/**
 * Problem 144: Number of Connected Components in an Undirected Graph (LeetCode 323)
 * Difficulty: Med
 * Language: Scala
 */
def countComponents(n: Int, edges: Array[Array[Int]]): Int = {
  val parent = (0 until n).toArray
  def find(x: Int): Int = {
    if (parent(x) != x) parent(x) = find(parent(x))
    parent(x)
  }
  edges.foldLeft(n) { case (count, Array(a, b)) =>
    val (ra, rb) = (find(a), find(b))
    if (ra == rb) count else { parent(ra) = rb; count - 1 }
  }
}
