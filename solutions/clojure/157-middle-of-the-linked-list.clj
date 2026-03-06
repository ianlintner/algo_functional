;; Problem 157: Middle of the Linked List (LeetCode 876)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn middle-node [head]
  (let [nodes (loop [n head acc []]
                (if (nil? n) acc
                  (recur (:next n) (conj acc n))))]
    (nth nodes (quot (count nodes) 2) nil)))
