;; Problem 126: Meeting Rooms (LeetCode 252)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 126
;; Derived from the closest existing Lisp-family reference implementation.
(define (can-attend-meetings intervals)
  (let ((sorted (sort (copy-list intervals)
                  (lambda (a b) (< (car a) (car b))))))
    (every (lambda (a b) (<= (cadr a) (car b)))
           sorted (cdr sorted))))
