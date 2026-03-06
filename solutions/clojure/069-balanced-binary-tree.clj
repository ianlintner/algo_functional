;; Problem 69: Balanced Binary Tree (LeetCode 110)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn balanced? [root]
  (letfn [(height [node]
            (if (nil? node) 0
              (let [l (height (:left node))
                    r (height (:right node))]
                (if (or (= l -1) (= r -1) (> (abs (- l r)) 1)) -1
                  (inc (max l r))))))]
    (not= (height root) -1)))
