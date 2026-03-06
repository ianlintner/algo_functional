;; Problem 56: Subsets (LeetCode 78)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn subsets [nums]
  (reduce (fn [acc n]
            (into acc (map #(conj % n) acc)))
          [[]] nums))
