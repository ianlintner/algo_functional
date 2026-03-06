;; Problem 56: Subsets (LeetCode 78)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun subsets (nums)
  (reduce (lambda (acc n)
            (append acc (mapcar (lambda (s) (append s (list n))) acc)))
          nums :initial-value '(())))
