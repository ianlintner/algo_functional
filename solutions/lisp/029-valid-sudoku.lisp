;; Problem 29: Valid Sudoku (LeetCode 36)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun valid-sudoku-p (board)
  (let ((keys '()))
    (loop for i from 0 below 9 do
      (loop for j from 0 below 9 do
        (let ((c (aref (aref board i) j)))
          (when (char/= c #\.)
            (push (format nil "r~D:~C" i c) keys)
            (push (format nil "c~D:~C" j c) keys)
            (push (format nil "b~D,~D:~C" (floor i 3) (floor j 3) c) keys)))))
    (= (length keys) (length (remove-duplicates keys :test #'string=)))))
