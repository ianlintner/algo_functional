;; Problem 136: Find the Duplicate Number (LeetCode 287)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun find-duplicate (nums)
  (let ((arr (coerce (cons 0 nums) 'vector)))
    (flet ((step-fn (i) (aref arr i)))
      (labels ((find-meet (s f)
                 (let ((s2 (step-fn s))
                       (f2 (step-fn (step-fn f))))
                   (if (= s2 f2) s2 (find-meet s2 f2))))
               (find-start (a b)
                 (if (= a b) a
                   (find-start (step-fn a) (step-fn b)))))
        (let ((meet (find-meet (step-fn 0) (step-fn (step-fn 0)))))
          (find-start 0 meet))))))
