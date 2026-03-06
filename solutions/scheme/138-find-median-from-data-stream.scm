;; Problem 138: Find Median from Data Stream (LeetCode 295)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 138
;; Derived from the closest existing Lisp-family reference implementation.
;; NOTE: original Common Lisp struct retained for Scheme porting
;; (defstruct median-finder (lo nil) (hi nil))

(define (mf-add mf num)
  (let ((lo (median-finder-lo mf))
        (hi (median-finder-hi mf)))
    (if (or (null lo) (<= num (car (last lo))))
      (setf lo (sort (cons num lo) #'<))
      (setf hi (sort (cons num hi) #'<)))
    (cond
      ((> (length lo) (1+ (length hi)))
       (push (car (last lo)) hi)
       (setf lo (butlast lo)))
      ((> (length hi) (length lo))
       (setf lo (append lo (list (car hi))))
       (setf hi (cdr hi))))
    (setf (median-finder-lo mf) lo (median-finder-hi mf) hi)))

(define (mf-median mf)
  (let ((lo (median-finder-lo mf))
        (hi (median-finder-hi mf)))
    (if (> (length lo) (length hi))
      (car (last lo))
      (/ (+ (car (last lo)) (car hi)) 2.0))))
