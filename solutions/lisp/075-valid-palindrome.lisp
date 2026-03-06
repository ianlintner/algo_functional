;; Problem 75: Valid Palindrome (LeetCode 125)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun valid-palindrome (s)
  (let ((cleaned (remove-if-not #'alphanumericp (string-downcase s))))
    (string= cleaned (reverse cleaned))))
