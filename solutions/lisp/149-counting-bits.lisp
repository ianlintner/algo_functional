;; Problem 149: Counting Bits (LeetCode 338)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun count-bits (n)
  (let ((dp (make-array (1+ n) :initial-element 0)))
    (loop for i from 1 to n do
      (setf (aref dp i) (+ (aref dp (ash i -1)) (logand i 1))))
    (coerce dp 'list)))
