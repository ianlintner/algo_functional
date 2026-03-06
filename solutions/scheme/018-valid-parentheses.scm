;; Problem 18: Valid Parentheses (LeetCode 20)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 18
;; Derived from the closest existing Lisp-family reference implementation.
(define (is-valid s)
  (let ((matching '((#\) . #\() (#\] . #\[) (#\} . #\{))))
    (null
      (reduce (lambda (stk ch)
                (cond
                  ((member ch '(#\( #\{ #\[)) (cons ch stk))
                  ((and stk (eql (car stk) (cdr (assoc ch matching))))
                   (cdr stk))
                  (t (cons ch stk))))
              (coerce s 'list)
              :initial-value nil))))
