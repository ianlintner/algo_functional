;; Problem 99: Binary Tree Right Side View (LeetCode 199)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun right-side-view (root)
  (if (null root) nil
    (labels ((bfs (level)
               (when level
                 (cons (node-val (car (last level)))
                       (bfs (mapcan (lambda (n)
                              (remove nil (list (node-left n) (node-right n))))
                            level))))))
      (bfs (list root)))))
