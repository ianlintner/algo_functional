/**
 * Problem 111: Flood Fill (LeetCode 733)
 * Difficulty: Easy
 * Language: Scala
 */
def floodFill(image: Array[Array[Int]], sr: Int, sc: Int,
              color: Int): Array[Array[Int]] = {
  val orig = image(sr)(sc)
  if (orig == color) return image
  def fill(img: Vector[Vector[Int]], r: Int, c: Int): Vector[Vector[Int]] = {
    if (r < 0 || r >= img.length || c < 0 || c >= img(0).length) img
    else if (img(r)(c) != orig) img
    else {
      val updated = img.updated(r, img(r).updated(c, color))
      List((-1,0),(1,0),(0,-1),(0,1)).foldLeft(updated) {
        case (im, (dr, dc)) => fill(im, r+dr, c+dc)
      }
    }
  }
  fill(image.map(_.toVector).toVector, sr, sc).map(_.toArray).toArray
}
