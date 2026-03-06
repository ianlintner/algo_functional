;; Problem 6: Reverse Integer (LeetCode 7)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun reverse-integer (x)
  (let* ((sign (if (< x 0) -1 1))
         (digits (reverse (coerce (write-to-string (abs x)) 'list)))
         (reversed (* sign (parse-integer (coerce digits 'string))))
         (max-int (1- (expt 2 31)))
         (min-int (- (expt 2 31))))
    (if (or (> reversed max-int) (< reversed min-int)) 0 reversed)))
