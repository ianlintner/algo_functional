;; Problem 2: Add Two Numbers (LeetCode 2)
;; Difficulty: Med
;; Language: Scheme
;; 
(define (add-two-numbers l1 l2)
  (let loop ((a l1) (b l2) (carry 0))
    (if (and (null? a) (null? b) (= carry 0))
        '()
        (let* ((v1 (if (null? a) 0 (car a)))
               (v2 (if (null? b) 0 (car b)))
               (sum (+ v1 v2 carry)))
          (cons (modulo sum 10)
                (loop (if (null? a) '() (cdr a))
                      (if (null? b) '() (cdr b))
                      (quotient sum 10))))))
