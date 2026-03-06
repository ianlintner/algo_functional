;; Problem 155: Ransom Note (LeetCode 383)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn can-construct [ransom magazine]
  (let [freq (frequencies magazine)]
    (second (reduce (fn [[f ok] ch]
              (let [cnt (get f ch 0)]
                [(update f ch (fnil dec 0)) (and ok (pos? cnt))]))
            [freq true] ransom))))
