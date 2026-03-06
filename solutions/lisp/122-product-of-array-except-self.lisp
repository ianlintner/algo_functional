;; Problem 122: Product of Array Except Self (LeetCode 238)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun product-except-self (nums)
  (let* ((n (length nums))
         (prefix (loop for i below n
                       for p = 1 then (* p (nth (1- i) nums))
                       collect p))
         (suffix (reverse
                   (loop for i from (1- n) downto 0
                         for p = 1 then (* p (nth (1+ i) nums))
                         collect p))))
    (mapcar #'* prefix suffix)))
