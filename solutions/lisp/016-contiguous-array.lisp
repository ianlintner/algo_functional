;; Problem 16: Contiguous Array (LeetCode 525)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun find-max-length (nums)
  (let ((seen (make-hash-table))
        (count 0) (best 0))
    (setf (gethash 0 seen) -1)
    (loop for num in nums for i from 0 do
      (incf count (if (= num 1) 1 -1))
      (let ((prev (gethash count seen)))
        (if prev
            (setf best (max best (- i prev)))
            (setf (gethash count seen) i))))
    best))
