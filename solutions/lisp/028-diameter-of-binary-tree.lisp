;; Problem 28: Diameter of Binary Tree (LeetCode 543)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defstruct tnode val left right)

(defun diameter-of-binary-tree (root)
  (labels ((dfs (node)
             (if (null node) (values 0 0)
               (multiple-value-bind (lh ld) (dfs (tnode-left node))
                 (multiple-value-bind (rh rd) (dfs (tnode-right node))
                   (values (1+ (max lh rh))
                           (max (+ lh rh) ld rd)))))))
    (nth-value 1 (dfs root))))
