;; Problem 47: Rotate List (LeetCode 61)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun rotate-right (lst k)
  (if (null lst) nil
    (let* ((n (length lst))
           (rot (mod k n)))
      (if (zerop rot) lst
        (append (nthcdr (- n rot) lst)
                (butlast lst rot))))))
