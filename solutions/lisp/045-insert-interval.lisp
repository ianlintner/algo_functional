;; Problem 45: Insert Interval (LeetCode 57)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun insert-interval (intervals new-interval)
  (merge-intervals (cons new-interval intervals)))
