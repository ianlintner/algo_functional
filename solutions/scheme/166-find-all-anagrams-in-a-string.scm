;; Problem 166: Find All Anagrams in a String (LeetCode 438)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 166
;; Derived from the closest existing Lisp-family reference implementation.
(define (find-anagrams s p)
  (let ((p-freq (make-array 26 :initial-element 0))
        (w-freq (make-array 26 :initial-element 0))
        (pn (length p)) (result nil))
    (dotimes (i pn) (incf (aref p-freq (- (char-code (char p i)) (char-code #\a)))))
    (dotimes (i (length s) (nreverse result))
      (incf (aref w-freq (- (char-code (char s i)) (char-code #\a))))
      (when (>= i pn)
        (decf (aref w-freq (- (char-code (char s (- i pn)) ) (char-code #\a)))))
      (when (equalp w-freq p-freq)
        (push (1+ (- i pn)) result)))))
