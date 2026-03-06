;; Problem 91: Min Stack (LeetCode 155)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun ms-push (stack x)
  (let ((cur-min (if stack (min x (cadar stack)) x)))
    (cons (list x cur-min) stack)))

(defun ms-pop (stack) (cdr stack))
(defun ms-top (stack) (caar stack))
(defun ms-get-min (stack) (cadar stack))
