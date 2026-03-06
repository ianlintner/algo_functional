;; Problem 148: Palindrome Pairs (LeetCode 336)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn palindrome-pairs [words]
  (let [mp (into {} (map-indexed (fn [i w] [w i]) words))
        palin? (fn [s] (= s (apply str (reverse s))))]
    (mapcat (fn [[word i]]
      (mapcat (fn [j]
        (let [left (subs word 0 j) right (subs word j)
              rev-l (apply str (reverse left))
              rev-r (apply str (reverse right))
              a (when (and (palin? right) (contains? mp rev-l) (not= (mp rev-l) i))
                  [[i (mp rev-l)]])
              b (when (and (pos? j) (palin? left) (contains? mp rev-r) (not= (mp rev-r) i))
                  [[(mp rev-r) i]])]
          (concat a b)))
        (range (inc (count word)))))
      (map-indexed (fn [i w] [w i]) words))))
