;; Problem 109: Contains Duplicate (LeetCode 217)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 109
;; Derived from the closest existing Lisp-family reference implementation.
(define (contains-duplicate nums)
  (let ((seen (make-hash-table)))
    (some (lambda (n)
            (if (gethash n seen) t
              (progn (setf (gethash n seen) t) nil)))
          nums)))
