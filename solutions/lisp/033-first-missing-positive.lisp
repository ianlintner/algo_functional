;; Problem 33: First Missing Positive (LeetCode 41)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defun first-missing-positive (nums)
  (let ((s (make-hash-table)))
    (dolist (n nums)
      (when (> n 0) (setf (gethash n s) t)))
    (loop for i from 1
          unless (gethash i s) return i)))
