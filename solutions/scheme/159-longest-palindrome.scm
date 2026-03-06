;; Problem 159: Longest Palindrome (LeetCode 409)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 159
;; Derived from the closest existing Lisp-family reference implementation.
(define (longest-palindrome s)
  (let ((freq (make-hash-table)))
    (map nil (lambda (ch) (incf (gethash ch freq 0))) s)
    (let ((pairs 0))
      (maphash (lambda (k v) (declare (ignore k)) (incf pairs (* (floor v 2) 2))) freq)
      (+ pairs (if (< pairs (length s)) 1 0)))))
