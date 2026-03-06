;; Problem 76: Word Ladder (LeetCode 127)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn ladder-length [begin-word end-word word-list]
  (let [dict (set word-list)]
    (if (not (dict end-word)) 0
      (loop [queue (conj clojure.lang.PersistentQueue/EMPTY [begin-word 1])
             visited #{begin-word}]
        (if (empty? queue) 0
          (let [[word depth] (peek queue) rest (pop queue)]
            (if (= word end-word) depth
              (let [nexts (->> (for [i (range (count word)) c "abcdefghijklmnopqrstuvwxyz"
                                     :let [nw (str (subs word 0 i) c (subs word (inc i)))]
                                     :when (and (dict nw) (not (visited nw)))] nw)
                               distinct)]
                (recur (reduce #(conj %1 [%2 (inc depth)]) rest nexts)
                       (into visited nexts))))))))))
