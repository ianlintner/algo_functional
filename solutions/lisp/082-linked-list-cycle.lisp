;; Problem 82: Linked List Cycle (LeetCode 141)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun has-cycle (head)
  (labels ((detect (slow fast)
             (cond
               ((or (null fast) (null (cdr fast))) nil)
               ((eq slow fast) t)
               (t (detect (cdr slow) (cddr fast))))))
    (if (null head) nil (detect head (cdr head)))))
