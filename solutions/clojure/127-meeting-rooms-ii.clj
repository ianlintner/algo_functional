;; Problem 127: Meeting Rooms II (LeetCode 253)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn min-meeting-rooms [intervals]
  (let [starts (sort (map first intervals))
        ends (sort (map second intervals))]
    (loop [ss starts es ends rooms 0 max-r 0]
      (if (empty? ss) max-r
        (if (< (first ss) (first es))
          (recur (rest ss) es (inc rooms) (max max-r (inc rooms)))
          (recur (rest ss) (rest es) rooms max-r))))))
