;; Problem 4: Median of Two Sorted Arrays (LeetCode 4)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn find-median-sorted-arrays [nums1 nums2]
  (let [merged (sort (concat nums1 nums2))
        n (count merged)
        mid (quot n 2)]
    (if (even? n)
      (/ (+ (nth merged (dec mid)) (nth merged mid)) 2.0)
      (double (nth merged mid)))))
