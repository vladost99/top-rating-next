import { useReducedMotion } from 'framer-motion';
import React, { useReducer, useEffect } from 'react';
import { Htag, Tag, HhData, Advantages, P, Sort, Product } from '../../components';
import { SortEnum } from '../../components/Sort/Sort.props';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { sortReducer } from './sort.reducer';
import styles from './TopPageComponent.module.css';
import {TopPageComponentProps } from './TopPageComponent.props';
export const TopPageComponent = ({page, firstCategory, products}: TopPageComponentProps): JSX.Element => {
    const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating});
    
    const shouldReduceMotion = useReducedMotion();

    const setSort = (sort: SortEnum) => {
        dispatchSort({type: sort});
    }

    useEffect(() => {
        dispatchSort({type: 'reset', initialState: products});
    }, [products])


    return (
       <div className={styles.wrapper}>
        <div className={styles.title}>
            <Htag tag='h1'>{page.title}</Htag>
            { products &&  <Tag className={styles.productLength} color='grey' size='m'>{products.length}</Tag>}
            <Sort sort={sort} setSort={setSort} />
        </div>
          <div>
          {sortedProducts && sortedProducts.map(p => (
              <Product layout={shouldReduceMotion ? false : true} key={p._id} product={p}/>
          ))}
          </div>
          <div className={styles.hhTitle}>
            <Htag tag='h2'>Вакансии - {page.category}</Htag>
            { products && <Tag color='red' size='m'>hh.ru</Tag>}
        </div>
       {firstCategory == TopLevelCategory.Courses && page.hh &&  <HhData {...page.hh}/>}
       {page.advantages && page.advantages.length > 0 && <>
            <Htag tag='h2'>Преимущества</Htag>
            <Advantages advantages={page.advantages}/>
       </> }
       {page.seoText &&  <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}></div>}
       <Htag tag='h2'>Получаемые навыки</Htag>
        {page.tags.map(t => <Tag color='primary' key={t}>{t}</Tag>)}
       </div>
    )
}