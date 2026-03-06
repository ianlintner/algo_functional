;; Problem 109: Contains Duplicate (LeetCode 217)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn contains-duplicate [nums]
  (not= (count nums) (count (set nums))))
