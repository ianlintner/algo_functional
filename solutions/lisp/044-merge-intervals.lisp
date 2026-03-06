;; Problem 44: Merge Intervals (LeetCode 56)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun merge-intervals (intervals)
  (reduce (lambda (acc cur)
            (let ((last (car (last acc))))
              (if (and last (<= (first cur) (second last)))
                  (append (butlast acc)
                          (list (list (first last) (max (second last) (second cur)))))
                  (append acc (list cur)))))
          (sort (copy-seq intervals) #'< :key #'first)
          :initial-value nil))
