;; Problem 25: Next Permutation (LeetCode 31)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 25
;; Derived from the closest existing Lisp-family reference implementation.
(define (next-permutation nums)
  (let* ((arr (coerce (copy-list nums) 'vector))
         (n (length arr)))
    (labels ((swap (i j)
               (rotatef (aref arr i) (aref arr j)))
             (rev-sub (lo hi)
               (loop while (< lo hi) do
                 (swap lo hi) (incf lo) (decf hi))))
      (let ((i (loop for k from (- n 2) downto 0
                     when (< (aref arr k) (aref arr (1+ k)))
                       return k)))
        (if (null i)
            (rev-sub 0 (1- n))
            (let ((j (loop for k from (1- n) downto 0
                           when (> (aref arr k) (aref arr i))
                             return k)))
              (swap i j)
              (rev-sub (1+ i) (1- n))))))
    (coerce arr 'list)))
