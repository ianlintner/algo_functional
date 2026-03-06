;; Problem 118: Implement Queue using Stacks (LeetCode 232)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn make-queue [] {:in [] :out []})
(defn enqueue [q x] (update q :in conj x))
(defn transfer [q]
  (if (seq (:out q)) q
    {:in [] :out (vec (reverse (:in q)))}))
(defn dequeue [q]
  (let [q (transfer q)]
    [(first (:out q)) (update q :out #(vec (rest %)))]))
(defn fpeek [q] (first (dequeue q)))
