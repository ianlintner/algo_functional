;; Problem 160: Partition Equal Subset Sum (LeetCode 416)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun can-partition (nums)
  (let ((total (reduce #'+ nums)))
    (when (evenp total)
      (let* ((target (/ total 2))
             (dp (make-hash-table)))
        (setf (gethash 0 dp) t)
        (dolist (n nums)
          (let ((new-sums nil))
            (maphash (lambda (s _) (when (<= (+ s n) target)
              (push (+ s n) new-sums))) dp)
            (dolist (s new-sums) (setf (gethash s dp) t))))
        (gethash target dp)))))
