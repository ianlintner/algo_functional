;; Problem 127: Meeting Rooms II (LeetCode 253)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun min-meeting-rooms (intervals)
  (let ((starts (sort (mapcar #'car intervals) #'<))
        (ends (sort (mapcar #'cadr intervals) #'<)))
    (labels ((go (ss es rooms max-r)
               (if (null ss) max-r
                 (if (< (car ss) (car es))
                   (go (cdr ss) es (1+ rooms) (max max-r (1+ rooms)))
                   (go (cdr ss) (cdr es) rooms max-r)))))
      (go starts ends 0 0))))
