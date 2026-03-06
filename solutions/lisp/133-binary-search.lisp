;; Problem 133: Binary Search (LeetCode 704)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun binary-search (nums target)
  (let ((arr (coerce nums 'vector)))
    (labels ((search-fn (lo hi)
      (if (> lo hi) -1
        (let* ((mid (+ lo (floor (- hi lo) 2)))
               (v (aref arr mid)))
          (cond ((= v target) mid)
                ((< v target) (search-fn (1+ mid) hi))
                (t (search-fn lo (1- mid))))))))
      (search-fn 0 (1- (length arr))))))
