;; Problem 161: Pacific Atlantic Water Flow (LeetCode 417)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun pacific-atlantic (heights)
  (let* ((rows (length heights)) (cols (length (car heights))))
    (labels ((get-h (r c) (nth c (nth r heights)))
             (dfs (visited r c)
               (if (gethash (cons r c) visited) visited
                 (progn (setf (gethash (cons r c) visited) t)
                   (dolist (d '((1 0) (-1 0) (0 1) (0 -1)))
                     (let ((nr (+ r (car d))) (nc (+ c (cadr d))))
                       (when (and (>= nr 0) (< nr rows) (>= nc 0) (< nc cols)
                                  (not (gethash (cons nr nc) visited))
                                  (>= (get-h nr nc) (get-h r c)))
                         (dfs visited nr nc))))
                   visited))))
      (let ((pac (make-hash-table :test 'equal))
            (atl (make-hash-table :test 'equal)))
        (dotimes (r rows) (dfs pac r 0) (dfs atl r (1- cols)))
        (dotimes (c cols) (dfs pac 0 c) (dfs atl (1- rows) c))
        (let (result)
          (maphash (lambda (k _) (when (gethash k atl) (push k result))) pac)
          result)))))
