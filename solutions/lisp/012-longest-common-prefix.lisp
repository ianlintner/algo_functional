;; Problem 12: Longest Common Prefix (LeetCode 14)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun longest-common-prefix (strs)
  (if (null strs) ""
    (reduce (lambda (prefix s)
              (let ((len (min (length prefix) (length s))))
                (subseq prefix 0
                  (loop for i from 0 below len
                        while (char= (char prefix i) (char s i))
                        finally (return i)))))
            strs)))
