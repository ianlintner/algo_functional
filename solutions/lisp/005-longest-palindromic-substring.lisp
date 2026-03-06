;; Problem 5: Longest Palindromic Substring (LeetCode 5)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun longest-palindrome (s)
  (let ((best ""))
    (labels ((expand (l r)
               (loop while (and (>= l 0) (< r (length s))
                                (char= (char s l) (char s r)))
                     do (decf l) (incf r))
               (subseq s (1+ l) r)))
      (loop for i from 0 below (length s)
            for odd  = (expand i i)
            for even = (expand i (1+ i))
            for candidate = (if (>= (length odd) (length even)) odd even)
            when (> (length candidate) (length best))
              do (setf best candidate)))
    best))
