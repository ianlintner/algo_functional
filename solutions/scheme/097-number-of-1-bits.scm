;; Problem 97: Number of 1 Bits (LeetCode 191)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 97
;; Derived from the closest existing Lisp-family reference implementation.
(define (hamming-weight n)
  (if (zerop n) 0
    (+ (logand n 1) (hamming-weight (ash n -1)))))
