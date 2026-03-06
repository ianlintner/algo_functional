;; Problem 25: Next Permutation (LeetCode 31)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn next-permutation [nums]
  (let [n (count nums)
        v (vec nums)
        i (loop [i (- n 2)]
            (cond
              (< i 0) nil
              (< (v i) (v (inc i))) i
              :else (recur (dec i))))]
    (if (nil? i)
      (vec (reverse v))
      (let [j (loop [j (dec n)]
                (if (> (v j) (v i)) j (recur (dec j))))
            swapped (assoc v i (v j) j (v i))]
        (vec (concat (subvec swapped 0 (inc i))
                     (reverse (subvec swapped (inc i)))))))))
