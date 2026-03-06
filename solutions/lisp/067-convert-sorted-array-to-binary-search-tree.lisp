;; Problem 67: Convert Sorted Array to Binary Search Tree (LeetCode 108)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun sorted-array-to-bst (nums)
  (when nums
    (let* ((mid (floor (length nums) 2))
           (v (nth mid nums))
           (left (subseq nums 0 mid))
           (right (subseq nums (1+ mid))))
      (list v (sorted-array-to-bst left)
              (sorted-array-to-bst right)))))
