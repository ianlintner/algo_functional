;; Problem 165: Path Sum III (LeetCode 437)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 165
;; Derived from the closest existing Lisp-family reference implementation.
;; NOTE: original Common Lisp struct retained for Scheme porting
;; (defstruct tnode val left right)

(define (path-sum root target)
  (labels ((dfs (node prefix curr)
             (if (null node) 0
               (let* ((s (+ curr (tnode-val node)))
                      (cnt (gethash (- s target) prefix 0))
                      (p2 (let ((h (make-hash-table)))
                            (maphash (lambda (k v) (setf (gethash k h) v)) prefix)
                            (incf (gethash s h 0)) h)))
                 (+ cnt (dfs (tnode-left node) p2 s)
                        (dfs (tnode-right node) p2 s))))))
    (let ((init (make-hash-table)))
      (setf (gethash 0 init) 1)
      (dfs root init 0))))
