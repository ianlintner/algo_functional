;; Problem 142: Bus Routes (LeetCode 815)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 142
;; Derived from the closest existing Lisp-family reference implementation.
(define (num-buses-to-destination routes source target)
  (if (= source target) 0
    (let ((stop-map (make-hash-table))
          (visited (make-hash-table))
          (v-routes (make-hash-table)))
      (loop for ri from 0 for route in routes do
        (dolist (s route)
          (push ri (gethash s stop-map nil))))
      (setf (gethash source visited) t)
      (labels ((bfs (queue buses)
        (cond
          ((null queue) -1)
          ((member target queue) buses)
          (t (let ((next nil))
               (dolist (stop queue)
                 (dolist (ri (gethash stop stop-map nil))
                   (unless (gethash ri v-routes)
                     (setf (gethash ri v-routes) t)
                     (dolist (ns (nth ri routes))
                       (unless (gethash ns visited)
                         (setf (gethash ns visited) t)
                         (push ns next))))))
               (bfs next (1+ buses)))))))
        (bfs (list source) 0)))))
