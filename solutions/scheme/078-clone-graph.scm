;; Problem 78: Clone Graph (LeetCode 133)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 78
;; Derived from the closest existing Lisp-family reference implementation.
(define (clone-graph node &optional (visited (make-hash-table)))
  (or (gethash (car node) visited)
      (let ((clone (list (car node) nil)))
        (setf (gethash (car node) visited) clone)
        (setf (cadr clone)
              (mapcar (lambda (nb) (clone-graph nb visited)) (cadr node)))
        clone)))
