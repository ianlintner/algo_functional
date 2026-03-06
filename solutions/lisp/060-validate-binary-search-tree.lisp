;; Problem 60: Validate Binary Search Tree (LeetCode 98)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun valid-bst-p (node lo hi)
  (if (null node) t
    (let ((v (car node)) (l (cadr node)) (r (caddr node)))
      (and (> v lo) (< v hi)
           (valid-bst-p l lo v)
           (valid-bst-p r v hi)))))
