;; Problem 2: Add Two Numbers (LeetCode 2)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun add-two-numbers (l1 l2)
  (labels ((add (n1 n2 carry)
             (when (or n1 n2 (> carry 0))
               (let* ((v1 (or (car n1) 0))
                      (v2 (or (car n2) 0))
                      (s  (+ v1 v2 carry)))
                 (cons (mod s 10)
                       (add (cdr n1) (cdr n2) (floor s 10)))))))
    (add l1 l2 0)))
