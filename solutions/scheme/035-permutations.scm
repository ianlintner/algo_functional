;; Problem 35: Permutations (LeetCode 46)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 35
;; Derived from the closest existing Lisp-family reference implementation.
(define (permute nums)
  (if (null nums) '(())
    (mapcan (lambda (n)
              (mapcar (lambda (p) (cons n p))
                      (permute (remove n nums :count 1))))
            nums)))
