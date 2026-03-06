;; Problem 145: Odd Even Linked List (LeetCode 328)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn odd-even-list [head]
  (loop [node head is-odd true odds [] evens []]
    (if (nil? node) 
      (let [vals (concat odds evens)]
        (reduce (fn [acc v] {:val v :next acc}) nil (reverse vals)))
      (if is-odd
        (recur (:next node) false (conj odds (:val node)) evens)
        (recur (:next node) true odds (conj evens (:val node)))))))
