;; Problem 104: Accounts Merge (LeetCode 721)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn accounts-merge [accounts]
  (letfn [(find [uf x]
            (let [p (get uf x x)]
              (if (= p x) [uf x]
                (let [[uf' r] (find uf p)] [(assoc uf' x r) r]))))
          (union [uf a b]
            (let [[u1 ra] (find uf a) [u2 rb] (find u1 b)]
              (if (= ra rb) u2 (assoc u2 ra rb))))]
    (let [[uf owner] (reduce (fn [[u o] [name & emails]]
                               (reduce (fn [[u2 o2] e]
                                         [(union u2 (first emails) e) (assoc o2 e name)])
                                       [u o] emails))
                             [{} {}] accounts)
          groups (reduce (fn [g e]
                           (let [[_ r] (find uf e)]
                             (update g r (fnil conj []) e)))
                         {} (keys owner))]
      (map (fn [es] (cons (owner (first es)) (sort es))) (vals groups)))))
