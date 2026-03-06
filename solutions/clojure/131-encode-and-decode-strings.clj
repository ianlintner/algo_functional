;; Problem 131: Encode and Decode Strings (LeetCode 271)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn encode [strs]
  (reduce (fn [acc s] (str acc (count s) "#" s)) "" strs))

(defn decode [s]
  (loop [i 0 acc []]
    (if (>= i (count s)) acc
      (let [hash (.indexOf s "#" i)
            len (Integer/parseInt (subs s i hash))
            word (subs s (inc hash) (+ (inc hash) len))]
        (recur (+ (inc hash) len) (conj acc word))))))
