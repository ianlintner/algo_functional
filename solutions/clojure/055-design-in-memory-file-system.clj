;; Problem 55: Design In-Memory File System (LeetCode 588)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn mk-node [] {:children {} :content ""})

(defn parse-path [path]
  (filterv (complement empty?) (clojure.string/split path #"/")))

(defn navigate [root parts]
  (reduce (fn [node p]
            (get-in node [:children p] (mk-node)))
          root parts))

(defn ensure-path [root parts]
  (if (empty? parts) root
    (let [[p & ps] parts
          child (get-in root [:children p] (mk-node))]
      (assoc-in root [:children p] (ensure-path child ps)))))

(defn fs-ls [root path]
  (let [parts (parse-path path)
        node (navigate root parts)]
    (if (seq (:content node))
      [(peek parts)]
      (sort (keys (:children node))))))

(defn fs-mkdir [root path]
  (ensure-path root (parse-path path)))

(defn fs-add-content [root path content]
  (let [parts (parse-path path)]
    (update-in (ensure-path root parts)
               (into [] (interleave (repeat :children) parts))
               (fn [node] (update node :content str content)))))
