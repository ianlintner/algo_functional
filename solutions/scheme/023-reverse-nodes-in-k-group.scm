;; Problem 23: Reverse Nodes in k-Group (LeetCode 25)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 23
;; Derived from the closest existing Lisp-family reference implementation.
(define (reverse-k-group lst k)
  (let ((group (subseq-safe lst 0 k))
        (rest  (nthcdr k lst)))
    (if (< (length group) k)
        lst
        (append (reverse group) (reverse-k-group rest k)))))

(define (subseq-safe lst start end)
  (loop for x in (nthcdr start lst)
        for i from start below end
        collect x))
