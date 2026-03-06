;; Problem 93: Largest Number (LeetCode 179)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn largest-number [nums]
  (let [strs (map str nums)
        sorted (sort (fn [a b] (compare (str b a) (str a b))) strs)
        res (apply str sorted)]
    (if (= (first res) \0) "0" res)))
