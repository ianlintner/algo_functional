;; Problem 112: Asteroid Collision (LeetCode 735)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun asteroid-collision (asteroids)
  (labels ((resolve (stack a)
             (cond
               ((null stack) (list a))
               ((or (> a 0) (< (car stack) 0)) (cons a stack))
               ((= (car stack) (- a)) (cdr stack))
               ((< (car stack) (- a)) (resolve (cdr stack) a))
               (t stack))))
    (nreverse
      (reduce #'resolve asteroids :initial-value nil))))
