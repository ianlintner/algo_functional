;; Problem 90: Find Minimum in Rotated Sorted Array (LeetCode 153)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 90
;; Derived from the closest existing Lisp-family reference implementation.
(define (find-min nums)
  (let ((v (coerce nums 'vector)))
    (labels ((go (lo hi)
               (if (= lo hi) (aref v lo)
                 (let ((mid (floor (+ lo hi) 2)))
                   (if (> (aref v mid) (aref v hi))
                     (go (1+ mid) hi) (go lo mid))))))
      (go 0 (1- (length v))))))
