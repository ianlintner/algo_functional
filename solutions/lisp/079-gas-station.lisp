;; Problem 79: Gas Station (LeetCode 134)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun can-complete-circuit (gas cost)
  (let ((total 0) (tank 0) (start 0))
    (loop for g in gas for c in cost for i from 0
          do (let ((d (- g c)))
               (incf total d) (incf tank d)
               (when (< tank 0) (setf tank 0 start (1+ i)))))
    (if (>= total 0) start -1)))
