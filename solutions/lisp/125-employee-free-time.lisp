;; Problem 125: Employee Free Time (LeetCode 759)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defun employee-free-time (schedules)
  (let* ((all (sort (apply #'append schedules)
               (lambda (a b) (< (car a) (car b)))))
         (merged (reduce (lambda (acc iv)
                   (if (and acc (>= (cadar (last acc)) (car iv)))
                     (let ((prev (car (last acc))))
                       (append (butlast acc)
                               (list (list (car prev)
                                          (max (cadr prev) (cadr iv))))))
                     (append acc (list iv))))
                 all :initial-value nil)))
    (loop for (a b) on merged while b
          when (< (cadr a) (car b))
          collect (list (cadr a) (car b)))))
