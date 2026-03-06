;; Problem 13: 3Sum (LeetCode 15)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 13
;; Derived from the closest existing Lisp-family reference implementation.
(define (three-sum nums)
  (let* ((sorted (sort (copy-list nums) #'<))
         (arr (coerce sorted 'vector))
         (n (length arr))
         (result nil))
    (dotimes (i n (nreverse result))
      (when (or (= i 0) (/= (aref arr i) (aref arr (1- i))))
        (let ((l (1+ i)) (r (1- n)))
          (loop while (< l r) do
            (let ((s (+ (aref arr i) (aref arr l) (aref arr r))))
              (cond ((< s 0) (incf l))
                    ((> s 0) (decf r))
                    (t (push (list (aref arr i) (aref arr l) (aref arr r)) result)
                       (loop while (and (< l r) (= (aref arr l) (aref arr (1+ l))))
                             do (incf l))
                       (incf l) (decf r))))))))))
