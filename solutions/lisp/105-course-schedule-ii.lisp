;; Problem 105: Course Schedule II (LeetCode 210)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun find-order (n prereqs)
  (let ((graph (make-hash-table)) (done (make-hash-table))
        (path (make-hash-table)) (order nil) (has-cycle nil))
    (dolist (p prereqs)
      (push (first p) (gethash (second p) graph nil)))
    (labels ((dfs (v)
               (unless (or has-cycle (gethash v done))
                 (when (gethash v path) (setf has-cycle t) (return-from dfs))
                 (setf (gethash v path) t)
                 (dolist (nb (gethash v graph nil)) (dfs nb))
                 (setf (gethash v done) t)
                 (push v order))))
      (dotimes (i n) (dfs i))
      (if has-cycle nil (nreverse order)))))
