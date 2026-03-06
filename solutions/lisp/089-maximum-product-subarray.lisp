;; Problem 89: Maximum Product Subarray (LeetCode 152)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun max-product (nums)
  (let ((h (car nums)))
    (car (reduce (lambda (acc n)
                   (let* ((best (first acc)) (mx (second acc)) (mn (third acc))
                          (hi (max n (* mx n) (* mn n)))
                          (lo (min n (* mx n) (* mn n))))
                     (list (max best hi) hi lo)))
                 (cdr nums) :initial-value (list h h h)))))
