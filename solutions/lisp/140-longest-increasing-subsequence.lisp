;; Problem 140: Longest Increasing Subsequence (LeetCode 300)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun length-of-lis (nums)
  (let ((tails (make-array 0 :adjustable t :fill-pointer 0)))
    (dolist (num nums)
      (let ((pos (bisect tails num 0 (length tails))))
        (if (= pos (length tails))
          (vector-push-extend num tails)
          (setf (aref tails pos) num))))
    (length tails)))

(defun bisect (tails target lo hi)
  (if (>= lo hi) lo
    (let ((mid (+ lo (floor (- hi lo) 2))))
      (if (< (aref tails mid) target)
        (bisect tails target (1+ mid) hi)
        (bisect tails target lo mid)))))
