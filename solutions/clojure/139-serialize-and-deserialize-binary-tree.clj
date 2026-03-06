;; Problem 139: Serialize and Deserialize Binary Tree (LeetCode 297)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn serialize [root]
  (if (nil? root) "null"
    (str (:val root) "," (serialize (:left root)) "," (serialize (:right root)))))

(defn deserialize [data]
  (let [tokens (clojure.string/split data #",")]
    (letfn [(build [ts]
              (if (= (first ts) "null")
                [nil (rest ts)]
                (let [v (Integer/parseInt (first ts))
                      [left r1] (build (rest ts))
                      [right r2] (build r1)]
                  [{:val v :left left :right right} r2])))]
      (first (build tokens)))))
