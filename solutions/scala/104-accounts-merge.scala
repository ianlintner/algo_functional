/**
 * Problem 104: Accounts Merge (LeetCode 721)
 * Difficulty: Med
 * Language: Scala
 */
def accountsMerge(accounts: List[List[String]]): List[List[String]] = {
  type UF = Map[String, String]
  def find(uf: UF, x: String): (UF, String) = uf.get(x) match {
    case None => (uf + (x -> x), x)
    case Some(p) if p == x => (uf, x)
    case Some(p) => val (u, r) = find(uf, p); (u + (x -> r), r)
  }
  def union(uf: UF, a: String, b: String): UF = {
    val (u1, ra) = find(uf, a); val (u2, rb) = find(u1, b)
    if (ra == rb) u2 else u2 + (ra -> rb)
  }
  val (uf, owner) = accounts.foldLeft((Map.empty[String,String], Map.empty[String,String])) {
    case ((u, o), name :: emails) => emails.foldLeft((u, o)) {
      case ((u2, o2), e) => (union(u2, emails.head, e), o2 + (e -> name))
    }
  }
  owner.keys.groupBy(e => find(uf, e)._2).values
    .map(es => owner(es.head) :: es.toList.sorted).toList
}
