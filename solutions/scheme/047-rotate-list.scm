;; Problem 47: Rotate List (LeetCode 61)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 47
;; Derived from the closest existing Lisp-family reference implementation.
(define (rotate-right lst k)
  (if (null lst) nil
    (let* ((n (length lst))
           (rot (mod k n)))
      (if (zerop rot) lst
        (append (nthcdr (- n rot) lst)
                (butlast lst rot))))))
