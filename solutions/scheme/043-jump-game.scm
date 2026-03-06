;; Problem 43: Jump Game (LeetCode 55)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 43
;; Derived from the closest existing Lisp-family reference implementation.
(define (can-jump nums)
  (>= (let ((reach 0))
        (loop for n in nums for i from 0 do
          (setf reach (if (> i reach) -1 (max reach (+ i n)))))
        reach)
      (1- (length nums))))
