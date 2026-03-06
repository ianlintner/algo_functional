;; Problem 158: Random Pick with Weight (LeetCode 528)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 158
;; Derived from the closest existing Lisp-family reference implementation.
(define (build-picker weights)
  (let ((sum 0))
    (mapcar (lambda (w) (incf sum w) sum) weights)))

(define (pick-index prefix)
  (let* ((total (car (last prefix)))
         (target (1+ (random total)))
         (arr (coerce prefix 'vector)))
    (labels ((search (lo hi)
      (if (>= lo hi) lo
        (let ((mid (floor (+ lo hi) 2)))
          (if (< (aref arr mid) target) (search (1+ mid) hi)
            (search lo mid))))))
      (search 0 (1- (length arr))))))
