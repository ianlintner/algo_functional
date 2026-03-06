;; Problem 150: Design Hit Counter (LeetCode 362)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun make-hit-counter () nil)
(defun hc-hit (counter timestamp) (append counter (list timestamp)))
(defun hc-get-hits (counter timestamp)
  (let ((filtered (remove-if-not (lambda (t) (> t (- timestamp 300))) counter)))
    (values (length filtered) filtered)))
