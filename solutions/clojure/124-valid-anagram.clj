;; Problem 124: Valid Anagram (LeetCode 242)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn anagram? [s t]
  (= (frequencies s) (frequencies t)))
