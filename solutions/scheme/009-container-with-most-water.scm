;; Problem 9: Container With Most Water (LeetCode 11)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 9
;; Derived from the closest existing Lisp-family reference implementation.
(define (max-area height)
  (let ((h (coerce height 'vector)))
    (labels ((solve (l r best)
               (if (>= l r) best
                   (let* ((area (* (min (aref h l) (aref h r)) (- r l)))
                          (new-best (max best area)))
                     (if (< (aref h l) (aref h r))
                         (solve (1+ l) r new-best)
                         (solve l (1- r) new-best))))))
      (solve 0 (1- (length h)) 0))))
