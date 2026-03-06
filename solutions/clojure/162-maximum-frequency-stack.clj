;; Problem 162: Maximum Frequency Stack (LeetCode 895)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn freq-stack-new [] {:freq {} :group {} :max-freq 0})

(defn freq-stack-push [{:keys [freq group max-freq]} val]
  (let [f (inc (get freq val 0))]
    {:freq (assoc freq val f)
     :group (update group f #(conj (or % []) val))
     :max-freq (max max-freq f)}))

(defn freq-stack-pop [{:keys [freq group max-freq]}]
  (let [stack (get group max-freq)
        val (peek stack)
        rest-stack (pop stack)
        new-group (if (empty? rest-stack)
                    (dissoc group max-freq)
                    (assoc group max-freq rest-stack))
        new-mf (if (empty? rest-stack) (dec max-freq) max-freq)]
    [val {:freq (update freq val dec)
          :group new-group
          :max-freq new-mf}]))
