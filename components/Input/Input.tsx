import React, { forwardRef, ForwardedRef } from 'react';
import { InputProps} from './Input.props';
import styles from './Input.module.css';
//@ts-ignore
import cn from 'classnames';
export const Input = forwardRef(({className, error, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
   return (
      <div className={cn(styles.inputWrapper,className)}>
         <input ref={ref} className={cn(styles.input, {
            [styles.error]: error
         })} {...props}/>
         {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
   )
});