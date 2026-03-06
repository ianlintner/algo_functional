;; Problem 52: Search a 2D Matrix (LeetCode 74)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 52
;; Derived from the closest existing Lisp-family reference implementation.
(define (search-matrix matrix target)
  (let ((flat (apply #'append matrix)))
    (labels ((go (lo hi)
               (when (<= lo hi)
                 (let* ((mid (floor (+ lo hi) 2))
                        (v (nth mid flat)))
                   (cond ((= v target) t)
                         ((< v target) (go (1+ mid) hi))
                         (t (go lo (1- mid))))))))
      (go 0 (1- (length flat))))))
