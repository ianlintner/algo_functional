;; Problem 88: Maximum Width of Binary Tree (LeetCode 662)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun width-of-binary-tree (root)
  (if (null root) 0
    (labels ((bfs (level max-w)
               (if (null level) max-w
                 (let* ((w (1+ (- (cadar (last level)) (cadar level))))
                        (nxt (mapcan (lambda (pair)
                                (let ((n (car pair)) (i (cadr pair)))
                                  (append
                                    (when (node-left n) (list (list (node-left n) (* 2 i))))
                                    (when (node-right n) (list (list (node-right n) (1+ (* 2 i))))))))
                              level)))
                   (bfs nxt (max w max-w))))))
      (bfs (list (list root 0)) 0))))
