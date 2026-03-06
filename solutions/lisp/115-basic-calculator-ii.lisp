;; Problem 115: Basic Calculator II (LeetCode 227)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun calculate2 (s)
  (let ((chars (remove #\Space (coerce s 'list))))
    (labels ((read-num (cs acc)
               (if (and cs (digit-char-p (car cs)))
                 (read-num (cdr cs)
                   (+ (* acc 10) (digit-char-p (car cs))))
                 (values acc cs)))
             (parse (cs stack op)
               (multiple-value-bind (num rest) (read-num cs 0)
                 (let ((ns (cond
                             ((char= op #\*) (cons (* (car stack) num) (cdr stack)))
                             ((char= op #\/) (cons (truncate (car stack) num) (cdr stack)))
                             ((char= op #\-) (cons (- num) stack))
                             (t (cons num stack)))))
                   (if (null rest) (reduce #'+ ns)
                     (parse (cdr rest) ns (car rest)))))))
      (parse chars nil #\+))))
