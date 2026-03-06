;; Problem 58: Largest Rectangle in Histogram (LeetCode 84)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 58
;; Derived from the closest existing Lisp-family reference implementation.
(define (largest-rectangle-area heights)
  (let ((n (length heights)))
    (labels ((process (idx stack max-a)
               (cond
                 ((= idx n) (clean stack max-a))
                 ((and stack (> (nth (car stack) heights) (nth idx heights)))
                  (let* ((top (car stack)) (rest (cdr stack))
                         (w (if rest (- idx (car rest) 1) idx)))
                    (process idx rest (max max-a (* (nth top heights) w)))))
                 (t (process (1+ idx) (cons idx stack) max-a))))
             (clean (stack max-a)
               (if (null stack) max-a
                 (let* ((top (car stack)) (rest (cdr stack))
                        (w (if rest (- n (car rest) 1) n)))
                   (clean rest (max max-a (* (nth top heights) w)))))))
      (process 0 nil 0))))
