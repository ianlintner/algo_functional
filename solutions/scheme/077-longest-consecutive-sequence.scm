;; Problem 77: Longest Consecutive Sequence (LeetCode 128)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 77
;; Derived from the closest existing Lisp-family reference implementation.
(define (longest-consecutive nums)
  (let ((s (make-hash-table)))
    (dolist (n nums) (setf (gethash n s) t))
    (let ((mx 0))
      (maphash (lambda (n _)
                 (unless (gethash (1- n) s)
                   (setf mx (max mx (loop for i from n while (gethash i s) count t)))))
               s)
      mx)))
