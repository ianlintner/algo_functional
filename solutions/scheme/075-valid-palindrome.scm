;; Problem 75: Valid Palindrome (LeetCode 125)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 75
;; Derived from the closest existing Lisp-family reference implementation.
(define (valid-palindrome s)
  (let ((cleaned (remove-if-not #'alphanumericp (string-downcase s))))
    (string= cleaned (reverse cleaned))))
