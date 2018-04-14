
; lang racket

; assigmnment 1
(define vowels '( a e i o u))

; Signature: count-syllables(l) 
; Type: [List(String) -> Number] 
; Purpose: count the number of syllables (not in a row). 
; Pre-conditions:  
; Tests: (count-syllables '(s o a r i n g)) => 2
;        (count-syllables '(b e e p)) => 1
;        (count-syllables '(e d e n)) => 2
;        (count-syllables '(hello world)) => 3
;        (count-syllables '()) => 0


(define count-syllables
    (lambda (l) (count-syllables-impl l 0 0)))

(define syllable
    (lambda (x vow) 
    (if (empty? vow)
        0
        (if(equal? x (car vow))
             1
             (syllable x (cdr vow))))))



(define count-syllables-impl
    (lambda (l counter last_flag)
        (if (empty? l)
            counter
            (if (not (zero? (syllable (car l) vowels))) 
                (if(zero? last_flag)
                    (count-syllables-impl (cdr l) (+ counter 1) 1)
                    (count-syllables-impl (cdr l) counter 1))   
                (count-syllables-impl (cdr l) counter 0)))))

; Tests implementation:
; (equal? 2 (count-syllables '(s o a r i n g)))
; (equal? 1 (count-syllables '(b e e p)))
; (equal? 2 (count-syllables '(e d e n)))
; (equal? 3 (count-syllables '(hello world)))
; (equal? 0 (count-syllables '()))

; assignment2

; Signature: sorted?(l pro) 
; Type: [List(Number) * function -> boolean] 
; Purpose: check if the list is orderd by the definition of the given function. 
; Pre-conditions: . 
; Tests: (sorted? '(1 3 8) <) => #t
;        (sorted? '(9 11 33 42) <) => #t
;        (sorted? '() >) => #t - it will return true for every operation because for an empty list the condtion is emptily satisifed.
;        (sorted? '(1) >) => #t - it will return true for every operation because for a one value list the condtion is emptily satisifed.
;        (sorted? '(3 2 1) >) => #t
;        (sorted? '(3 2 1) <) => #f

(define sorted?
    (lambda (l pro) 
        (if (empty? l)
            #t
            (impl-sorted? (cdr l) (car l) pro))))

(define impl-sorted? 
    (lambda (l curr pro) 
        (if (empty? l)
            #t
            (if (pro curr (car l))
                (impl-sorted? (cdr l) (car l) pro)
                #f))))

; Tests implementation: 
; (equal? #t (sorted? '(1 3 8) <))
; (equal? #t (sorted? '(9 11 33 42) <))
; (equal? #t (sorted? '() >))
; (equal? #t (sorted? '(1) >))
; (equal? #t (sorted? '(3 2 1) >))
; (equal? #f (sorted? '(3 2 1) <))


; assignement3

; Signature: merge(l1 l2) 
; Type: [List(Number) * List(Number) -> List(Number)] 
; Purpose: merge two monotonical lists into one. 
; Pre-conditions: for every i and j such that i>j l1[j]<l1[i] and l2[j]<l2[i]. 
; Tests: (merge '(1 3 8) '(2 5 6)) => '(1 2 3 5 6 8)
;        (merge '(9 11 33 42) '(2 70 90)) => '(2 9 11 33 42 70 90)
;        (merge '() '(2)) => '(2)
;        (merge '() '()) => '()
;        (merge '(1 3 6) '(2 1 7)) => execption! list not sorted

(define merge
    (lambda (l1 l2)
    (if (and (sorted? l1 <) (sorted? l2 <))
        (if (empty? l1)
        l2
        (if (empty? l2)
        l1
        (impl-merge l1 l2 '())))
        (raise 'lists-not-sorted! #t))))


(define impl-merge
    (lambda (l1 l2 ml)
    (if (empty? l1)
        (if (empty? l2)
            ml
            (impl-merge l1 (cdr l2) (append ml (list (car l2)))))
        (if (empty? l2)
            (impl-merge (cdr l1) l2 (append ml (list (car l1))))
            (if (> (car l1) (car l2))
                (impl-merge l1 (cdr l2) (append ml (list (car l2))))
                (if (= (car l1) (car l2))
                    (impl-merge (cdr l1) (cdr l2) (append ml (list (car l2))))
                    (impl-merge (cdr l1) l2 (append ml (list (car l1))))))))))

; Tests implementation: 
; (equal? '(1 2 3 5 6 8) (merge '(1 3 8) '(2 5 6)))
; (equal? '(2 9 11 33 42 70 90) (merge '(9 11 33 42) '(2 70 90)))
; (equal? '(2) (merge '() '(2)))
; (equal? '() (merge '() '()))
; (equal? '(1 2 3 5 6) (merge '(1 2 3) '(2 5 6)))
; (merge '(1 3 6) '(2 1 7))) ; Throws exception


; assigmnment 4

; Signature: remove-adjacent-duplicates(l)
; Type: [List(T) -> List(T)]
; Purpose: reduced any sequence of repeated elements to a single element
; Pre-conditions:
; Tests:  (remove-adjacent-duplicates '(1 2 3 4)) => '(1 2 3 4)
;         (remove-adjacent-duplicates '(1 1 3 3)) => '(1 3)
;         (remove-adjacent-duplicates '(y a b b a d a b b a d o o)) => '(y a b a d a b a d o)
;         (remove-adjacent-duplicates '(yeah yeah yeah)) => '(yeah)
;         (remove-adjacent-duplicates '()) => '()

(define remove-adjacent-duplicates
  (lambda (l)
    (if(empty? l)
    l
    (if(null? (cdr l))
       l
       (if (eqv? (car l) (cadr l))
            (remove-adjacent-duplicates(cdr l))
       (cons (car l)(remove-adjacent-duplicates (cdr l))))))))


; Tests implementation:
; (equal? '(1 2 3 4) (remove-adjacent-duplicates '(1 2 3 4)))
; (equal? '(1 3) (remove-adjacent-duplicates '(1 1 3 3)))
; (equal? '(y a b a d a b a d o) (remove-adjacent-duplicates '(y a b b a d a b b a d o o)))
; (equal? '(yeah) (remove-adjacent-duplicates '(yeah yeah yeah)))
; (equal? '() (remove-adjacent-duplicates '()))