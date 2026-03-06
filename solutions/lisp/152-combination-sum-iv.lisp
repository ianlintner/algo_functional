;; Problem 152: Combination Sum IV (LeetCode 377)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun combination-sum4 (nums target)
  (let ((dp (make-array (1+ target) :initial-element 0)))
    (setf (aref dp 0) 1)
    (loop for i from 1 to target do
      (setf (aref dp i) (reduce #'+ (mapcar (lambda (n)
        (if (<= n i) (aref dp (- i n)) 0)) nums))))
    (aref dp target)))
