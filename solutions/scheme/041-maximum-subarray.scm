;; Problem 41: Maximum Subarray (LeetCode 53)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 41
;; Derived from the closest existing Lisp-family reference implementation.
(define (max-sub-array nums)
  (reduce (lambda (state n)
            (let* ((best (car state)) (cur (cdr state))
                   (c (max n (+ cur n))))
              (cons (max best c) c)))
          (rest nums)
          :initial-value (cons (first nums) (first nums))))
