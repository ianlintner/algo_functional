;; Problem 45: Insert Interval (LeetCode 57)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 45
;; Derived from the closest existing Lisp-family reference implementation.
(define (insert-interval intervals new-interval)
  (merge-intervals (cons new-interval intervals)))
