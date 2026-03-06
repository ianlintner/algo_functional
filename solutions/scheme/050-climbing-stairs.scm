;; Problem 50: Climbing Stairs (LeetCode 70)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 50
;; Derived from the closest existing Lisp-family reference implementation.
(define (climb-stairs n)
  (car (reduce (lambda (pair _)
                 (list (cadr pair) (+ (car pair) (cadr pair))))
               (make-list n) :initial-value '(1 1))))
