;; Problem 167: K Closest Points to Origin (LeetCode 973)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 167
;; Derived from the closest existing Lisp-family reference implementation.
(define (k-closest points k)
  (subseq
    (sort (copy-seq points)
          (lambda (a b)
            (< (+ (* (first a) (first a)) (* (second a) (second a)))
               (+ (* (first b) (first b)) (* (second b) (second b))))))
    0 k))
