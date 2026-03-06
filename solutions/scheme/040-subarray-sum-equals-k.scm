;; Problem 40: Subarray Sum Equals K (LeetCode 560)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 40
;; Derived from the closest existing Lisp-family reference implementation.
(define (subarray-sum nums k)
  (let ((map (make-hash-table))
        (count 0) (sum 0))
    (setf (gethash 0 map) 1)
    (dolist (n nums count)
      (incf sum n)
      (incf count (gethash (- sum k) map 0))
      (setf (gethash sum map) (1+ (gethash sum map 0))))))
