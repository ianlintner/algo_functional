;; Problem 4: Median of Two Sorted Arrays (LeetCode 4)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defun find-median-sorted-arrays (nums1 nums2)
  (let* ((merged (sort (append nums1 nums2) #'<))
         (n (length merged))
         (mid (floor n 2)))
    (if (evenp n)
        (/ (+ (nth (1- mid) merged) (nth mid merged)) 2.0)
        (float (nth mid merged)))))
