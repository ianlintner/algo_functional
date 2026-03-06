;; Problem 101: Reverse Linked List (LeetCode 206)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 101
;; Derived from the closest existing Lisp-family reference implementation.
(define (reverse-list lst)
  (reduce (lambda (acc x) (cons x acc)) lst
          :initial-value nil :from-end nil))
