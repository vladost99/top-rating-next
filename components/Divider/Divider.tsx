import React from 'react';
import styles from './Divider.module.css';
import { DividerProps } from './Divider.props';
//@ts-ignore
import cn from 'classnames';

export const Divider = ({ children, className, ...props}: DividerProps): JSX.Element => {
    return <hr  className={cn(className, styles.hr)} {...props}/>
}