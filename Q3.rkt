
# lang racket
(define vowels '( a e i o u))

(define count-syllables
    (lambda (l coutner last_flag)
        (if (empty? l)
            counter
            (if (syallable? (car l) 
                if(zero? last_flag
                (count-syllables (cdr l) (+ counter 1) 1))
                if
                (count-syllables (cdr l) (counter) 1))
                )
            (count-syllables (cdr l) (counter) 0))))

;(define syallable
;    (lambda (vowels x)
;        (if (equal? (x car vowels))
;        1
 ;       if((equal? (x(car) (cdr vowels)))
 ;       1
;        if((equal? (x(car) (cdr (cdr vowels))))
;        1
;        if((equal? (x(car) (cdr(cdr (cdr vowels)))))
;        1
;        if((equal? (x(car) (cdr(cdr(cdr (cdr vowels))))))
 ;       1
  ;      0
;        )))))
;    )
;)

(define syllable
    (lambda (x)
    (if(equal? x 'a) 1 0)))

