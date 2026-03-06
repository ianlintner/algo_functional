;; Problem 117: Kth Smallest Element in a BST (LeetCode 230)
;; Difficulty: Med
;; Language: Lisp
;; 
(defstruct bst-node val left right)

(defun kth-smallest (root k)
  (labels ((inorder (node)
             (if (null node) nil
               (append (inorder (bst-node-left node))
                       (list (bst-node-val node))
                       (inorder (bst-node-right node))))))
    (nth (1- k) (inorder root))))
