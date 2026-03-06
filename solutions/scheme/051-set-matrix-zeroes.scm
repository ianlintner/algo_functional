;; Problem 51: Set Matrix Zeroes (LeetCode 73)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 51
;; Derived from the closest existing Lisp-family reference implementation.
(define (set-zeroes matrix)
  (let* ((zero-rows (loop for row in matrix for i from 0
                          when (member 0 row) collect i))
         (cols (length (first matrix)))
         (zero-cols (loop for j below cols
                          when (some (lambda (r) (zerop (nth j r))) matrix)
                          collect j)))
    (loop for row in matrix for i from 0 collect
      (loop for v in row for j from 0 collect
        (if (or (member i zero-rows) (member j zero-cols)) 0 v)))))
