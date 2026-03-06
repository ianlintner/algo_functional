;; Problem 35: Permutations (LeetCode 46)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn permute [nums]
  (if (empty? nums) [[]]
    (mapcat (fn [i]
              (let [n (nth nums i)
                    rest (concat (take i nums) (drop (inc i) nums))]
                (map #(into [n] %) (permute rest))))
            (range (count nums)))))
