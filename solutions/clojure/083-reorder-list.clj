;; Problem 83: Reorder List (LeetCode 143)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn reorder-list [lst]
  (let [mid (quot (count lst) 2)
        first (take mid lst)
        second (reverse (drop mid lst))]
    (letfn [(merge [a b]
              (cond (empty? a) b
                    (empty? b) a
                    :else (concat [(first a) (first b)]
                                  (merge (rest a) (rest b)))))]
      (merge first second))))
