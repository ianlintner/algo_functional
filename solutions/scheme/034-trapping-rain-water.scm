;; Problem 34: Trapping Rain Water (LeetCode 42)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 34
;; Derived from the closest existing Lisp-family reference implementation.
(define (trap height)
  (let* ((n (length height))
         (max-left (make-array n))
         (max-right (make-array n)))
    (loop for i from 0 below n
          for h in height
          for prev = 0 then (aref max-left (1- i))
          do (setf (aref max-left i) (max h prev)))
    (loop for i from (1- n) downto 0
          for nxt = 0 then (aref max-right (1+ i))
          do (setf (aref max-right i) (max (nth i height) nxt)))
    (loop for i from 0 below n
          for h in height
          sum (max 0 (- (min (aref max-left i) (aref max-right i)) h)))))
