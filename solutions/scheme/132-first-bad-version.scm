;; Problem 132: First Bad Version (LeetCode 278)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 132
;; Derived from the closest existing Lisp-family reference implementation.
(define (first-bad-version n is-bad-fn)
  (labels ((search-fn (lo hi)
    (if (>= lo hi) lo
      (let ((mid (+ lo (floor (- hi lo) 2))))
        (if (funcall is-bad-fn mid)
          (search-fn lo mid)
          (search-fn (1+ mid) hi))))))
    (search-fn 1 n)))
