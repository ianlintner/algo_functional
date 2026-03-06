;; Problem 169: Time Based Key-Value Store (LeetCode 981)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn time-map-new [] {})

(defn time-map-set [tm key value timestamp]
  (update tm key (fnil conj []) [timestamp value]))

(defn time-map-get [tm key timestamp]
  (let [entries (get tm key [])
        ;; entries are in insertion order (ascending timestamps)
        bsearch (fn [es lo hi]
                  (if (> lo hi) (if (>= hi 0) (second (es hi)) "")
                    (let [mid (quot (+ lo hi) 2)]
                      (if (<= (first (es mid)) timestamp)
                        (recur es (inc mid) hi)
                        (recur es lo (dec mid))))))]
    (bsearch (vec entries) 0 (dec (count entries)))))
