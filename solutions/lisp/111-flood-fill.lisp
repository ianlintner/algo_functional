;; Problem 111: Flood Fill (LeetCode 733)
;; Difficulty: Easy
;; Language: Lisp
;; 
(defun flood-fill (image sr sc color)
  (let ((orig (aref (aref image sr) sc)))
    (if (= orig color) image
      (let ((img (map 'vector (lambda (row) (copy-seq row)) image)))
        (labels ((fill (r c)
                   (when (and (>= r 0) (< r (length img))
                              (>= c 0) (< c (length (aref img 0)))
                              (= (aref (aref img r) c) orig))
                     (setf (aref (aref img r) c) color)
                     (fill (1- r) c) (fill (1+ r) c)
                     (fill r (1- c)) (fill r (1+ c)))))
          (fill sr sc) img)))))
