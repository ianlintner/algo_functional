;; Problem 98: House Robber (LeetCode 198)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun rob (nums)
  (car (reduce (lambda (acc n)
                 (list (max (car acc) (+ (cadr acc) n)) (car acc)))
               nums :initial-value '(0 0))))
