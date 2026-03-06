;; Problem 118: Implement Queue using Stacks (LeetCode 232)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 118
;; Derived from the closest existing Lisp-family reference implementation.
;; NOTE: original Common Lisp struct retained for Scheme porting
;; (defstruct fqueue in-stack out-stack)

(define (make-empty-queue ) (make-fqueue :in-stack nil :out-stack nil))
(define (fq-enqueue q x)
  (make-fqueue :in-stack (cons x (fqueue-in-stack q))
               :out-stack (fqueue-out-stack q)))
(define (fq-transfer q)
  (if (fqueue-out-stack q) q
    (make-fqueue :in-stack nil
                 :out-stack (reverse (fqueue-in-stack q)))))
(define (fq-dequeue q)
  (let ((tq (fq-transfer q)))
    (values (car (fqueue-out-stack tq))
            (make-fqueue :in-stack (fqueue-in-stack tq)
                         :out-stack (cdr (fqueue-out-stack tq))))))
