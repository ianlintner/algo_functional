;; Problem 150: Design Hit Counter (LeetCode 362)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn new-counter [] [])
(defn hit [counter timestamp] (conj counter timestamp))
(defn get-hits [counter timestamp]
  (let [filtered (filter #(> % (- timestamp 300)) counter)]
    [(count filtered) (vec filtered)]))
