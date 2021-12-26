import React from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import ArrowIcon from './arrow.svg';
// @ts-ignore
import cn from 'classnames';

export const Button = ({children, arrow = 'none',  appearance, className, ...props}: ButtonProps): JSX.Element => {
   return (
       <button {...props} className={cn(styles.button,className, {
           [styles.primary]: appearance === 'primary',
           [styles.ghost]: appearance === 'ghost',
       })}>
           {children}
           {arrow !== 'none' &&  <span className={cn(styles.arrow, {
               [styles.down]: arrow == 'down',
               [styles.right]: arrow == 'right'
           })}> 
              <ArrowIcon/>
            </span>}
       </button>
   )
}