;; Problem 154: All Nodes Distance K in Binary Tree (LeetCode 863)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn distance-k [adj target k]
  (loop [queue [[target 0]] visited #{target} result []]
    (if (empty? queue) result
      (let [[node dist] (first queue)
            rest (subvec (vec queue) 1)]
        (if (= dist k)
          (recur rest visited (conj result node))
          (let [neighbors (filter #(not (visited %)) (get adj node []))
                new-visited (into visited neighbors)]
            (recur (into (vec rest) (map #(vector % (inc dist)) neighbors))
                   new-visited result)))))))
