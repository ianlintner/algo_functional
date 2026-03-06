;; Problem 81: Word Break (LeetCode 139)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun word-break (s word-dict)
  (let* ((dict (make-hash-table :test 'equal))
         (n (length s))
         (dp (make-array (1+ n) :initial-element nil)))
    (dolist (w word-dict) (setf (gethash w dict) t))
    (setf (aref dp 0) t)
    (loop for i from 1 to n do
      (setf (aref dp i)
            (loop for j from 0 below i
                  thereis (and (aref dp j)
                               (gethash (subseq s j i) dict)))))
    (aref dp n)))
