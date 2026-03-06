;; Problem 4: Median of Two Sorted Arrays (LeetCode 4)
;; Difficulty: Hard
;; Language: Scheme
;; 
(define (merge-sorted xs ys)
  (cond
    ((null? xs) ys)
    ((null? ys) xs)
    ((<= (car xs) (car ys))
     (cons (car xs) (merge-sorted (cdr xs) ys)))
    (else
     (cons (car ys) (merge-sorted xs (cdr ys))))))

(define (find-median-sorted-arrays nums1 nums2)
  (let* ((merged (merge-sorted nums1 nums2))
         (n (length merged))
         (mid (quotient n 2)))
    (if (even? n)
        (/ (+ (list-ref merged (- mid 1)) (list-ref merged mid)) 2.0)
        (* 1.0 (list-ref merged mid)))))
