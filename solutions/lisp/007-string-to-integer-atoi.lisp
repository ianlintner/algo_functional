;; Problem 7: String to Integer (atoi) (LeetCode 8)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun my-atoi (s)
  (let* ((trimmed (string-left-trim " " s))
         (sign 1) (start 0))
    (when (> (length trimmed) 0)
      (cond ((char= (char trimmed 0) #\-)
             (setf sign -1 start 1))
            ((char= (char trimmed 0) #\+)
             (setf start 1))))
    (let ((value
           (reduce (lambda (acc ch)
                     (if (digit-char-p ch)
                         (min (+ (* acc 10) (digit-char-p ch))
                              (1+ 2147483647))
                         (return-from my-atoi
                           (max -2147483648
                                (min 2147483647 (* sign acc))))))
                   (subseq trimmed start)
                   :initial-value 0)))
      (max -2147483648 (min 2147483647 (* sign value))))))
