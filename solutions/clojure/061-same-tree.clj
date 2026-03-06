;; Problem 61: Same Tree (LeetCode 100)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn same-tree? [p q]
  (cond
    (and (nil? p) (nil? q)) true
    (or (nil? p) (nil? q)) false
    :else (and (= (:val p) (:val q))
               (same-tree? (:left p) (:left q))
               (same-tree? (:right p) (:right q)))))
