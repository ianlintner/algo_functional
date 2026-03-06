;; Problem 130: Alien Dictionary (LeetCode 269)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defun alien-order (words)
  (let ((chars (remove-duplicates (apply #'append (mapcar
          (lambda (w) (coerce w 'list)) words))))
        (graph (make-hash-table)) (in-deg (make-hash-table)))
    (dolist (c chars) (setf (gethash c graph) nil (gethash c in-deg) 0))
    (loop for (w1 w2) on words while w2 do
      (loop for a across w1 for b across w2
            when (char/= a b) do
              (unless (member b (gethash a graph))
                (push b (gethash a graph))
                (incf (gethash b in-deg 0)))
              (return)))
    (labels ((topo (queue res)
               (if (null queue)
                 (if (= (length res) (length chars))
                   (coerce (reverse res) 'string) "")
                 (let* ((c (car queue)) (rest (cdr queue))
                        (nbs (gethash c graph)))
                   (dolist (n nbs)
                     (decf (gethash n in-deg))
                     (when (zerop (gethash n in-deg))
                       (setf rest (append rest (list n)))))
                   (topo rest (cons c res))))))
      (topo (loop for c in chars when (zerop (gethash c in-deg)) collect c)
            nil))))
