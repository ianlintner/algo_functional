;; Problem 41: Maximum Subarray (LeetCode 53)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun max-sub-array (nums)
  (reduce (lambda (state n)
            (let* ((best (car state)) (cur (cdr state))
                   (c (max n (+ cur n))))
              (cons (max best c) c)))
          (rest nums)
          :initial-value (cons (first nums) (first nums))))
