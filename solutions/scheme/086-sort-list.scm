;; Problem 86: Sort List (LeetCode 148)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 86
;; Derived from the closest existing Lisp-family reference implementation.
(define (sort-list xs)
  (if (<= (length xs) 1) xs
    (let* ((mid (floor (length xs) 2))
           (l (sort-list (subseq xs 0 mid)))
           (r (sort-list (subseq xs mid))))
      (labels ((mrg (a b)
                 (cond ((null a) b) ((null b) a)
                       ((<= (car a) (car b)) (cons (car a) (mrg (cdr a) b)))
                       (t (cons (car b) (mrg a (cdr b)))))))
        (mrg l r)))))
