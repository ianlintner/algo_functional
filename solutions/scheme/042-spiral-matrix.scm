;; Problem 42: Spiral Matrix (LeetCode 54)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 42
;; Derived from the closest existing Lisp-family reference implementation.
(define (spiral-order matrix)
  (when matrix
    (append (car matrix)
            (spiral-order (rotate-matrix (cdr matrix))))))
(define (rotate-matrix m)
  (when (and m (car m))
    (apply #'mapcar (lambda (&rest cols) (reverse cols)) m)))
