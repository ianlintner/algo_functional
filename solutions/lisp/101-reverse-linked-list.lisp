;; Problem 101: Reverse Linked List (LeetCode 206)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun reverse-list (lst)
  (reduce (lambda (acc x) (cons x acc)) lst
          :initial-value nil :from-end nil))
