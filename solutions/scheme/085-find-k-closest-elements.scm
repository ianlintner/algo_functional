;; Problem 85: Find K Closest Elements (LeetCode 658)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 85
;; Derived from the closest existing Lisp-family reference implementation.
(define (find-closest-elements arr k x)
  (let ((v (coerce arr 'vector)))
    (labels ((go (lo hi)
               (if (= (- hi lo) k)
                 (coerce (subseq v lo hi) 'list)
                 (if (<= (abs (- (aref v lo) x)) (abs (- (aref v (1- hi)) x)))
                   (go lo (1- hi))
                   (go (1+ lo) hi)))))
      (go 0 (length v)))))
