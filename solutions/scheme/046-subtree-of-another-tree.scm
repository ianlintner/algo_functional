;; Problem 46: Subtree of Another Tree (LeetCode 572)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 46
;; Derived from the closest existing Lisp-family reference implementation.
(define (same-tree-p a b)
  (cond
    ((and (null a) (null b)) t)
    ((or (null a) (null b)) nil)
    (t (and (= (car a) (car b))
            (same-tree-p (cadr a) (cadr b))
            (same-tree-p (caddr a) (caddr b))))))

(define (is-subtree root sub)
  (cond
    ((null root) (null sub))
    (t (or (same-tree-p root sub)
           (is-subtree (cadr root) sub)
           (is-subtree (caddr root) sub)))))
