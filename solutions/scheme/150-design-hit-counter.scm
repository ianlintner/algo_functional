;; Problem 150: Design Hit Counter (LeetCode 362)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 150
;; Derived from the closest existing Lisp-family reference implementation.
(define (make-hit-counter ) nil)
(define (hc-hit counter timestamp) (append counter (list timestamp)))
(define (hc-get-hits counter timestamp)
  (let ((filtered (remove-if-not (lambda (t) (> t (- timestamp 300))) counter)))
    (values (length filtered) filtered)))
