;; Problem 50: Climbing Stairs (LeetCode 70)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun climb-stairs (n)
  (car (reduce (lambda (pair _)
                 (list (cadr pair) (+ (car pair) (cadr pair))))
               (make-list n) :initial-value '(1 1))))
