import styles from './EditProfile.module.scss';
import { updateUser } from '../../store/ArticleActions';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.articlesData.user);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
        email: user.email || '',
        password: '',
        image: user.image || '',
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    dispatch(updateUser(data, () => history.push('/')));
  };

  return (
    <div className={styles.wrapper}>
      <Form className={styles.form} layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <h2>Редактировать профиль</h2>

        <Form.Item label="Имя" validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
          <Controller
            name="username"
            control={control}
            rules={{
              required: 'Имя обязательно',
              minLength: { value: 3, message: 'Минимум 3 символа' },
              maxLength: { value: 20, message: 'Максимум 20 символов' },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email обязателен',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Неверный формат email',
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Новый пароль" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
          <Controller
            name="password"
            control={control}
            rules={{
              minLength: {
                value: 6,
                message: 'Минимум 6 символов',
              },
              maxLength: {
                value: 40,
                message: 'Максимум 40 символов',
              },
            }}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item label="Ссылка на аватар" validateStatus={errors.image ? 'error' : ''} help={errors.image?.message}>
          <Controller
            name="image"
            control={control}
            rules={{
              pattern: {
                value: /^https?:\/\/.*\.(jpg|jpeg|png|webp|avif|gif|svg)$/i,
                message: 'Введите корректный URL изображения',
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditProfile;
