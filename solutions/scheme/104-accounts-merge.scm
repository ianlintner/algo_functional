;; Problem 104: Accounts Merge (LeetCode 721)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 104
;; Derived from the closest existing Lisp-family reference implementation.
(define (accounts-merge accounts)
  (let ((parent (make-hash-table :test #'equal))
        (owner (make-hash-table :test #'equal)))
    (labels ((find-root (x)
               (unless (gethash x parent) (setf (gethash x parent) x))
               (if (equal (gethash x parent) x) x
                 (let ((r (find-root (gethash x parent))))
                   (setf (gethash x parent) r) r)))
             (union-nodes (a b)
               (let ((ra (find-root a)) (rb (find-root b)))
                 (unless (equal ra rb) (setf (gethash ra parent) rb)))))
      (dolist (acc accounts)
        (let ((name (first acc)) (emails (rest acc)))
          (dolist (e emails)
            (setf (gethash e owner) name)
            (union-nodes (first emails) e))))
      (let ((groups (make-hash-table :test #'equal)))
        (maphash (lambda (e _)
                   (push e (gethash (find-root e) groups nil))) owner)
        (let (result)
          (maphash (lambda (_ es)
                     (let ((sorted (sort (copy-list es) #'string<)))
                       (push (cons (gethash (first sorted) owner) sorted)
                             result)))
                   groups)
          result)))))
