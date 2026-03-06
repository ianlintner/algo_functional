;; Problem 56: Subsets (LeetCode 78)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 56
;; Derived from the closest existing Lisp-family reference implementation.
(define (subsets nums)
  (reduce (lambda (acc n)
            (append acc (mapcar (lambda (s) (append s (list n))) acc)))
          nums :initial-value '(())))
