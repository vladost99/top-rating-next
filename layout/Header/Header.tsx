import React, {useState, useEffect} from 'react';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';
import Logo from '../logo.svg';
//@ts-ignore
import cn from 'classnames';
import { ButtonIcon } from '../../components';
import { Sidebar } from '../Sidebar/Sidebar';
import { motion, useReducedMotion } from 'framer-motion';
import {useRouter} from 'next/router';
export const Header = ({className,...props}: HeaderProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const router = useRouter();

    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        setIsOpened(false);
    }, [router])

    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20
            }
        },
        closed: {
            opacity: shouldReduceMotion ? 1 : 0,
            x: '100%'
        }
    }

    return (
        <header className={cn(className,styles.header )} {...props}>
           <Logo/>
           <ButtonIcon apperance='white' icon='menu' onClick={() => setIsOpened(true)} />
           <motion.div 
           className={styles.mobileMenu}
           variants={variants}
           initial={'closed'}
           animate={isOpened ? 'opened' : 'closed'}
           >
                <Sidebar/>
                <ButtonIcon className={styles.menuClose} apperance='white' icon='close'  onClick={() => setIsOpened(false)} />
           </motion.div>
        </header>
    )
}