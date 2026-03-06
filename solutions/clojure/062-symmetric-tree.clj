;; Problem 62: Symmetric Tree (LeetCode 101)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn symmetric? [root]
  (letfn [(mirror [a b]
            (cond
              (and (nil? a) (nil? b)) true
              (or (nil? a) (nil? b)) false
              :else (and (= (:val a) (:val b))
                         (mirror (:left a) (:right b))
                         (mirror (:right a) (:left b)))))]
    (or (nil? root) (mirror (:left root) (:right root)))))
