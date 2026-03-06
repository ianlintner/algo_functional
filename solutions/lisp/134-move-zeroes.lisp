;; Problem 134: Move Zeroes (LeetCode 283)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun move-zeroes (nums)
  (append (remove 0 nums) (remove-if-not #'zerop nums)))
