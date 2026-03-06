;; Problem 114: Invert Binary Tree (LeetCode 226)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 114
;; Derived from the closest existing Lisp-family reference implementation.
(define (invert-tree root)
  (when root
    (list (car root)
          (invert-tree (caddr root))
          (invert-tree (cadr root)))))
