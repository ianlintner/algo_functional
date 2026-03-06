;; Problem 145: Odd Even Linked List (LeetCode 328)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 145
;; Derived from the closest existing Lisp-family reference implementation.
;; NOTE: original Common Lisp struct retained for Scheme porting
;; (defstruct lnode val next)

(define (odd-even-list head)
  (labels ((collect (node is-odd odds evens)
    (if (null node) (values (nreverse odds) (nreverse evens))
      (if is-odd
        (collect (lnode-next node) nil (cons (lnode-val node) odds) evens)
        (collect (lnode-next node) t odds (cons (lnode-val node) evens)))))
           (build (vals)
    (reduce (lambda (acc v) (make-lnode :val v :next acc))
            vals :initial-value nil :from-end t)))
    (multiple-value-bind (odds evens) (collect head t nil nil)
      (build (append odds evens)))))
