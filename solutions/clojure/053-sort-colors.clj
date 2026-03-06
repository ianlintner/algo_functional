;; Problem 53: Sort Colors (LeetCode 75)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn sort-colors [nums]
  (let [freqs (frequencies nums)]
    (concat (repeat (get freqs 0 0) 0)
            (repeat (get freqs 1 0) 1)
            (repeat (get freqs 2 0) 2))))
