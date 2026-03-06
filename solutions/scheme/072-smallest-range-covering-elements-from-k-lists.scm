;; Problem 72: Smallest Range Covering Elements from K Lists (LeetCode 632)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 72
;; Derived from the closest existing Lisp-family reference implementation.
(define (smallest-range nums)
  (let* ((tagged (sort (loop for lst in nums for i from 0
                             append (mapcar (lambda (v) (list v i)) lst))
                       (lambda (a b) (< (car a) (car b)))))
         (arr (coerce tagged 'vector))
         (k (length nums)))
    (labels ((shrink (l counts cov best rv)
              (if (< cov k) (list l counts cov best)
                (let* ((lv (first (aref arr l))) (lg (second (aref arr l)))
                       (nb (if (< (- rv lv) (- (second best) (first best)))
                              (list lv rv) best))
                       (nc (mapcar (lambda (p) (if (= (car p) lg)
                                                   (cons (car p) (1- (cdr p))) p)) counts))
                       (ncov (if (zerop (cdr (assoc lg nc))) (1- cov) cov)))
                  (shrink (1+ l) nc ncov nb rv)))))
      (loop for i below (length arr)
            with left = 0 and counts = nil and cov = 0
            and best = (list most-negative-fixnum most-positive-fixnum)
            for v = (first (aref arr i)) for g = (second (aref arr i))
            do (let ((prev (cdr (assoc g counts))))
                 (if prev (rplacd (assoc g counts) (1+ prev))
                   (push (cons g 1) counts))
                 (when (or (null prev) (zerop prev)) (incf cov))
                 (destructuring-bind (l2 c2 cv2 b2)
                     (shrink left counts cov best v)
                   (setf left l2 counts c2 cov cv2 best b2)))
            finally (return best)))))
