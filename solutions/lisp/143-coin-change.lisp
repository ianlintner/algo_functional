;; Problem 143: Coin Change (LeetCode 322)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun coin-change (coins amount)
  (let* ((inf (1+ amount))
         (dp (make-array (1+ amount) :initial-element inf)))
    (setf (aref dp 0) 0)
    (dolist (coin coins)
      (loop for i from coin to amount do
        (setf (aref dp i) (min (aref dp i) (1+ (aref dp (- i coin)))))))
    (if (>= (aref dp amount) inf) -1 (aref dp amount))))
