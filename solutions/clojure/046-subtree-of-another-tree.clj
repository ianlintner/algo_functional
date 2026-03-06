;; Problem 46: Subtree of Another Tree (LeetCode 572)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn same-tree? [a b]
  (cond
    (and (nil? a) (nil? b)) true
    (or (nil? a) (nil? b)) false
    :else (and (= (:val a) (:val b))
               (same-tree? (:left a) (:left b))
               (same-tree? (:right a) (:right b)))))

(defn is-subtree [root sub]
  (cond
    (nil? root) (nil? sub)
    :else (or (same-tree? root sub)
              (is-subtree (:left root) sub)
              (is-subtree (:right root) sub))))
