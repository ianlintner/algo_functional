;; Problem 123: Sliding Window Maximum (LeetCode 239)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn max-sliding-window [nums k]
  (let [n (count nums)]
    (second
      (reduce
        (fn [[dq res] i]
          (let [dq (if (and (seq dq) (<= (first dq) (- i k)))
                     (rest dq) dq)
                dq (loop [d dq]
                     (if (and (seq d) (<= (nums (last d)) (nums i)))
                       (recur (butlast d)) d))
                dq (concat dq [i])
                res (if (>= i (dec k))
                      (conj res (nums (first dq))) res)]
            [dq res]))
        ['() []]
        (range n)))))
