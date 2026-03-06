;; Problem 84: LRU Cache (LeetCode 146)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun lru-new (cap) (list cap nil nil))

(defun lru-get (lru key)
  (destructuring-bind (cap order cache) lru
    (let ((entry (assoc key cache)))
      (if (null entry) (values nil lru)
        (let ((new-order (append (remove key order) (list key))))
          (values (cdr entry) (list cap new-order cache)))))))

(defun lru-put (lru key val)
  (destructuring-bind (cap order cache) lru
    (let* ((new-order (append (remove key order) (list key)))
           (new-cache (cons (cons key val) (remove key cache :key #'car))))
      (if (> (length new-order) cap)
        (let ((evict (car new-order)))
          (list cap (cdr new-order) (remove evict new-cache :key #'car)))
        (list cap new-order new-cache)))))
