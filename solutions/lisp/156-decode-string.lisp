;; Problem 156: Decode String (LeetCode 394)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun decode-string (s)
  (labels ((helper (chars)
    (let ((result "") (cs chars))
      (loop while (and cs (not (char= (car cs) #\]))) do
        (if (digit-char-p (car cs))
          (let ((num 0))
            (loop while (and cs (digit-char-p (car cs))) do
              (setf num (+ (* num 10) (digit-char-p (car cs))) cs (cdr cs)))
            (setf cs (cdr cs)) ; skip [
            (multiple-value-bind (inner rest) (helper cs)
              (setf result (concatenate 'string result
                (apply #'concatenate 'string (make-list num :initial-element inner)))
                cs rest))
            (setf cs (cdr cs))) ; skip ]
          (progn (setf result (concatenate 'string result (string (car cs)))
                       cs (cdr cs)))))
      (values result cs))))
    (helper (coerce s 'list))))
