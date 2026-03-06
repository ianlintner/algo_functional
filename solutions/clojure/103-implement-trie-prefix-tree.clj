;; Problem 103: Implement Trie (Prefix Tree) (LeetCode 208)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn trie-new [] {:ch {} :end false})
(defn trie-insert [node word]
  (if (empty? word) (assoc node :end true)
    (let [c (first word)
          child (get-in node [:ch c] (trie-new))]
      (assoc-in node [:ch c] (trie-insert child (rest word))))))
(defn trie-search [node word]
  (if (empty? word) (:end node)
    (when-let [child (get-in node [:ch (first word)])]
      (trie-search child (rest word)))))
