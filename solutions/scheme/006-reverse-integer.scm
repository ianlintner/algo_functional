;; Problem 6: Reverse Integer (LeetCode 7)
;; Difficulty: Med
;; Language: Scheme
;; 
(define (reverse-integer x)
  (define max-int 2147483647)
  (define min-int -2147483648)
  (define (reverse-digits n acc)
    (if (= n 0)
        acc
        (reverse-digits (quotient n 10)
                        (+ (* acc 10) (modulo n 10)))))
  (let* ((sign (if (< x 0) -1 1))
         (reversed (* sign (reverse-digits (abs x) 0))))
    (if (or (> reversed max-int) (< reversed min-int))
        0
        reversed)))
