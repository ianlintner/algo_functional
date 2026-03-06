;; Problem 68: Task Scheduler (LeetCode 621)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 68
;; Derived from the closest existing Lisp-family reference implementation.
(define (least-interval tasks n)
  (let* ((freq (make-hash-table))
         (_ (dolist (t tasks) (incf (gethash t freq 0))))
         (freqs (loop for v being the hash-values of freq collect v))
         (max-freq (apply #'max freqs))
         (max-count (count max-freq freqs)))
    (max (length tasks) (+ (* (1- max-freq) (1+ n)) max-count))))
