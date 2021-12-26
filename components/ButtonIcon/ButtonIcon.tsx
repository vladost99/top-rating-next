import React from 'react'
import styles from './ButtonIcon.module.css';
import { ButtonIconProps, icons } from './ButtonIcon.props';
//@ts-ignore
import cn from 'classnames';

export const ButtonIcon = ({apperance, icon, className, ...props}: ButtonIconProps): JSX.Element => {
    const IconComp = icons[icon];
    return (
        <button className={cn(styles.button, className, {
            [styles.primary]: apperance == 'primary',
            [styles.white]: apperance == 'white'
        })} {...props}>
            <IconComp/>
        </button>
    )
}

export default ButtonIcon
