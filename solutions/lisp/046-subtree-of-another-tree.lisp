;; Problem 46: Subtree of Another Tree (LeetCode 572)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun same-tree-p (a b)
  (cond
    ((and (null a) (null b)) t)
    ((or (null a) (null b)) nil)
    (t (and (= (car a) (car b))
            (same-tree-p (cadr a) (cadr b))
            (same-tree-p (caddr a) (caddr b))))))

(defun is-subtree (root sub)
  (cond
    ((null root) (null sub))
    (t (or (same-tree-p root sub)
           (is-subtree (cadr root) sub)
           (is-subtree (caddr root) sub)))))
