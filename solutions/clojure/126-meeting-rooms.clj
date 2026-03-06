;; Problem 126: Meeting Rooms (LeetCode 252)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn can-attend-meetings [intervals]
  (let [sorted (sort-by first intervals)]
    (every? (fn [[[_ e] [s _]]] (<= e s))
            (partition 2 1 sorted))))
