;; Problem 164: Non-overlapping Intervals (LeetCode 435)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 164
;; Derived from the closest existing Lisp-family reference implementation.
(define (erase-overlap-intervals intervals)
  (let ((sorted (sort (copy-seq intervals) #'< :key #'second))
        (count 0) (end most-negative-fixnum))
    (dolist (iv sorted count)
      (if (< (first iv) end)
        (incf count)
        (setf end (second iv))))))
