;; Problem 5: Longest Palindromic Substring (LeetCode 5)
;; Difficulty: Med
;; Language: Scheme
;; 
(define (longest-palindrome s)
  (define n (string-length s))
  (define (expand left right)
    (let loop ((l left) (r right))
      (if (and (>= l 0)
               (< r n)
               (char=? (string-ref s l) (string-ref s r)))
          (loop (- l 1) (+ r 1))
          (substring s (+ l 1) r))))
  (let loop ((i 0) (best ""))
    (if (= i n)
        best
        (let* ((odd (expand i i))
               (even (expand i (+ i 1)))
               (candidate (if (>= (string-length odd) (string-length even)) odd even))
               (next-best (if (> (string-length candidate) (string-length best)) candidate best)))
          (loop (+ i 1) next-best))))
