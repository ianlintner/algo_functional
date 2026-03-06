;; Problem 31: Shortest Path to Get Food (LeetCode 1730)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun get-food (grid)
  (let* ((rows (array-dimension grid 0))
         (cols (array-dimension grid 1))
         (start (loop for i below rows do
                  (loop for j below cols
                        when (char= (aref grid i j) #\*)
                          do (return-from nil (cons i j)))))
         (visited (make-hash-table :test 'equal))
         (queue (list (list (car start) (cdr start) 0)))
         (dirs '((0 1) (0 -1) (1 0) (-1 0))))
    (setf (gethash start visited) t)
    (loop while queue do
      (let ((cur (pop queue)))
        (destructuring-bind (r c d) cur
          (dolist (dir dirs)
            (let ((nr (+ r (first dir))) (nc (+ c (second dir))))
              (when (and (>= nr 0) (< nr rows) (>= nc 0) (< nc cols)
                         (char/= (aref grid nr nc) #\X)
                         (not (gethash (cons nr nc) visited)))
                (when (char= (aref grid nr nc) #\#)
                  (return-from get-food (1+ d)))
                (setf (gethash (cons nr nc) visited) t)
                (setf queue (append queue (list (list nr nc (1+ d))))))))))
      finally (return -1))))
