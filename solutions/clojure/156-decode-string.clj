;; Problem 156: Decode String (LeetCode 394)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn decode-string [s]
  (letfn [(helper [chars]
            (loop [cs chars acc ""]
              (cond
                (or (empty? cs) (= (first cs) \])) [acc (rest cs)]
                (Character/isDigit (first cs))
                  (let [[num-chars rest] (split-with #(Character/isDigit %) cs)
                        n (Integer/parseInt (apply str num-chars))
                        [inner remaining] (helper (rest rest))
                        [next final] (helper remaining)]
                    [(str acc (apply str (repeat n inner)) next) final])
                :else (recur (rest cs) (str acc (first cs))))))]
    (first (helper (seq s)))))
