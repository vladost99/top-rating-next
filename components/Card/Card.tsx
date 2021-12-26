import React, { ForwardedRef, forwardRef } from 'react';
import { CardProps } from './Card.props';
import styles from './Card.module.css';
//@ts-ignore
import cn from 'classnames';
export const Card = forwardRef(({color = 'white', className, children ,...props}: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    
    return (
        <div ref={ref} className={cn(className, styles.card, {
            [styles.blue]: color == 'blue'
        })} {...props}>{children}</div>
    )
})