;; Problem 124: Valid Anagram (LeetCode 242)
;; Difficulty: Easy
;; Language: Scheme
;; 
;; Scheme version for problem 124
;; Derived from the closest existing Lisp-family reference implementation.
(define (anagram-p s1 s2)
  (equal (sort (coerce s1 'list) #'char<)
         (sort (coerce s2 'list) #'char<)))
