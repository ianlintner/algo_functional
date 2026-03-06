;; Problem 114: Invert Binary Tree (LeetCode 226)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun invert-tree (root)
  (when root
    (list (car root)
          (invert-tree (caddr root))
          (invert-tree (cadr root)))))
