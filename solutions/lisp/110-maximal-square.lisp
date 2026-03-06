;; Problem 110: Maximal Square (LeetCode 221)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun maximal-square (matrix)
  (let* ((rows (length matrix)) (cols (length (car matrix)))
         (prev (make-list cols :initial-element 0)) (mx 0))
    (dotimes (r rows)
      (let ((curr nil))
        (dotimes (c cols)
          (let ((cell (nth c (nth r matrix))))
            (push (if (char= cell #\0) 0
                    (if (or (= r 0) (= c 0)) 1
                      (1+ (min (nth (1- c) prev) (nth c prev)
                               (if curr (car curr) 0)))))
                  curr)))
        (setf prev (nreverse curr))
        (setf mx (max mx (apply #'max prev)))))
    (* mx mx)))
