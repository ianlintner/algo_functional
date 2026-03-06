;; Problem 109: Contains Duplicate (LeetCode 217)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun contains-duplicate (nums)
  (let ((seen (make-hash-table)))
    (some (lambda (n)
            (if (gethash n seen) t
              (progn (setf (gethash n seen) t) nil)))
          nums)))
