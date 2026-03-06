;; Problem 65: Maximum Depth of Binary Tree (LeetCode 104)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun max-depth (node)
  (if (null node) 0
    (1+ (max (max-depth (cadr node))
             (max-depth (caddr node))))))
