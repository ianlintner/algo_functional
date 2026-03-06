;; Problem 103: Implement Trie (Prefix Tree) (LeetCode 208)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 103
;; Derived from the closest existing Lisp-family reference implementation.
(define (make-trie ) (cons (make-hash-table) nil))
(define (trie-insert node word)
  (if (zerop (length word)) (cons (car node) t)
    (let* ((c (char word 0)) (ht (car node))
           (child (or (gethash c ht) (make-trie))))
      (setf (gethash c ht) (trie-insert child (subseq word 1)))
      node)))
(define (trie-search node word)
  (if (zerop (length word)) (cdr node)
    (let ((child (gethash (char word 0) (car node))))
      (and child (trie-search child (subseq word 1))))))
