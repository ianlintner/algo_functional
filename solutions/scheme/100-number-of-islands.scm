;; Problem 100: Number of Islands (LeetCode 200)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 100
;; Derived from the closest existing Lisp-family reference implementation.
(define (num-islands grid)
  (let ((rows (length grid)) (cols (length (car grid)))
        (visited (make-hash-table :test #'equal)) (count 0))
    (labels ((at (r c) (nth c (nth r grid)))
             (flood (r c)
               (when (and (>= r 0) (< r rows) (>= c 0) (< c cols)
                          (char= (at r c) #\1)
                          (not (gethash (cons r c) visited)))
                 (setf (gethash (cons r c) visited) t)
                 (flood (1- r) c) (flood (1+ r) c)
                 (flood r (1- c)) (flood r (1+ c)))))
      (dotimes (r rows)
        (dotimes (c cols)
          (when (and (char= (at r c) #\1)
                     (not (gethash (cons r c) visited)))
            (incf count) (flood r c))))
      count)))
