;; Problem 111: Flood Fill (LeetCode 733)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn flood-fill [image sr sc color]
  (let [orig (get-in image [sr sc])]
    (if (= orig color) image
      (letfn [(fill [img r c]
                (if (or (< r 0) (>= r (count img))
                        (< c 0) (>= c (count (first img)))
                        (not= (get-in img [r c]) orig))
                  img
                  (reduce (fn [im [dr dc]] (fill im (+ r dr) (+ c dc)))
                          (assoc-in img [r c] color)
                          [[-1 0] [1 0] [0 -1] [0 1]])))]
        (fill image sr sc)))))
