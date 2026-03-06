;; Problem 106: Design Add and Search Words Data Structure (LeetCode 211)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn wd-new [] {:ch {} :end false})
(defn wd-add [node word]
  (if (empty? word) (assoc node :end true)
    (let [c (first word)
          child (get-in node [:ch c] (wd-new))]
      (assoc-in node [:ch c] (wd-add child (rest word))))))
(defn wd-search [node word]
  (if (empty? word) (:end node)
    (if (= (first word) \.)
      (some #(wd-search % (rest word)) (vals (:ch node)))
      (when-let [child (get-in node [:ch (first word)])]
        (wd-search child (rest word))))))
