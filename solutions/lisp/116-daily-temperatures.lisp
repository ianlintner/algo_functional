;; Problem 116: Daily Temperatures (LeetCode 739)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun daily-temperatures (temps)
  (let* ((n (length temps))
         (res (make-list n :initial-element 0)))
    (labels ((pop-stack (stack)
               (if (and stack (<= (nth (car stack) temps) 0))
                 (pop-stack (cdr stack)) stack))
             (go (i stack)
               (if (< i 0) res
                 (let* ((s (remove-if
                            (lambda (j) (<= (nth j temps) (nth i temps)))
                            stack))
                        (val (if s (- (car s) i) 0)))
                   (setf (nth i res) val)
                   (go (1- i) (cons i s))))))
      (go (1- n) nil))))
