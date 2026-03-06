;; Problem 55: Design In-Memory File System (LeetCode 588)
;; Difficulty: Hard
;; Language: Scheme
;; 
;; Scheme version for problem 55
;; Derived from the closest existing Lisp-family reference implementation.
;; NOTE: original Common Lisp struct retained for Scheme porting
;; (defstruct fs-node (children (make-hash-table :test 'equal)) (content ""))

(define (parse-path path)
  (remove-if (lambda (s) (string= s ""))
             (uiop:split-string path :separator "/")))

(define (fs-navigate root parts)
  (reduce (lambda (node p)
            (or (gethash p (fs-node-children node))
                (let ((new (make-fs-node)))
                  (setf (gethash p (fs-node-children node)) new)
                  new)))
          parts :initial-value root))

(define (fs-ls root path)
  (let* ((parts (parse-path path))
         (node (fs-navigate root parts)))
    (if (string/= (fs-node-content node) "")
        (list (car (last parts)))
        (sort (loop for k being the hash-keys of (fs-node-children node)
                    collect k) #'string<))))

(define (fs-mkdir root path) (fs-navigate root (parse-path path)))

(define (fs-add-content root path content)
  (let ((node (fs-navigate root (parse-path path))))
    (setf (fs-node-content node)
          (concatenate 'string (fs-node-content node) content))))
