;; Problem 136: Find the Duplicate Number (LeetCode 287)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn find-duplicate [nums]
  (let [arr (vec (cons 0 nums))
        step #(arr %)
        find-meet (fn find-meet [s f]
          (let [s' (step s) f' (step (step f))]
            (if (= s' f') s' (recur s' f'))))
        meet (find-meet (step 0) (step (step 0)))]
    (loop [a 0 b meet]
      (if (= a b) a (recur (step a) (step b))))))
