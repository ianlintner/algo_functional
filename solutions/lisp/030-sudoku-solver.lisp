;; Problem 30: Sudoku Solver (LeetCode 37)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defun solve-sudoku (board)
  (labels ((find-empty (b)
             (loop for i from 0 below 9 do
               (loop for j from 0 below 9 do
                 (when (char= (aref b i j) #\.)
                   (return-from find-empty (values i j)))))
             (values -1 -1))
           (valid-p (b r c d)
             (let ((br (* (floor r 3) 3)) (bc (* (floor c 3) 3)))
               (and (loop for k below 9 never (char= (aref b r k) d))
                    (loop for k below 9 never (char= (aref b k c) d))
                    (loop for i from br below (+ br 3)
                          always (loop for j from bc below (+ bc 3)
                                       never (char= (aref b i j) d))))))
           (solve (b)
             (multiple-value-bind (r c) (find-empty b)
               (if (= r -1) (values b t)
                 (loop for d from 1 to 9
                       for ch = (code-char (+ d (char-code #\0)))
                       when (valid-p b r c ch) do
                         (setf (aref b r c) ch)
                         (multiple-value-bind (res ok) (solve b)
                           (when ok (return-from solve (values res t))))
                         (setf (aref b r c) #\.)
                       finally (return (values b nil)))))))
    (solve board)))
