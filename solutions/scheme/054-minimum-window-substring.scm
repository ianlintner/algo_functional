;; Problem 54: Minimum Window Substring (LeetCode 76)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 54
;; Derived from the closest existing Lisp-family reference implementation.
(define (min-window s-str t-str)
  (let ((need (make-hash-table))
        (win (make-hash-table))
        (keys 0) (have 0) (l 0) (start 0) (mlen (1+ (length s-str))))
    (loop for c across t-str do
      (let ((v (gethash c need 0)))
        (when (zerop v) (incf keys))
        (setf (gethash c need) (1+ v))))
    (loop for r below (length s-str) do
      (let ((c (char s-str r)))
        (setf (gethash c win 0) (1+ (gethash c win 0)))
        (when (= (gethash c win) (gethash c need 0)) (incf have))
        (loop while (= have keys) do
          (when (< (- r l -1) mlen) (setf start l mlen (- r l -1)))
          (let ((lc (char s-str l)))
            (decf (gethash lc win))
            (when (< (gethash lc win) (gethash lc need 0)) (decf have)))
          (incf l))))
    (if (> mlen (length s-str)) "" (subseq s-str start (+ start mlen)))))
