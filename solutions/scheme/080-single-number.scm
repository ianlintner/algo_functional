;; Problem 80: Single Number (LeetCode 136)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 80
;; Derived from the closest existing Lisp-family reference implementation.
(define (single-number nums)
  (reduce #'logxor nums :initial-value 0))
