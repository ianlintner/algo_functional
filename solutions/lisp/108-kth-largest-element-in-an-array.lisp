;; Problem 108: Kth Largest Element in an Array (LeetCode 215)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun find-kth-largest (nums k)
  (let* ((pivot (nth (floor (length nums) 2) nums))
         (hi (remove-if-not (lambda (x) (> x pivot)) nums))
         (eq (remove-if-not (lambda (x) (= x pivot)) nums))
         (lo (remove-if-not (lambda (x) (< x pivot)) nums)))
    (cond
      ((<= k (length hi)) (find-kth-largest hi k))
      ((<= k (+ (length hi) (length eq))) pivot)
      (t (find-kth-largest lo (- k (length hi) (length eq)))))))
