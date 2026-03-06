;; Problem 7: String to Integer (atoi) (LeetCode 8)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn my-atoi [s]
  (let [trimmed (clojure.string/triml s)
        [sign rest] (cond
                      (.startsWith trimmed "-") [-1 (subs trimmed 1)]
                      (.startsWith trimmed "+") [1 (subs trimmed 1)]
                      :else [1 trimmed])
        digits (take-while #(Character/isDigit %) rest)
        value (reduce (fn [acc d]
                        (min (+ (* acc 10) (Character/getNumericValue d))
                             (inc Integer/MAX_VALUE)))
                      0 digits)
        result (* sign value)
        min-int (- (long (Math/pow 2 31)))
        max-int (dec (long (Math/pow 2 31)))]
    (max min-int (min max-int result))))
