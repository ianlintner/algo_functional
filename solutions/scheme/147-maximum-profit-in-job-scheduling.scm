;; Problem 147: Maximum Profit in Job Scheduling (LeetCode 1235)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 147
;; Derived from the closest existing Lisp-family reference implementation.
(define (job-scheduling starts ends profits)
  (let* ((jobs (sort (mapcar #'list starts ends profits) #'< :key #'second))
         (n (length jobs))
         (dp (make-array (1+ n) :initial-element 0)))
    (labels ((bisect (v hi)
               (loop for i from (1- hi) downto 0
                     when (<= (second (nth i jobs)) v) return (1+ i)
                     finally (return 0))))
      (loop for i from 1 to n do
        (let* ((job (nth (1- i) jobs))
               (prev (bisect (first job) (1- i))))
          (setf (aref dp i) (max (aref dp (1- i)) (+ (aref dp prev) (third job))))))
      (aref dp n))))
