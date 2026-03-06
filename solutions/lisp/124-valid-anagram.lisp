;; Problem 124: Valid Anagram (LeetCode 242)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun anagram-p (s1 s2)
  (equal (sort (coerce s1 'list) #'char<)
         (sort (coerce s2 'list) #'char<)))
