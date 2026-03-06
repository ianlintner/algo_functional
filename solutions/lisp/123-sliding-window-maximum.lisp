;; Problem 123: Sliding Window Maximum (LeetCode 239)
;; Difficulty: Hard
;; Language: Lisp
;; 
(defun max-sliding-window (nums k)
  (let ((n (length nums)))
    (labels ((go (i dq res)
               (if (>= i n) (nreverse res)
                 (let* ((dq (if (and dq (<= (car dq) (- i k)))
                            (cdr dq) dq))
                        (dq (loop while (and dq (<= (nth (car (last dq)) nums)
                                                     (nth i nums)))
                                  do (setf dq (butlast dq))
                                  finally (return dq)))
                        (dq (append dq (list i)))
                        (res (if (>= i (1- k))
                               (cons (nth (car dq) nums) res) res)))
                   (go (1+ i) dq res)))))
      (go 0 nil nil))))
