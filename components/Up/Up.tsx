import React, {useEffect} from 'react'
import styles from './Up.module.css';
import UpIcon from './up.svg';
//@ts-ignore
import cn from 'classnames';
import { useScrollY } from './../../hooks/useScrollY';
import { useAnimation, motion } from 'framer-motion';
import { ButtonIcon } from '..';

export const  Up = (): JSX.Element => {
    const controls = useAnimation();
    const y = useScrollY();

    useEffect(() => {
        controls.start({opacity: y  / document.body.scrollHeight});
    },[y, controls])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <motion.div
          className={styles.up}
          animate={controls}
          initial={{opacity: 0}}  
         >
            <ButtonIcon onClick={scrollToTop} apperance='primary' icon='up' />
        </motion.div>
    )
}
