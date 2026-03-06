;; Problem 135: Inorder Successor in BST (LeetCode 285)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 135
;; Derived from the closest existing Lisp-family reference implementation.
(define (inorder-successor root p)
  (cond
    ((null root) nil)
    ((> (node-val root) p)
     (or (inorder-successor (node-left root) p) (node-val root)))
    (t (inorder-successor (node-right root) p))))
