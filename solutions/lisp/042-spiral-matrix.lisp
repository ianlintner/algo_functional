;; Problem 42: Spiral Matrix (LeetCode 54)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun spiral-order (matrix)
  (when matrix
    (append (car matrix)
            (spiral-order (rotate-matrix (cdr matrix))))))
(defun rotate-matrix (m)
  (when (and m (car m))
    (apply #'mapcar (lambda (&rest cols) (reverse cols)) m)))
