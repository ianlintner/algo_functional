;; Problem 66: Construct Binary Tree from Preorder and Inorder Traversal (LeetCode 105)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 66
;; Derived from the closest existing Lisp-family reference implementation.
(define (build-tree preorder inorder)
  (when preorder
    (let* ((r (car preorder))
           (mid (position r inorder))
           (left-in (subseq inorder 0 mid))
           (right-in (subseq inorder (1+ mid)))
           (left-pre (subseq (cdr preorder) 0 mid))
           (right-pre (subseq (cdr preorder) mid)))
      (list r (build-tree left-pre left-in)
              (build-tree right-pre right-in)))))
