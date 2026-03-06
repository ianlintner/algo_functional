;; Problem 26: Longest Valid Parentheses (LeetCode 32)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 26
;; Derived from the closest existing Lisp-family reference implementation.
(define (longest-valid-parentheses s)
  (labels ((scan (cs open close)
             (third
               (reduce (lambda (acc c)
                         (destructuring-bind (l r mx) acc
                           (let ((l (if (char= c open) (1+ l) l))
                                 (r (if (char= c close) (1+ r) r)))
                             (cond ((> r l) (list 0 0 mx))
                                   ((= l r) (list l r (max mx (* 2 r))))
                                   (t (list l r mx))))))
                       cs :initial-value '(0 0 0)))))
    (max (scan (coerce s 'list) #\( #\))
         (scan (reverse (coerce s 'list)) #\) #\())))
