;; Problem 19: Merge Two Sorted Lists (LeetCode 21)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun merge-two-lists (l1 l2)
  (cond
    ((null l1) l2)
    ((null l2) l1)
    ((<= (car l1) (car l2))
     (cons (car l1) (merge-two-lists (cdr l1) l2)))
    (t (cons (car l2) (merge-two-lists l1 (cdr l2))))))
