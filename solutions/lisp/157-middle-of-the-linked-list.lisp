;; Problem 157: Middle of the Linked List (LeetCode 876)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defstruct lnode val next)
(defun middle-node (head)
  (labels ((collect (n) (if (null n) nil (cons n (collect (lnode-next n))))))
    (let* ((nodes (collect head)) (mid (floor (length nodes) 2)))
      (nth mid nodes))))
