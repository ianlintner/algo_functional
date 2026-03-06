;; Problem 74: Binary Tree Maximum Path Sum (LeetCode 124)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 74
;; Derived from the closest existing Lisp-family reference implementation.
(define (max-path-sum tree)
  (labels ((go (node)
             (if (null node) (list 0 most-negative-fixnum)
               (let* ((v (car node))
                      (lr (go (cadr node))) (rr (go (caddr node)))
                      (lg (first lr)) (lm (second lr))
                      (rg (first rr)) (rm (second rr))
                      (gain (max 0 (+ v (max lg rg))))
                      (pmax (max lm rm (+ v lg rg))))
                 (list gain pmax)))))
    (second (go tree))))
