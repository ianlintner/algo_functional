;; Problem 38: Pow(x, n) (LeetCode 50)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 38
;; Derived from the closest existing Lisp-family reference implementation.
(define (my-pow x n)
  (cond
    ((zerop n) 1.0d0)
    ((< n 0) (my-pow (/ 1.0d0 x) (- n)))
    ((evenp n) (my-pow (* x x) (/ n 2)))
    (t (* x (my-pow (* x x) (floor n 2))))))
