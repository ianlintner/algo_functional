;; Problem 1: Two Sum (LeetCode 1)
;; Difficulty: Easy
;; Language: Scheme
;; 
(define (two-sum nums target)
  (let loop ((rest nums) (i 0) (seen '()))
    (if (null? rest)
        '()
        (let* ((num (car rest))
               (complement (- target num))
               (match (assoc complement seen)))
          (if match
              (list (cdr match) i)
              (loop (cdr rest)
                    (+ i 1)
                    (cons (cons num i) seen)))))))
