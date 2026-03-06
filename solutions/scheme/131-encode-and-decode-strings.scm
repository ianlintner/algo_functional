;; Problem 131: Encode and Decode Strings (LeetCode 271)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 131
;; Derived from the closest existing Lisp-family reference implementation.
(define (encode-strings strs)
  (reduce (lambda (acc s)
    (concatenate 'string acc
      (write-to-string (length s)) "#" s)) strs :initial-value ""))

(define (decode-strings s)
  (labels ((helper (i acc)
    (if (>= i (length s)) (nreverse acc)
      (let* ((hash (position #\# s :start i))
             (len (parse-integer (subseq s i hash)))
             (word (subseq s (1+ hash) (+ 1 hash len))))
        (helper (+ 1 hash len) (cons word acc))))))
    (helper 0 nil)))
