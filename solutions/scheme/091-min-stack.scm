;; Problem 91: Min Stack (LeetCode 155)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 91
;; Derived from the closest existing Lisp-family reference implementation.
(define (ms-push stack x)
  (let ((cur-min (if stack (min x (cadar stack)) x)))
    (cons (list x cur-min) stack)))

(define (ms-pop stack) (cdr stack))
(define (ms-top stack) (caar stack))
(define (ms-get-min stack) (cadar stack))
