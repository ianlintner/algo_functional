;; Problem 54: Minimum Window Substring (LeetCode 76)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn min-window [s t]
  (let [need (frequencies t)
        keys (count need)
        n (count s)]
    (loop [l 0 r 0 have 0 win {} best [0 ##Inf]]
      (if (>= r n)
        (if (= (second best) ##Inf) ""
          (subs s (first best) (+ (first best) (second best))))
        (let [c (nth s r)
              win (update win c (fnil inc 0))
              have (if (= (win c) (get need c 0)) (inc have) have)]
          (let [[l have win best]
                (loop [l l have have win win best best]
                  (if (< have keys) [l have win best]
                    (let [best (if (< (- r l -1) (second best))
                                [l (- r l -1)] best)
                          lc (nth s l)
                          win (update win lc dec)
                          have (if (< (get win lc 0) (get need lc 0))
                                (dec have) have)]
                      (recur (inc l) have win best))))]
            (recur l (inc r) have win best)))))))
