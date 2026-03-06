;; Problem 14: 3Sum Closest (LeetCode 16)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 14
;; Derived from the closest existing Lisp-family reference implementation.
(define (three-sum-closest nums target)
  (let* ((sorted (sort (copy-list nums) #'<))
         (arr (coerce sorted 'vector))
         (n (length arr))
         (closest (+ (aref arr 0) (aref arr 1) (aref arr 2))))
    (dotimes (i (- n 2) closest)
      (let ((l (1+ i)) (r (1- n)))
        (loop while (< l r) do
          (let ((s (+ (aref arr i) (aref arr l) (aref arr r))))
            (when (< (abs (- s target)) (abs (- closest target)))
              (setf closest s))
            (cond ((< s target) (incf l))
                  ((> s target) (decf r))
                  (t (return-from three-sum-closest target)))))))))
