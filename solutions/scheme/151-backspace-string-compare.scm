;; Problem 151: Backspace String Compare (LeetCode 844)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 151
;; Derived from the closest existing Lisp-family reference implementation.
(define (backspace-compare s1 s2)
  (labels ((build (str)
    (reduce (lambda (acc ch)
      (if (char= ch #\#) (if (> (length acc) 0) (subseq acc 0 (1- (length acc))) acc)
        (concatenate 'string acc (string ch))))
      str :initial-value "")))
    (string= (build s1) (build s2))))
