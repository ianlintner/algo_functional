;; Problem 103: Implement Trie (Prefix Tree) (LeetCode 208)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun make-trie () (cons (make-hash-table) nil))
(defun trie-insert (node word)
  (if (zerop (length word)) (cons (car node) t)
    (let* ((c (char word 0)) (ht (car node))
           (child (or (gethash c ht) (make-trie))))
      (setf (gethash c ht) (trie-insert child (subseq word 1)))
      node)))
(defun trie-search (node word)
  (if (zerop (length word)) (cdr node)
    (let ((child (gethash (char word 0) (car node))))
      (and child (trie-search child (subseq word 1))))))
