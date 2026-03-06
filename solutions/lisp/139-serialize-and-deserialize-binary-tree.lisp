;; Problem 139: Serialize and Deserialize Binary Tree (LeetCode 297)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defstruct tnode val left right)

(defun serialize-tree (root)
  (if (null root) "null"
    (format nil "~A,~A,~A" (tnode-val root)
            (serialize-tree (tnode-left root))
            (serialize-tree (tnode-right root)))))

(defun deserialize-tree (data)
  (let ((tokens (split-string data ",")))
    (labels ((build (ts)
               (if (string= (car ts) "null")
                 (values nil (cdr ts))
                 (multiple-value-bind (left r1) (build (cdr ts))
                   (multiple-value-bind (right r2) (build r1)
                     (values (make-tnode :val (parse-integer (car ts))
                               :left left :right right) r2))))))
      (build tokens))))
