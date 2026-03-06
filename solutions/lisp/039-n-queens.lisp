;; Problem 39: N-Queens (LeetCode 51)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defun solve-n-queens (n)
  (labels ((make-row (c)
             (concatenate 'string
               (make-string c :initial-element #\.)
               "Q"
               (make-string (- n c 1) :initial-element #\.)))
           (go (row cols d1 d2 board)
             (if (= row n)
                 (list (mapcar #'make-row (reverse board)))
                 (loop for c from 0 below n
                       when (and (not (member c cols))
                                 (not (member (- row c) d1))
                                 (not (member (+ row c) d2)))
                         nconc (go (1+ row) (cons c cols)
                                   (cons (- row c) d1)
                                   (cons (+ row c) d2)
                                   (cons c board))))))
    (go 0 nil nil nil nil)))
