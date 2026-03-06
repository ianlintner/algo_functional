;; Problem 134: Move Zeroes (LeetCode 283)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 134
;; Derived from the closest existing Lisp-family reference implementation.
(define (move-zeroes nums)
  (append (remove 0 nums) (remove-if-not #'zerop nums)))
