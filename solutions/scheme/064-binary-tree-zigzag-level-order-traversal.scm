;; Problem 64: Binary Tree Zigzag Level Order Traversal (LeetCode 103)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 64
;; Derived from the closest existing Lisp-family reference implementation.
(define (zigzag-level-order root)
  (if (null root) nil
    (labels ((bfs (queue level)
               (when queue
                 (let* ((vals (mapcar #'car queue))
                        (row (if (evenp level) vals (reverse vals)))
                        (next (loop for n in queue
                                    when (cadr n) collect (cadr n)
                                    when (caddr n) collect (caddr n))))
                   (cons row (bfs next (1+ level)))))))
      (bfs (list root) 0))))
