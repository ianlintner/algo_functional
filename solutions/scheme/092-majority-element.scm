;; Problem 92: Majority Element (LeetCode 169)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 92
;; Derived from the closest existing Lisp-family reference implementation.
(define (majority-element nums)
  (car (reduce (lambda (acc n)
                 (let ((cand (car acc)) (cnt (cadr acc)))
                   (cond ((zerop cnt) (list n 1))
                         ((= n cand) (list cand (1+ cnt)))
                         (t (list cand (1- cnt))))))
               nums :initial-value '(0 0))))
