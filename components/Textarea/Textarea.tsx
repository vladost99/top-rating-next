import React, {forwardRef, ForwardedRef} from 'react';
import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';
//@ts-ignore
import cn from 'classnames';
export const Textarea =  forwardRef(({className, error, ...props}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
   return (
      <div className={cn(styles.textareaWrapper, className)}>
         <textarea ref={ref} className={cn(styles.textarea, {
            [styles.error]: error
         })} {...props} />
         {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
   )
})