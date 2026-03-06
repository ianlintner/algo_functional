;; Problem 58: Largest Rectangle in Histogram (LeetCode 84)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn largest-rectangle-area [heights]
  (let [n (count heights)]
    (loop [i 0 stack [] max-a 0]
      (if (= i n)
        (loop [s stack m max-a]
          (if (empty? s) m
            (let [[top & rest] s
                  w (if (empty? rest) n (- n (first rest) 1))]
              (recur rest (max m (* (nth heights top) w))))))
        (if (and (seq stack) (> (nth heights (first stack)) (nth heights i)))
          (let [[top & rest] stack
                w (if (empty? rest) i (- i (first rest) 1))]
            (recur i rest (max max-a (* (nth heights top) w))))
          (recur (inc i) (cons i stack) max-a))))))
