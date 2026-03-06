;; Problem 36: Rotate Image (LeetCode 48)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 36
;; Derived from the closest existing Lisp-family reference implementation.
(define (rotate-image matrix)
  (let* ((n (length matrix))
         (arr (map 'vector matrix)))
    (loop for i below n collect
      (reverse
        (loop for j below n collect
          (aref (aref arr j) i))))))
