;; Problem 155: Ransom Note (LeetCode 383)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun can-construct (ransom magazine)
  (let ((freq (make-hash-table)))
    (map nil (lambda (ch) (incf (gethash ch freq 0))) magazine)
    (every (lambda (ch)
      (let ((cnt (gethash ch freq 0)))
        (setf (gethash ch freq) (1- cnt))
        (> cnt 0)))
      ransom)))
