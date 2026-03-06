;; Problem 61: Same Tree (LeetCode 100)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun same-tree-p (p q)
  (cond
    ((and (null p) (null q)) t)
    ((or (null p) (null q)) nil)
    (t (and (= (car p) (car q))
            (same-tree-p (cadr p) (cadr q))
            (same-tree-p (caddr p) (caddr q))))))
