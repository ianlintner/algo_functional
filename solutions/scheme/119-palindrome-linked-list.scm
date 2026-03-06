;; Problem 119: Palindrome Linked List (LeetCode 234)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 119
;; Derived from the closest existing Lisp-family reference implementation.
(define (palindrome-list-p xs) (equal xs (reverse xs)))
