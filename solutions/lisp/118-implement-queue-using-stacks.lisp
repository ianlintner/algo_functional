;; Problem 118: Implement Queue using Stacks (LeetCode 232)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defstruct fqueue in-stack out-stack)

(defun make-empty-queue () (make-fqueue :in-stack nil :out-stack nil))
(defun fq-enqueue (q x)
  (make-fqueue :in-stack (cons x (fqueue-in-stack q))
               :out-stack (fqueue-out-stack q)))
(defun fq-transfer (q)
  (if (fqueue-out-stack q) q
    (make-fqueue :in-stack nil
                 :out-stack (reverse (fqueue-in-stack q)))))
(defun fq-dequeue (q)
  (let ((tq (fq-transfer q)))
    (values (car (fqueue-out-stack tq))
            (make-fqueue :in-stack (fqueue-in-stack tq)
                         :out-stack (cdr (fqueue-out-stack tq))))))
