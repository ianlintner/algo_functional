;; Problem 37: Group Anagrams (LeetCode 49)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 37
;; Derived from the closest existing Lisp-family reference implementation.
(define (group-anagrams strs)
  (let ((table (make-hash-table :test 'equal)))
    (dolist (s strs)
      (let ((key (coerce (sort (copy-seq (coerce s 'list)) #'char<) 'string)))
        (push s (gethash key table nil))))
    (loop for v being the hash-values of table collect v)))
