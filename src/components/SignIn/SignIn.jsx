import styles from './SignIn.module.scss';
import { loginUser } from '../../store/ArticleActions';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';

function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginUser(data, () => history.push('/')));
  };

  return (
    <div className={styles.wrapper}>
      <Form className={styles.form} layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <h2>Вход</h2>

        <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email обязателен',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Неверный формат email',
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Пароль" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Пароль обязателен' }}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item style={{ alignSelf: 'center' }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>

        <Form.Item>
          <div style={{ textAlign: 'center' }}>
            У вас нет аккаунта? <Link to="/sign-up">Зарегистрироваться</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignIn;
