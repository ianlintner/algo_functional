/**
 * Problem 158: Random Pick with Weight (LeetCode 528)
 * Difficulty: Med
 * Language: Scala
 */
class WeightedPicker(w: Array[Int]) {
  private val prefix = w.scanLeft(0)(_ + _).tail
  def pickIndex(): Int = {
    val target = scala.util.Random.nextInt(prefix.last) + 1
    def search(lo: Int, hi: Int): Int =
      if (lo >= hi) lo
      else { val mid = (lo + hi) / 2
        if (prefix(mid) < target) search(mid + 1, hi) else search(lo, mid) }
    search(0, prefix.length - 1)
  }
}
