;; Problem 28: Diameter of Binary Tree (LeetCode 543)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 28
;; Derived from the closest existing Lisp-family reference implementation.
;; NOTE: original Common Lisp struct retained for Scheme porting
;; (defstruct tnode val left right)

(define (diameter-of-binary-tree root)
  (labels ((dfs (node)
             (if (null node) (values 0 0)
               (multiple-value-bind (lh ld) (dfs (tnode-left node))
                 (multiple-value-bind (rh rd) (dfs (tnode-right node))
                   (values (1+ (max lh rh))
                           (max (+ lh rh) ld rd)))))))
    (nth-value 1 (dfs root))))
