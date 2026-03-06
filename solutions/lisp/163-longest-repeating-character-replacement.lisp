;; Problem 163: Longest Repeating Character Replacement (LeetCode 424)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun character-replacement (s k)
  (let ((count (make-array 26 :initial-element 0))
        (left 0) (max-c 0) (best 0))
    (dotimes (right (length s) best)
      (let ((idx (- (char-code (char s right)) (char-code #\A))))
        (incf (aref count idx))
        (setf max-c (max max-c (aref count idx)))
        (when (> (- (1+ (- right left)) max-c) k)
          (decf (aref count (- (char-code (char s left)) (char-code #\A))))
          (incf left))
        (setf best (max best (- (1+ right) left)))))))
