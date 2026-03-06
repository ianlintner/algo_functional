;; Problem 87: Evaluate Reverse Polish Notation (LeetCode 150)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 87
;; Derived from the closest existing Lisp-family reference implementation.
(define (eval-rpn tokens)
  (let ((ops '(("+" . +) ("-" . -) ("*" . *) ("/" . truncate))))
    (car (reduce (lambda (stack tok)
                   (let ((op (cdr (assoc tok ops :test #'string=))))
                     (if op
                       (let ((b (car stack)) (a (cadr stack)))
                         (cons (funcall op a b) (cddr stack)))
                       (cons (parse-integer tok) stack))))
                 tokens :initial-value nil))))
