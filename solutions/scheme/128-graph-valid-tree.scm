;; Problem 128: Graph Valid Tree (LeetCode 261)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 128
;; Derived from the closest existing Lisp-family reference implementation.
(define (valid-tree n edges)
  (if (/= (length edges) (1- n)) nil
    (let ((adj (make-hash-table)))
      (dolist (e edges)
        (push (cadr e) (gethash (car e) adj nil))
        (push (car e) (gethash (cadr e) adj nil)))
      (let ((visited (make-hash-table)))
        (labels ((dfs (node)
                   (unless (gethash node visited)
                     (setf (gethash node visited) t)
                     (dolist (nb (gethash node adj))
                       (dfs nb)))))
          (dfs 0)
          (= (hash-table-count visited) n))))))
