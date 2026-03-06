;; Problem 6: Reverse Integer (LeetCode 7)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn reverse-integer [x]
  (let [sign (if (neg? x) -1 1)
        reversed (->> (Math/abs (long x))
                      str
                      clojure.string/reverse
                      Long/parseLong
                      (* sign))
        max-int (dec (long (Math/pow 2 31)))
        min-int (- (long (Math/pow 2 31)))]
    (if (or (> reversed max-int) (< reversed min-int)) 0 reversed)))
