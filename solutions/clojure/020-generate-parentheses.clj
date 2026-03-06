;; Problem 20: Generate Parentheses (LeetCode 22)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn generate-parenthesis [n]
  (letfn [(gen [open close current]
            (if (= (count current) (* 2 n))
              [current]
              (concat
                (when (< open n) (gen (inc open) close (str current "(")))
                (when (< close open) (gen open (inc close) (str current ")"))))))]
    (gen 0 0 "")))
