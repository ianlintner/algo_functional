;; Problem 23: Reverse Nodes in k-Group (LeetCode 25)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defun reverse-k-group (lst k)
  (let ((group (subseq-safe lst 0 k))
        (rest  (nthcdr k lst)))
    (if (< (length group) k)
        lst
        (append (reverse group) (reverse-k-group rest k)))))

(defun subseq-safe (lst start end)
  (loop for x in (nthcdr start lst)
        for i from start below end
        collect x))
