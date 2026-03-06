;; Problem 169: Time Based Key-Value Store (LeetCode 981)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 169
;; Derived from the closest existing Lisp-family reference implementation.
;; NOTE: original Common Lisp struct retained for Scheme porting
;; (defstruct time-map (store (make-hash-table :test 'equal)))

(define (tm-set tm key value timestamp)
  (push (cons timestamp value) (gethash key (time-map-store tm))))

(define (tm-get tm key timestamp)
  (let* ((entries (sort (copy-list (gethash key (time-map-store tm)))
                        #'< :key #'car))
         (result ""))
    (dolist (e entries result)
      (if (<= (car e) timestamp)
        (setf result (cdr e))
        (return result)))))
