;; Problem 59: Decode Ways (LeetCode 91)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 59
;; Derived from the closest existing Lisp-family reference implementation.
(define (num-decodings s)
  (let ((n (length s)))
    (car (reduce (lambda (acc i)
                   (let ((dp1 (car acc)) (dp2 (cadr acc)))
                     (if (char= (char s i) #\0) (list 0 dp1)
                       (let* ((one dp1)
                              (two (if (and (< (1+ i) n)
                                           (<= (parse-integer s :start i :end (+ i 2)) 26))
                                     dp2 0)))
                         (list (+ one two) dp1)))))
                 (loop for i from (1- n) downto 0 collect i)
                 :initial-value (list 1 0)))))
