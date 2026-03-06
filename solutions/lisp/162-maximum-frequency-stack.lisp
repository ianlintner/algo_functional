;; Problem 162: Maximum Frequency Stack (LeetCode 895)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defstruct freq-stack (freq (make-hash-table)) (group (make-hash-table)) (max-freq 0))

(defun fs-push (fs val)
  (let* ((f (1+ (gethash val (freq-stack-freq fs) 0))))
    (setf (gethash val (freq-stack-freq fs)) f)
    (push val (gethash f (freq-stack-group fs)))
    (setf (freq-stack-max-freq fs) (max (freq-stack-max-freq fs) f))
    fs))

(defun fs-pop (fs)
  (let* ((mf (freq-stack-max-freq fs))
         (stack (gethash mf (freq-stack-group fs)))
         (val (car stack)))
    (setf (gethash mf (freq-stack-group fs)) (cdr stack))
    (when (null (cdr stack))
      (decf (freq-stack-max-freq fs)))
    (decf (gethash val (freq-stack-freq fs)))
    val))
