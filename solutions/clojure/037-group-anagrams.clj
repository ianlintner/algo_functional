;; Problem 37: Group Anagrams (LeetCode 49)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn group-anagrams [strs]
  (vals (group-by #(apply str (sort %)) strs)))
