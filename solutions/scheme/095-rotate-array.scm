;; Problem 95: Rotate Array (LeetCode 189)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 95
;; Derived from the closest existing Lisp-family reference implementation.
(define (rotate-array nums k)
  (let* ((n (length nums)) (s (mod k n)))
    (append (nthcdr (- n s) nums) (subseq nums 0 (- n s)))))
