;; Problem 15: Letter Combinations of a Phone Number (LeetCode 17)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 15
;; Derived from the closest existing Lisp-family reference implementation.
(define (letter-combinations digits)
  (if (= (length digits) 0) nil
    (let ((phone '((#\2 . "abc") (#\3 . "def") (#\4 . "ghi") (#\5 . "jkl")
                   (#\6 . "mno") (#\7 . "pqrs") (#\8 . "tuv") (#\9 . "wxyz"))))
      (reduce (lambda (combos d)
                (loop for combo in combos
                      nconc (loop for ch across (cdr (assoc d phone))
                                  collect (concatenate 'string combo (string ch)))))
              (coerce digits 'list)
              :initial-value '("")))))
