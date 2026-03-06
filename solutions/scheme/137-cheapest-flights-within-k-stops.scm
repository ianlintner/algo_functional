;; Problem 137: Cheapest Flights Within K Stops (LeetCode 787)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 137
;; Derived from the closest existing Lisp-family reference implementation.
(define (find-cheapest-price n flights src dst k)
  (let ((inf most-positive-fixnum)
        (prices (make-array n :initial-element most-positive-fixnum)))
    (setf (aref prices src) 0)
    (dotimes (_ (1+ k))
      (let ((prev (copy-seq prices)))
        (dolist (f flights)
          (destructuring-bind (u v w) f
            (when (and (< (aref prev u) inf)
                       (< (+ (aref prev u) w) (aref prices v)))
              (setf (aref prices v) (+ (aref prev u) w)))))))
    (if (= (aref prices dst) inf) -1 (aref prices dst))))
