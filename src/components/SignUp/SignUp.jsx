import styles from './SignUp.module.scss';
import { registerUser } from '../../store/ArticleActions';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';

function SignUp() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const password = watch('password');

  const onSubmit = (data) => {
    dispatch(registerUser(data, () => history.push('/')));
  };

  return (
    <div className={styles.wrapper}>
      <Form className={styles.form} layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <h2>Регистрация</h2>

        <Form.Item label="Username" validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
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
              pattern: { value: /^\S+@\S+$/i, message: 'Неверный формат email' },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Пароль обязателен',
              minLength: { value: 6, message: 'Минимум 6 символов' },
              maxLength: { value: 40, message: 'Максимум 40 символов' },
            }}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Повторите пароль"
          validateStatus={errors.repeatPassword ? 'error' : ''}
          help={errors.repeatPassword?.message}
        >
          <Controller
            name="repeatPassword"
            control={control}
            rules={{
              required: 'Повтор пароля обязателен',
              validate: (value) => value === password || 'Пароли не совпадают',
            }}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item validateStatus={errors.agree ? 'error' : ''} help={errors.agree?.message}>
          <Controller
            name="agree"
            control={control}
            rules={{ required: 'Необходимо согласие' }}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value}>
                Я согласен с обработкой персональных данных
              </Checkbox>
            )}
          />
        </Form.Item>

        <Form.Item style={{ alignSelf: 'center' }}>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>

        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            Уже есть аккаунт? <Link to="/sign-in">Войти</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUp;
