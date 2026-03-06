;; Problem 154: All Nodes Distance K in Binary Tree (LeetCode 863)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun distance-k (adj target k)
  (let ((visited (make-hash-table)) (result nil))
    (setf (gethash target visited) t)
    (labels ((bfs (queue)
      (when queue
        (destructuring-bind ((node . dist) . rest) queue
          (if (= dist k) (progn (push node result) (bfs rest))
            (let ((neighbors (remove-if (lambda (n) (gethash n visited))
                              (gethash node adj nil))))
              (dolist (n neighbors) (setf (gethash n visited) t))
              (bfs (append rest (mapcar (lambda (n) (cons n (1+ dist)))
                                        neighbors)))))))))
      (bfs (list (cons target 0)))
      (nreverse result))))
