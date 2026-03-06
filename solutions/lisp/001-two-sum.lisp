;; Problem 1: Two Sum (LeetCode 1)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun two-sum (nums target)
  (let ((seen (make-hash-table)))
    (loop for num across nums
          for i from 0
          for complement = (- target num)
          when (gethash complement seen)
            return (list (gethash complement seen) i)
          do (setf (gethash num seen) i))))
