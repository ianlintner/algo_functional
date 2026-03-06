;; Problem 152: Combination Sum IV (LeetCode 377)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 152
;; Derived from the closest existing Lisp-family reference implementation.
(define (combination-sum4 nums target)
  (let ((dp (make-array (1+ target) :initial-element 0)))
    (setf (aref dp 0) 1)
    (loop for i from 1 to target do
      (setf (aref dp i) (reduce #'+ (mapcar (lambda (n)
        (if (<= n i) (aref dp (- i n)) 0)) nums))))
    (aref dp target)))
