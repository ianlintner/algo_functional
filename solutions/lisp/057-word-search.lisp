;; Problem 57: Word Search (LeetCode 79)
;; Difficulty: Med
;; Language: Lisp
;; 
(defun exist (board word)
  (let ((rows (length board)) (cols (length (car board))))
    (labels ((dfs (r c i vis)
               (cond
                 ((= i (length word)) t)
                 ((or (< r 0) (>= r rows) (< c 0) (>= c cols)) nil)
                 ((or (member (cons r c) vis :test #'equal)
                      (char/= (nth c (nth r board)) (char word i))) nil)
                 (t (let ((nvis (cons (cons r c) vis)))
                      (some (lambda (d)
                              (dfs (+ r (car d)) (+ c (cdr d)) (1+ i) nvis))
                            '((1 . 0) (-1 . 0) (0 . 1) (0 . -1))))))))
      (loop for r below rows
            thereis (loop for c below cols
                          thereis (dfs r c 0 nil))))))
