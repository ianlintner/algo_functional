;; Problem 3: Longest Substring Without Repeating Characters (LeetCode 3)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun length-of-longest-substring (s)
  (let ((seen (make-hash-table :test 'equal))
        (left 0)
        (best 0))
    (loop for i from 0 below (length s)
          for c = (char s i)
          do (let ((j (gethash c seen)))
               (when (and j (>= j left))
                 (setf left (1+ j)))
               (setf (gethash c seen) i)
               (setf best (max best (- i left -1)))))
    best))
