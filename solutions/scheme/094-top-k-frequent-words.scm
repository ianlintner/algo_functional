;; Problem 94: Top K Frequent Words (LeetCode 692)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 94
;; Derived from the closest existing Lisp-family reference implementation.
(define (top-k-frequent words k)
  (let ((freq (make-hash-table :test #'equal)))
    (dolist (w words)
      (incf (gethash w freq 0)))
    (let ((pairs nil))
      (maphash (lambda (w c) (push (cons w c) pairs)) freq)
      (mapcar #'car
        (subseq (sort pairs (lambda (a b)
                  (or (> (cdr a) (cdr b))
                      (and (= (cdr a) (cdr b))
                           (string< (car a) (car b))))))
                0 k)))))
