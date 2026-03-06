;; Problem 113: Basic Calculator (LeetCode 224)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 113
;; Derived from the closest existing Lisp-family reference implementation.
(define (calculate s)
  (let ((chars (remove #\Space (coerce s 'list))))
    (labels ((parse (cs) (go cs 0 1))
             (go (cs result sign)
               (cond
                 ((null cs) (values result cs))
                 ((char= (car cs) #\)) (values result (cdr cs)))
                 ((char= (car cs) #\+) (go (cdr cs) result 1))
                 ((char= (car cs) #\-) (go (cdr cs) result -1))
                 ((char= (car cs) #\()
                  (multiple-value-bind (v rest) (parse (cdr cs))
                    (go rest (+ result (* sign v)) 1)))
                 (t (multiple-value-bind (num rest) (read-num cs 0)
                      (go rest (+ result (* sign num)) 1)))))
             (read-num (cs acc)
               (if (and cs (digit-char-p (car cs)))
                 (read-num (cdr cs)
                   (+ (* acc 10) (digit-char-p (car cs))))
                 (values acc cs))))
      (parse chars))))
