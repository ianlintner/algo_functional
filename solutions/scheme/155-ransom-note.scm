;; Problem 155: Ransom Note (LeetCode 383)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 155
;; Derived from the closest existing Lisp-family reference implementation.
(define (can-construct ransom magazine)
  (let ((freq (make-hash-table)))
    (map nil (lambda (ch) (incf (gethash ch freq 0))) magazine)
    (every (lambda (ch)
      (let ((cnt (gethash ch freq 0)))
        (setf (gethash ch freq) (1- cnt))
        (> cnt 0)))
      ransom)))
