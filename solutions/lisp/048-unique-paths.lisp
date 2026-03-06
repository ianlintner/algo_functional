;; Problem 48: Unique Paths (LeetCode 62)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun unique-paths (m n)
  (let ((k (min (1- m) (1- n))))
    (reduce (lambda (acc i)
              (/ (* acc (- (+ m n -2) i)) (1+ i)))
            (loop for i below k collect i)
            :initial-value 1)))
