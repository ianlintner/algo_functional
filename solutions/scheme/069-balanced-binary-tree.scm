;; Problem 69: Balanced Binary Tree (LeetCode 110)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 69
;; Derived from the closest existing Lisp-family reference implementation.
(define (balanced-p root)
  (labels ((height (node)
             (if (null node) 0
               (let ((l (height (cadr node)))
                     (r (height (caddr node))))
                 (if (or (= l -1) (= r -1) (> (abs (- l r)) 1)) -1
                   (1+ (max l r)))))))
    (/= (height root) -1)))
