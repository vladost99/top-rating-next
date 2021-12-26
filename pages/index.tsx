import { GetStaticProps } from 'next';
import React, {useState} from 'react'
import { Htag, Button, P, Tag, Rating, Input, Textarea } from '../components'
import { withLayout} from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';


 function Home({menu} : HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <>
      <Htag tag='h1'>Добро пожаловать на сайт посвященный рейтингам</Htag>
    </>
  )
}

export default withLayout(Home);

export const getStaticProps:  GetStaticProps = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {firstCategory});
  return {
    props: {
      menu,
      firstCategory
    }
  }
}


interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}