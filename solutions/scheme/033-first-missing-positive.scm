;; Problem 33: First Missing Positive (LeetCode 41)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 33
;; Derived from the closest existing Lisp-family reference implementation.
(define (first-missing-positive nums)
  (let ((s (make-hash-table)))
    (dolist (n nums)
      (when (> n 0) (setf (gethash n s) t)))
    (loop for i from 1
          unless (gethash i s) return i)))
