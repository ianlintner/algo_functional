;; Problem 62: Symmetric Tree (LeetCode 101)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun symmetric-p (root)
  (labels ((mirror (a b)
             (cond
               ((and (null a) (null b)) t)
               ((or (null a) (null b)) nil)
               (t (and (= (car a) (car b))
                       (mirror (cadr a) (caddr b))
                       (mirror (caddr a) (cadr b)))))))
    (or (null root) (mirror (cadr root) (caddr root)))))
