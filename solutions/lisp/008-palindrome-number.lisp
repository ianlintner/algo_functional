;; Problem 8: Palindrome Number (LeetCode 9)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun is-palindrome (x)
  (when (>= x 0)
    (let ((s (write-to-string x)))
      (string= s (reverse s)))))
