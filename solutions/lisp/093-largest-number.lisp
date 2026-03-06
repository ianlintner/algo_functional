;; Problem 93: Largest Number (LeetCode 179)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun largest-number (nums)
  (let* ((strs (mapcar #'write-to-string nums))
         (sorted (sort (copy-list strs)
                       (lambda (a b)
                         (string> (concatenate 'string a b)
                                  (concatenate 'string b a)))))
         (res (apply #'concatenate 'string sorted)))
    (if (char= (char res 0) #\0) "0" res)))
