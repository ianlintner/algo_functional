;; Problem 32: Combination Sum (LeetCode 39)
;; Difficulty: Med
;; Language: Scheme
;; 
;; Scheme version for problem 32
;; Derived from the closest existing Lisp-family reference implementation.
(define (combination-sum candidates target)
  (let ((sorted (sort (copy-list candidates) #'<)))
    (labels ((go (cands remain curr)
               (cond
                 ((zerop remain) (list (reverse curr)))
                 ((null cands) nil)
                 ((> (car cands) remain) nil)
                 (t (append
                      (go cands (- remain (car cands)) (cons (car cands) curr))
                      (go (cdr cands) remain curr))))))
      (go sorted target nil))))
