;; Problem 63: Binary Tree Level Order Traversal (LeetCode 102)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 63
;; Derived from the closest existing Lisp-family reference implementation.
(define (level-order root)
  (if (null root) nil
    (labels ((bfs (queue)
               (when queue
                 (let ((vals (mapcar #'car queue))
                       (next (loop for n in queue
                                   when (cadr n) collect (cadr n)
                                   when (caddr n) collect (caddr n))))
                   (cons vals (bfs next))))))
      (bfs (list root)))))
