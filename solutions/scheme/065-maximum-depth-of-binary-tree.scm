;; Problem 65: Maximum Depth of Binary Tree (LeetCode 104)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 65
;; Derived from the closest existing Lisp-family reference implementation.
(define (max-depth node)
  (if (null node) 0
    (1+ (max (max-depth (cadr node))
             (max-depth (caddr node))))))
