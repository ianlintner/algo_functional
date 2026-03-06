;; Problem 27: Search in Rotated Sorted Array (LeetCode 33)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 27
;; Derived from the closest existing Lisp-family reference implementation.
(define (search-rotated nums target)
  (let ((arr (coerce nums 'vector)))
    (labels ((go (lo hi)
               (if (> lo hi) -1
                 (let* ((mid (floor (+ lo hi) 2))
                        (m (aref arr mid))
                        (l (aref arr lo))
                        (h (aref arr hi)))
                   (cond ((= m target) mid)
                         ((<= l m)
                          (if (and (>= target l) (< target m))
                              (go lo (1- mid))
                              (go (1+ mid) hi)))
                         (t (if (and (> target m) (<= target h))
                                (go (1+ mid) hi)
                                (go lo (1- mid)))))))))
      (go 0 (1- (length arr))))))
