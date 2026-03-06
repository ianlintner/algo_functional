;; Problem 72: Smallest Range Covering Elements from K Lists (LeetCode 632)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn smallest-range [nums]
  (let [tagged (sort-by first (mapcat (fn [i lst] (map #(vector % i) lst))
                                      (range) nums))
        k (count nums)]
    (loop [idx 0 left 0 counts {} covered 0 best [Integer/MIN_VALUE Integer/MAX_VALUE]]
      (if (>= idx (count tagged)) best
        (let [[v g] (nth tagged idx)
              c2 (update counts g (fnil inc 0))
              cov2 (if (zero? (get counts g 0)) (inc covered) covered)]
          (letfn [(shrink [l cs cv b]
                    (if (< cv k) [l cs cv b]
                      (let [[lv lg] (nth tagged l)
                            nb (if (< (- v lv) (- (second b) (first b))) [lv v] b)
                            cs2 (update cs lg dec)
                            cv2 (if (zero? (cs2 lg)) (dec cv) cv)]
                        (shrink (inc l) cs2 cv2 nb))))]
            (let [[l2 c3 cov3 b2] (shrink left c2 cov2 best)]
              (recur (inc idx) l2 c3 cov3 b2))))))))
