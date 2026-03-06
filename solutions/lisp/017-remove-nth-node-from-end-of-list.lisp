;; Problem 17: Remove Nth Node From End of List (LeetCode 19)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun remove-nth-from-end (lst n)
  (let* ((len (length lst))
         (idx (- len n)))
    (loop for x in lst
          for i from 0
          unless (= i idx) collect x)))
