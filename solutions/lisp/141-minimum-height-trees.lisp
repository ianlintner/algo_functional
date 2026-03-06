;; Problem 141: Minimum Height Trees (LeetCode 310)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun find-min-height-trees (n edges)
  (if (= n 1) (list 0)
    (let ((adj (make-array n :initial-element nil))
          (deg (make-array n :initial-element 0)))
      (dolist (e edges)
        (let ((u (car e)) (v (cadr e)))
          (push v (aref adj u)) (push u (aref adj v))
          (incf (aref deg u)) (incf (aref deg v))))
      (let ((leaves (loop for i below n when (= (aref deg i) 1) collect i))
            (remaining n))
        (loop while (> remaining 2) do
          (decf remaining (length leaves))
          (let ((new-leaves nil))
            (dolist (leaf leaves)
              (dolist (nb (aref adj leaf))
                (decf (aref deg nb))
                (when (= (aref deg nb) 1) (push nb new-leaves))))
            (setf leaves new-leaves)))
        leaves))))
