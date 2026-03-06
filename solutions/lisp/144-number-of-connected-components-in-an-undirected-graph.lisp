;; Problem 144: Number of Connected Components in an Undirected Graph (LeetCode 323)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun count-components (n edges)
  (let ((parent (make-array n)))
    (dotimes (i n) (setf (aref parent i) i))
    (labels ((find-root (x)
               (if (= (aref parent x) x) x
                 (progn (setf (aref parent x) (find-root (aref parent x)))
                        (aref parent x)))))
      (reduce (lambda (cnt edge)
        (let ((ra (find-root (car edge)))
              (rb (find-root (cadr edge))))
          (if (= ra rb) cnt
            (progn (setf (aref parent ra) rb) (1- cnt)))))
        edges :initial-value n))))
