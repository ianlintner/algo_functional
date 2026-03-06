;; Problem 159: Longest Palindrome (LeetCode 409)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun longest-palindrome (s)
  (let ((freq (make-hash-table)))
    (map nil (lambda (ch) (incf (gethash ch freq 0))) s)
    (let ((pairs 0))
      (maphash (lambda (k v) (declare (ignore k)) (incf pairs (* (floor v 2) 2))) freq)
      (+ pairs (if (< pairs (length s)) 1 0)))))
