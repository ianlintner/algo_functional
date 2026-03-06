;; Problem 21: Merge k Sorted Lists (LeetCode 23)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 21
;; Derived from the closest existing Lisp-family reference implementation.
(define (merge-k-lists lists)
  (labels ((merge2 (l1 l2)
             (cond ((null l1) l2)
                   ((null l2) l1)
                   ((<= (car l1) (car l2))
                    (cons (car l1) (merge2 (cdr l1) l2)))
                   (t (cons (car l2) (merge2 l1 (cdr l2)))))))
    (reduce #'merge2 lists :initial-value nil)))
