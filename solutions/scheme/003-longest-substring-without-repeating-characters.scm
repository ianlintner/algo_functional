;; Problem 3: Longest Substring Without Repeating Characters (LeetCode 3)
;; Difficulty: Med
;; Language: Scheme
;; 
(define (length-of-longest-substring s)
  (let ((chars (string->list s)))
    (let loop ((rest chars) (i 0) (left 0) (seen '()) (best 0))
      (if (null? rest)
          best
          (let* ((ch (car rest))
                 (entry (assoc ch seen))
                 (new-left (if entry (max left (+ (cdr entry) 1)) left))
                 (new-best (max best (+ (- i new-left) 1))))
            (loop (cdr rest)
                  (+ i 1)
                  new-left
                  (cons (cons ch i) seen)
                  new-best))))))
