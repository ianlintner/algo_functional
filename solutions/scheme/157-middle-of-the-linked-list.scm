;; Problem 157: Middle of the Linked List (LeetCode 876)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 157
;; Derived from the closest existing Lisp-family reference implementation.
;; NOTE: original Common Lisp struct retained for Scheme porting
;; (defstruct lnode val next)
(define (middle-node head)
  (labels ((collect (n) (if (null n) nil (cons n (collect (lnode-next n))))))
    (let* ((nodes (collect head)) (mid (floor (length nodes) 2)))
      (nth mid nodes))))
