/**
 * Problem 162: Maximum Frequency Stack (LeetCode 895)
 * Difficulty: Hard
 * Language: Scala
 */
case class FreqStack(freq: Map[Int, Int] = Map(),
                      group: Map[Int, List[Int]] = Map(),
                      maxFreq: Int = 0) {
  def push(v: Int): FreqStack = {
    val f = freq.getOrElse(v, 0) + 1
    FreqStack(freq.updated(v, f),
              group.updated(f, v :: group.getOrElse(f, Nil)),
              math.max(maxFreq, f))
  }
  def pop: (Int, FreqStack) = {
    val v :: rest = group(maxFreq): @unchecked
    val g2 = if (rest.isEmpty) group - maxFreq else group.updated(maxFreq, rest)
    val mf2 = if (rest.isEmpty) maxFreq - 1 else maxFreq
    (v, FreqStack(freq.updated(v, freq(v) - 1), g2, mf2))
  }
}
