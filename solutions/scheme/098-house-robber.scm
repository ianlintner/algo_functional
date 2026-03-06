;; Problem 98: House Robber (LeetCode 198)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 98
;; Derived from the closest existing Lisp-family reference implementation.
(define (rob nums)
  (car (reduce (lambda (acc n)
                 (list (max (car acc) (+ (cadr acc) n)) (car acc)))
               nums :initial-value '(0 0))))
