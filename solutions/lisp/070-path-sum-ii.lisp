;; Problem 70: Path Sum II (LeetCode 113)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun path-sum (node target)
  (cond
    ((null node) nil)
    ((and (null (cadr node)) (null (caddr node)))
     (if (= (car node) target) (list (list (car node))) nil))
    (t (let ((v (car node)) (remain (- target (car node))))
         (mapcar (lambda (p) (cons v p))
                 (append (path-sum (cadr node) remain)
                         (path-sum (caddr node) remain)))))))
