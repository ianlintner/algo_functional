;; Problem 43: Jump Game (LeetCode 55)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun can-jump (nums)
  (>= (let ((reach 0))
        (loop for n in nums for i from 0 do
          (setf reach (if (> i reach) -1 (max reach (+ i n)))))
        reach)
      (1- (length nums))))
