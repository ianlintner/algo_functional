;; Problem 22: Swap Nodes in Pairs (LeetCode 24)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 22
;; Derived from the closest existing Lisp-family reference implementation.
(define (swap-pairs lst)
  (cond
    ((null lst) nil)
    ((null (cdr lst)) lst)
    (t (cons (cadr lst)
             (cons (car lst)
                   (swap-pairs (cddr lst)))))))
