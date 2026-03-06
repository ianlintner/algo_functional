;; Problem 113: Basic Calculator (LeetCode 224)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn calculate [s]
  (let [chars (vec (remove #(= % \space) s))]
    (letfn [(parse [i] (go i 0 1))
            (go [i result sign]
              (cond
                (>= i (count chars)) [result i]
                (= (chars i) \)) [result (inc i)]
                (= (chars i) \+) (go (inc i) result 1)
                (= (chars i) \-) (go (inc i) result -1)
                (= (chars i) \() (let [[v ni] (parse (inc i))]
                                    (go ni (+ result (* sign v)) 1))
                :else (let [[num ni] (read-num i 0)]
                        (go ni (+ result (* sign num)) 1))))
            (read-num [i acc]
              (if (and (< i (count chars))
                       (Character/isDigit (chars i)))
                (read-num (inc i)
                  (+ (* acc 10) (Character/digit (chars i) 10)))
                [acc i]))]
      (first (parse 0)))))
