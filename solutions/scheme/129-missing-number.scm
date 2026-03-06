;; Problem 129: Missing Number (LeetCode 268)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 129
;; Derived from the closest existing Lisp-family reference implementation.
(define (missing-number nums)
  (let ((n (length nums)))
    (logxor (reduce #'logxor nums :initial-value 0)
            (reduce #'logxor
              (loop for i from 0 to n collect i)
              :initial-value 0))))
