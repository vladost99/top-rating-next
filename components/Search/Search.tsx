import React, {useState, KeyboardEvent} from 'react';
import styles from './Search.module.css';
import { SearchProps} from './Search.props';
//@ts-ignore
import cn from 'classnames';
import { Button, Input } from '..';
import GlassIcon from './glass.svg';
import { useRouter } from 'next/router';
export const Search = ({ className, ...props}: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>('');
    const router = useRouter();
    const goToSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        })
    }
    const handleKeydown = (e: KeyboardEvent) => {
        if(e.key === 'Enter') {
            goToSearch();
        }
    }

    return (
      <div className={cn(className, styles.search)}>
          <Input
           placeholder='Поиск...'
           value={search}
           className={styles.input}
           onKeyDown={(e) => handleKeydown(e)}
           onChange={(e) => setSearch(e.target.value)}
          />
          <Button 
            appearance='primary'
            className={styles.button}
            onClick={goToSearch}
          >
              <GlassIcon/>
          </Button>
      </div>
    )
}