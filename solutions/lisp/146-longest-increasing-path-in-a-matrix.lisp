;; Problem 146: Longest Increasing Path in a Matrix (LeetCode 329)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defun longest-increasing-path (matrix)
  (let* ((rows (length matrix)) (cols (length (car matrix)))
         (memo (make-hash-table :test 'equal))
         (dirs '((0 1)(0 -1)(1 0)(-1 0))))
    (labels ((grid (r c) (nth c (nth r matrix)))
             (dfs (r c)
               (or (gethash (list r c) memo)
                 (let ((best (reduce (lambda (mx d)
                               (let ((nr (+ r (first d))) (nc (+ c (second d))))
                                 (if (and (>= nr 0) (< nr rows) (>= nc 0) (< nc cols)
                                          (> (grid nr nc) (grid r c)))
                                   (max mx (dfs nr nc)) mx)))
                             dirs :initial-value 0)))
                   (setf (gethash (list r c) memo) (1+ best))
                   (1+ best)))))
      (reduce #'max (loop for r below rows append
        (loop for c below cols collect (dfs r c)))))))
