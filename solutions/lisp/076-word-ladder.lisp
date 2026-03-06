;; Problem 76: Word Ladder (LeetCode 127)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defun ladder-length (begin-word end-word word-list)
  (let ((dict (make-hash-table :test 'equal)))
    (dolist (w word-list) (setf (gethash w dict) t))
    (if (not (gethash end-word dict)) 0
      (labels ((bfs (queue visited)
                (if (null queue) 0
                  (destructuring-bind (word depth) (car queue)
                    (if (string= word end-word) depth
                      (let* ((rest (cdr queue))
                             (nexts (loop for i below (length word)
                                         nconc (loop for c from (char-code #\a) to (char-code #\z)
                                                     for nw = (concatenate 'string
                                                                (subseq word 0 i)
                                                                (string (code-char c))
                                                                (subseq word (1+ i)))
                                                     when (and (gethash nw dict)
                                                               (not (gethash nw visited)))
                                                     collect nw))))
                        (dolist (n nexts) (setf (gethash n visited) t))
                        (bfs (append rest (mapcar (lambda (n) (list n (1+ depth))) nexts))
                             visited)))))))
        (let ((vis (make-hash-table :test 'equal)))
          (setf (gethash begin-word vis) t)
          (bfs (list (list begin-word 1)) vis))))))
