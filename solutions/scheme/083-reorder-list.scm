;; Problem 83: Reorder List (LeetCode 143)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 83
;; Derived from the closest existing Lisp-family reference implementation.
(define (reorder-list lst)
  (let* ((mid (floor (length lst) 2))
         (first-half (subseq lst 0 mid))
         (second-half (reverse (subseq lst mid))))
    (labels ((merge-lists (a b)
               (cond ((null a) b) ((null b) a)
                     (t (cons (car a) (cons (car b)
                         (merge-lists (cdr a) (cdr b))))))))
      (merge-lists first-half second-half))))
