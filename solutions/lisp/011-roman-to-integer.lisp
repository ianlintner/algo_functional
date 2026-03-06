;; Problem 11: Roman to Integer (LeetCode 13)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun roman-to-int (s)
  (let ((values '((#\I . 1) (#\V . 5) (#\X . 10) (#\L . 50)
                  (#\C . 100) (#\D . 500) (#\M . 1000))))
    (car
      (reduce (lambda (acc ch)
                (let ((v (cdr (assoc ch values))))
                  (if (< v (cdr acc))
                      (cons (- (car acc) v) v)
                      (cons (+ (car acc) v) v))))
              (reverse (coerce s 'list))
              :initial-value (cons 0 0)))))
