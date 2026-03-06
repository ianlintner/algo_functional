;; Problem 117: Kth Smallest Element in a BST (LeetCode 230)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 117
;; Derived from the closest existing Lisp-family reference implementation.
;; NOTE: original Common Lisp struct retained for Scheme porting
;; (defstruct bst-node val left right)

(define (kth-smallest root k)
  (labels ((inorder (node)
             (if (null node) nil
               (append (inorder (bst-node-left node))
                       (list (bst-node-val node))
                       (inorder (bst-node-right node))))))
    (nth (1- k) (inorder root))))
