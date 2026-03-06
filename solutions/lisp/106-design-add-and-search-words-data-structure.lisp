;; Problem 106: Design Add and Search Words Data Structure (LeetCode 211)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun wd-new () (cons (make-hash-table) nil))
(defun wd-add (node word)
  (if (zerop (length word)) (cons (car node) t)
    (let* ((c (char word 0)) (ht (car node))
           (child (or (gethash c ht) (wd-new))))
      (setf (gethash c ht) (wd-add child (subseq word 1))) node)))
(defun wd-search (node word)
  (if (zerop (length word)) (cdr node)
    (if (char= (char word 0) #\.)
      (block found
        (maphash (lambda (_ c)
                   (when (wd-search c (subseq word 1))
                     (return-from found t)))
                 (car node)) nil)
      (let ((child (gethash (char word 0) (car node))))
        (and child (wd-search child (subseq word 1)))))))
