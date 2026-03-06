;; Problem 99: Binary Tree Right Side View (LeetCode 199)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 99
;; Derived from the closest existing Lisp-family reference implementation.
(define (right-side-view root)
  (if (null root) nil
    (labels ((bfs (level)
               (when level
                 (cons (node-val (car (last level)))
                       (bfs (mapcan (lambda (n)
                              (remove nil (list (node-left n) (node-right n))))
                            level))))))
      (bfs (list root)))))
