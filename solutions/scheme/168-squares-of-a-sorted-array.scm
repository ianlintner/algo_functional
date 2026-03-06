;; Problem 168: Squares of a Sorted Array (LeetCode 977)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 168
;; Derived from the closest existing Lisp-family reference implementation.
(define (sorted-squares nums)
  (let* ((n (length nums))
         (arr (coerce nums 'vector))
         (result (make-array n :initial-element 0)))
    (labels ((merge-sq (l r i)
               (when (>= i 0)
                 (if (>= (abs (aref arr l)) (abs (aref arr r)))
                   (progn (setf (aref result i) (* (aref arr l) (aref arr l)))
                          (merge-sq (1+ l) r (1- i)))
                   (progn (setf (aref result i) (* (aref arr r) (aref arr r)))
                          (merge-sq l (1- r) (1- i)))))))
      (merge-sq 0 (1- n) (1- n))
      (coerce result 'list))))
