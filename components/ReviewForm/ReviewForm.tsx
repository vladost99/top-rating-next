import React, {useState} from 'react';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import { Button, Input, Rating, Textarea } from '..';
import CloseIcon from './close.svg';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
//@ts-ignore
import cn from 'classnames';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import { API } from '../../helpers/api';

export const ReviewForm = ({productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const onSubmit = async (formData: IReviewForm) => {  
      try {
        const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
        if(data.message) {
            setIsSuccess(true);
            reset();
        }
        else {
           setError('Что-то пошло не так');
        }
      }
      catch(error: any) {
         setError(error.message);
      }
    }

    return (
        <form  onSubmit={handleSubmit(onSubmit)}>
        <div className={cn(styles.reviewForm, className)}>
        {/* <input  {...register("name")} placeholder='Имя'/> */}
            <Input  
            {...register("name", {required: {value: true, message: 'Заполните имя'}})}
            error={errors.name}
            tabIndex={isOpened ? 0 : -1}
             placeholder='Имя'/>

            <Input
              {...register("title", {required: {value: true, message: 'заполните заголовок'}})}
              placeholder='Заголовок отзыва'
              className={styles.title}
              tabIndex={isOpened ? 0 : -1}
              error={errors.title}
              />
            <div className={styles.rating}>
                <span>Оценка:</span>
                <Controller
                 control={control}
                 name='rating'
                 rules={{required: {value: true, message: 'Укажите рейтинг'} }}
                 render={({ field }) => (
                    <Rating 
                      isEditable
                      setRating={field.onChange}
                      ref={field.ref}
                      tabIndex={isOpened ? 0 : -1}
                      rating={field.value}
                      error={errors.rating}
                       />
                 )}

                />
            </div>
            <Textarea 
              {...register("description", {required: {value: true, message: 'заполните описание'}})}
              placeholder='Текст отзыва'
              className={styles.description}
              error={errors.description}
              tabIndex={isOpened ? 0 : -1}
               />
            <div className={styles.submit}>
               <Button tabIndex={isOpened ? 0 : -1} type='submit' appearance='primary'>Отправить</Button>
               <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
            </div>
        </div>
      { isSuccess &&  <div className={cn(styles.success, styles.panel)}>
            <div className={styles.successTitle}>Ваш отзыв отправлен</div>
            <div>
                Спасибо, ваш отзыв будет опубликован после проверки.
            </div>
            <CloseIcon onClick={() => setIsSuccess(false)} className={styles.close}/>
        </div>}
        { error &&  <div className={cn(styles.panel, styles.error)}>
            Что-то пошло не так, попробуйте обновить страницу
            <CloseIcon onClick={() => setError('')} className={styles.close}/>
        </div>}
        </form>
    )
}