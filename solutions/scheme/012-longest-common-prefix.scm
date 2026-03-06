;; Problem 12: Longest Common Prefix (LeetCode 14)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 12
;; Derived from the closest existing Lisp-family reference implementation.
(define (longest-common-prefix strs)
  (if (null strs) ""
    (reduce (lambda (prefix s)
              (let ((len (min (length prefix) (length s))))
                (subseq prefix 0
                  (loop for i from 0 below len
                        while (char= (char prefix i) (char s i))
                        finally (return i)))))
            strs)))
