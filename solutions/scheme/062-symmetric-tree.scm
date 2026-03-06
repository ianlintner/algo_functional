;; Problem 62: Symmetric Tree (LeetCode 101)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 62
;; Derived from the closest existing Lisp-family reference implementation.
(define (symmetric-p root)
  (labels ((mirror (a b)
             (cond
               ((and (null a) (null b)) t)
               ((or (null a) (null b)) nil)
               (t (and (= (car a) (car b))
                       (mirror (cadr a) (caddr b))
                       (mirror (caddr a) (cadr b)))))))
    (or (null root) (mirror (cadr root) (caddr root)))))
