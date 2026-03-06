;; Problem 96: Reverse Bits (LeetCode 190)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun reverse-bits (n)
  (reduce (lambda (acc i)
            (logior acc (ash (logand (ash n (- i)) 1) (- 31 i))))
          (loop for i below 32 collect i) :initial-value 0))
