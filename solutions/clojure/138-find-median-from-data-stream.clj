;; Problem 138: Find Median from Data Stream (LeetCode 295)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn make-median-finder [] {:lo [] :hi []})

(defn add-num [{:keys [lo hi]} num]
  (let [[lo hi] (if (or (empty? lo) (<= num (peek lo)))
                  [(conj lo num) hi]
                  [lo (into (sorted-set) (conj hi num))])
        lo (vec (sort lo))]
    (cond
      (> (count lo) (inc (count hi)))
        {:lo (vec (butlast lo)) :hi (cons (last lo) hi)}
      (> (count hi) (count lo))
        {:lo (conj lo (first hi)) :hi (vec (rest hi))}
      :else {:lo lo :hi (vec hi)})))

(defn find-median [{:keys [lo hi]}]
  (if (> (count lo) (count hi))
    (double (last lo))
    (/ (+ (double (last lo)) (double (first hi))) 2.0)))
