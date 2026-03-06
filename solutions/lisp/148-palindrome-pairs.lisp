;; Problem 148: Palindrome Pairs (LeetCode 336)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defun palindrome-pairs (words)
  (let ((mp (make-hash-table :test 'equal)))
    (loop for w in words for i from 0 do (setf (gethash w mp) i))
    (labels ((palin-p (s) (string= s (reverse s)))
             (rev-s (s) (reverse s)))
      (loop for w in words for i from 0 append
        (loop for j from 0 to (length w) append
          (let* ((left (subseq w 0 j)) (right (subseq w j))
                 (a (when (and (palin-p right) (gethash (rev-s left) mp)
                               (/= (gethash (rev-s left) mp) i))
                      (list (list i (gethash (rev-s left) mp)))))
                 (b (when (and (> j 0) (palin-p left) (gethash (rev-s right) mp)
                               (/= (gethash (rev-s right) mp) i))
                      (list (list (gethash (rev-s right) mp) i)))))
            (append a b)))))))
