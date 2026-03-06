;; Problem 61: Same Tree (LeetCode 100)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 61
;; Derived from the closest existing Lisp-family reference implementation.
(define (same-tree-p p q)
  (cond
    ((and (null p) (null q)) t)
    ((or (null p) (null q)) nil)
    (t (and (= (car p) (car q))
            (same-tree-p (cadr p) (cadr q))
            (same-tree-p (caddr p) (caddr q))))))
