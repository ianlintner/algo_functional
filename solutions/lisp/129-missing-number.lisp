;; Problem 129: Missing Number (LeetCode 268)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun missing-number (nums)
  (let ((n (length nums)))
    (logxor (reduce #'logxor nums :initial-value 0)
            (reduce #'logxor
              (loop for i from 0 to n collect i)
              :initial-value 0))))
