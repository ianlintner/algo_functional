;; Problem 87: Evaluate Reverse Polish Notation (LeetCode 150)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun eval-rpn (tokens)
  (let ((ops '(("+" . +) ("-" . -) ("*" . *) ("/" . truncate))))
    (car (reduce (lambda (stack tok)
                   (let ((op (cdr (assoc tok ops :test #'string=))))
                     (if op
                       (let ((b (car stack)) (a (cadr stack)))
                         (cons (funcall op a b) (cddr stack)))
                       (cons (parse-integer tok) stack))))
                 tokens :initial-value nil))))
