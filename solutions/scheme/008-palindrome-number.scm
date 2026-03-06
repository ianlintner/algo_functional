;; Problem 8: Palindrome Number (LeetCode 9)
;; Difficulty: Easy
;; Language: Scheme
;; 
(define (is-palindrome x)
  (and (>= x 0)
       (let* ((s (number->string x))
              (chars (string->list s)))
         (equal? chars (reverse chars)))))
