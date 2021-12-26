import React, {useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef} from 'react';
import styles from './Rating.module.css';
import { RatingProps } from './Rating.props';
import StartIcon from './Star.svg';
//@ts-ignore
import cn from 'classnames';

export const Rating = forwardRef(({isEditable = false,tabIndex, error, rating,setRating, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
        if(!isEditable) return -1;
        
        if(!rating && i == 0) return tabIndex ??  0

        if(r === i + 1) return tabIndex ??  0

        return -1;
    };

    const constructRating = (currentRating: number) => {
        const updateArray = ratingArray.map((r: JSX.Element, i: number ) => {
            return (
                <span
                    className={cn(styles.star,{
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay( i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                    onKeyDown={handleKey}
                    tabIndex={computeFocus(rating, i)}
                    ref={r => ratingArrayRef.current?.push(r)}
                >
                    <StartIcon/>
                </span>
            );
        });
        setRatingArray(updateArray);
    }
    const changeDisplay = (i: number) => {
        if(!isEditable) {
            return;
        }
        constructRating(i);
    }
    const onClick = (i: number) => {
        if(!isEditable || !setRating) {
            return;
        }
       setRating(i);
    }
    const handleKey = ( e: KeyboardEvent<HTMLDivElement>) => {
        if(!isEditable || !setRating) return
        if(e.code == 'ArrowRight' || e.code ==  'ArrowUp') {
            if(!rating) {
              setRating(1);
            }
            else{
                e.preventDefault();
                setRating(rating < 5 ? rating  + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus();
        }
        if(e.code == 'ArrowLeft' ||  e.code == 'ArrowDown') {
            e.preventDefault();
            setRating(rating > 1 ? rating  - 1 : 1);
            ratingArrayRef.current[rating - 2]?.focus();
        }
    }

    return (
      <div ref={ref} {...props} className={cn(styles.ratingWrapper, {
          [styles.error]: error
      })}>
          {ratingArray.map((r,i) => (<span key={i}>{r}</span>))}
          {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    )
})