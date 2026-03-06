;; Problem 167: K Closest Points to Origin (LeetCode 973)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun k-closest (points k)
  (subseq
    (sort (copy-seq points)
          (lambda (a b)
            (< (+ (* (first a) (first a)) (* (second a) (second a)))
               (+ (* (first b) (first b)) (* (second b) (second b))))))
    0 k))
