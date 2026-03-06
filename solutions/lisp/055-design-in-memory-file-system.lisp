;; Problem 55: Design In-Memory File System (LeetCode 588)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defstruct fs-node (children (make-hash-table :test 'equal)) (content ""))

(defun parse-path (path)
  (remove-if (lambda (s) (string= s ""))
             (uiop:split-string path :separator "/")))

(defun fs-navigate (root parts)
  (reduce (lambda (node p)
            (or (gethash p (fs-node-children node))
                (let ((new (make-fs-node)))
                  (setf (gethash p (fs-node-children node)) new)
                  new)))
          parts :initial-value root))

(defun fs-ls (root path)
  (let* ((parts (parse-path path))
         (node (fs-navigate root parts)))
    (if (string/= (fs-node-content node) "")
        (list (car (last parts)))
        (sort (loop for k being the hash-keys of (fs-node-children node)
                    collect k) #'string<))))

(defun fs-mkdir (root path) (fs-navigate root (parse-path path)))

(defun fs-add-content (root path content)
  (let ((node (fs-navigate root (parse-path path))))
    (setf (fs-node-content node)
          (concatenate 'string (fs-node-content node) content))))
