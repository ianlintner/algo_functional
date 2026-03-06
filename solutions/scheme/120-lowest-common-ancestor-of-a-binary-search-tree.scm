;; Problem 120: Lowest Common Ancestor of a Binary Search Tree (LeetCode 235)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 120
;; Derived from the closest existing Lisp-family reference implementation.
(define (lca-bst root p q)
  (cond
    ((null root) nil)
    ((and (< p (bst-node-val root)) (< q (bst-node-val root)))
     (lca-bst (bst-node-left root) p q))
    ((and (> p (bst-node-val root)) (> q (bst-node-val root)))
     (lca-bst (bst-node-right root) p q))
    (t (bst-node-val root))))
