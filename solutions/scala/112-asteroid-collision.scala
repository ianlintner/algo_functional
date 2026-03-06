/**
 * Problem 112: Asteroid Collision (LeetCode 735)
 * Difficulty: Med
 * Language: Scala
 */
def asteroidCollision(asteroids: Array[Int]): Array[Int] = {
  def resolve(stack: List[Int], a: Int): List[Int] = stack match {
    case Nil => List(a)
    case top :: rest if a > 0 || top < 0 => a :: stack
    case top :: rest if top == -a => rest
    case top :: rest if top < -a => resolve(rest, a)
    case _ => stack
  }
  asteroids.foldLeft(List.empty[Int])((s, a) =>
    resolve(s, a)).reverse.toArray
}
