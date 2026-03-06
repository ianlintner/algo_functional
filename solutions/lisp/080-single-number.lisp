;; Problem 80: Single Number (LeetCode 136)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun single-number (nums)
  (reduce #'logxor nums :initial-value 0))
