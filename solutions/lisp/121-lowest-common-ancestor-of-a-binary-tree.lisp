;; Problem 121: Lowest Common Ancestor of a Binary Tree (LeetCode 236)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun lca (root p q)
  (cond
    ((null root) nil)
    ((or (= (bst-node-val root) p) (= (bst-node-val root) q)) root)
    (t (let ((left (lca (bst-node-left root) p q))
             (right (lca (bst-node-right root) p q)))
         (cond
           ((and left right) root)
           (left left)
           (t right))))))
