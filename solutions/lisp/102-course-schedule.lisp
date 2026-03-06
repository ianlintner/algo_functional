;; Problem 102: Course Schedule (LeetCode 207)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun can-finish (n prereqs)
  (let ((graph (make-hash-table)))
    (dolist (p prereqs)
      (push (first p) (gethash (second p) graph nil)))
    (let ((path (make-hash-table)) (done (make-hash-table)))
      (labels ((dfs (v)
                 (cond ((gethash v done) nil)
                       ((gethash v path) t)
                       (t (setf (gethash v path) t)
                          (let ((cyc (some #'dfs (gethash v graph nil))))
                            (setf (gethash v done) t) cyc)))))
        (not (loop for i below n thereis (dfs i)))))))
