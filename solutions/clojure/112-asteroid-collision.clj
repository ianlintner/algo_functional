;; Problem 112: Asteroid Collision (LeetCode 735)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn asteroid-collision [asteroids]
  (letfn [(resolve [stack a]
            (cond
              (empty? stack) [a]
              (or (pos? a) (neg? (peek stack))) (conj stack a)
              (= (peek stack) (- a)) (pop stack)
              (< (peek stack) (- a)) (resolve (pop stack) a)
              :else stack))]
    (reduce resolve [] asteroids)))
