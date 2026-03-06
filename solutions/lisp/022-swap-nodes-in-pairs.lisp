;; Problem 22: Swap Nodes in Pairs (LeetCode 24)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun swap-pairs (lst)
  (cond
    ((null lst) nil)
    ((null (cdr lst)) lst)
    (t (cons (cadr lst)
             (cons (car lst)
                   (swap-pairs (cddr lst)))))))
