;; Problem 71: Minimum Knight Moves (LeetCode 1197)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun min-knight-moves (x y)
  (let ((tx (abs x)) (ty (abs y))
        (moves '((1 2)(2 1)(2 -1)(1 -2)(-1 -2)(-2 -1)(-2 1)(-1 2))))
    (labels ((bfs (queue visited)
              (if (null queue) -1
                (destructuring-bind (cx cy d) (car queue)
                  (if (and (= cx tx) (= cy ty)) d
                    (let* ((rest (cdr queue))
                           (nexts (remove-if
                                   (lambda (m)
                                     (or (< (first m) -2) (< (second m) -2)
                                         (member (list (first m)(second m)) visited :test #'equal)))
                                   (mapcar (lambda (mv) (list (+ cx (first mv))(+ cy (second mv))(1+ d))) moves)))
                           (nvis (append visited (mapcar (lambda (n) (list (first n)(second n))) nexts))))
                      (bfs (append rest nexts) nvis)))))))
      (bfs '((0 0 0)) '((0 0))))))
