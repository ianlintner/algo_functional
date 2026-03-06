;; Problem 49: Add Binary (LeetCode 67)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun add-binary (a b)
  (labels ((go (i j carry)
             (if (and (< i 0) (< j 0) (zerop carry)) ""
               (let* ((da (if (>= i 0) (- (char-code (char a i)) 48) 0))
                      (db (if (>= j 0) (- (char-code (char b j)) 48) 0))
                      (s (+ da db carry)))
                 (concatenate 'string
                   (go (1- i) (1- j) (floor s 2))
                   (write-to-string (mod s 2)))))))
    (go (1- (length a)) (1- (length b)) 0)))
