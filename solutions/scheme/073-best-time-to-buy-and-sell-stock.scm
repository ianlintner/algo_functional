;; Problem 73: Best Time to Buy and Sell Stock (LeetCode 121)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 73
;; Derived from the closest existing Lisp-family reference implementation.
(define (max-profit prices)
  (cdr (reduce (lambda (acc p)
                 (cons (min (car acc) p) (max (cdr acc) (- p (car acc)))))
               prices :initial-value (cons most-positive-fixnum 0))))
