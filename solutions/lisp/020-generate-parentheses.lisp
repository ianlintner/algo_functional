;; Problem 20: Generate Parentheses (LeetCode 22)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun generate-parenthesis (n)
  (labels ((gen (open close current)
             (if (= (length current) (* 2 n))
                 (list current)
                 (nconc
                   (when (< open n)
                     (gen (1+ open) close (concatenate 'string current "(")))
                   (when (< close open)
                     (gen open (1+ close) (concatenate 'string current ")")))))))
    (gen 0 0 "")))
