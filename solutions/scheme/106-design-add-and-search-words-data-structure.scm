;; Problem 106: Design Add and Search Words Data Structure (LeetCode 211)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 106
;; Derived from the closest existing Lisp-family reference implementation.
(define (wd-new ) (cons (make-hash-table) nil))
(define (wd-add node word)
  (if (zerop (length word)) (cons (car node) t)
    (let* ((c (char word 0)) (ht (car node))
           (child (or (gethash c ht) (wd-new))))
      (setf (gethash c ht) (wd-add child (subseq word 1))) node)))
(define (wd-search node word)
  (if (zerop (length word)) (cdr node)
    (if (char= (char word 0) #\.)
      (block found
        (maphash (lambda (_ c)
                   (when (wd-search c (subseq word 1))
                     (return-from found t)))
                 (car node)) nil)
      (let ((child (gethash (char word 0) (car node))))
        (and child (wd-search child (subseq word 1)))))))
