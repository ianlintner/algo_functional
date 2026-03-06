;; Problem 53: Sort Colors (LeetCode 75)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun sort-colors (nums)
  (let ((counts (reduce (lambda (c n)
                          (let ((new-c (copy-seq c)))
                            (incf (elt new-c n)) new-c))
                        nums :initial-value (vector 0 0 0))))
    (append (make-list (elt counts 0) :initial-element 0)
            (make-list (elt counts 1) :initial-element 1)
            (make-list (elt counts 2) :initial-element 2))))
