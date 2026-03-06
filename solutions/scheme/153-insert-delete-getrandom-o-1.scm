;; Problem 153: Insert Delete GetRandom O(1) (LeetCode 380)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 153
;; Derived from the closest existing Lisp-family reference implementation.
;; NOTE: original Common Lisp struct retained for Scheme porting
;; (defstruct rand-set (map (make-hash-table)) (list (make-array 0 :adjustable t :fill-pointer 0)))
(define (rs-insert rs val)
  (if (gethash val (rand-set-map rs)) nil
    (progn (setf (gethash val (rand-set-map rs)) (length (rand-set-list rs)))
           (vector-push-extend val (rand-set-list rs)) t)))
(define (rs-remove rs val)
  (let ((idx (gethash val (rand-set-map rs))))
    (if (null idx) nil
      (let* ((lst (rand-set-list rs)) (last-val (aref lst (1- (length lst)))))
        (setf (aref lst idx) last-val)
        (setf (gethash last-val (rand-set-map rs)) idx)
        (remhash val (rand-set-map rs))
        (vector-pop lst) t))))
