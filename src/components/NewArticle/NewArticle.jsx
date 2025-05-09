import styles from './NewArticle.module.scss';
import { createArticle } from '../../store/ArticleActions';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Space } from 'antd';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

function NewArticle() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tagList: [{ tag: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.articlesData);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/sign-in');
    }
  }, [isAuthenticated, history]);

  const onSubmit = (data) => {
    const formattedData = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: data.tagList.map((tagObj) => tagObj.tag).filter(Boolean),
    };

    dispatch(createArticle(formattedData, () => history.push('/')));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h2>Создать статью</h2>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Title" validateStatus={errors.title ? 'error' : ''} help={errors.title?.message}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title обязателен' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Short Description"
            validateStatus={errors.description ? 'error' : ''}
            help={errors.description?.message}
          >
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Short description обязательна' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item label="Text" validateStatus={errors.text ? 'error' : ''} help={errors.text?.message}>
            <Controller
              name="text"
              control={control}
              rules={{ required: 'Text обязателен' }}
              render={({ field }) => <Input.TextArea {...field} style={{ resize: 'none', height: 170 }} />}
            />
          </Form.Item>

          <Form.Item label="Tags">
            {fields.map((field, index) => (
              <Space key={field.id} style={{ display: 'flex', marginBottom: 8 }} align="start">
                <Controller
                  name={`tagList.${index}.tag`}
                  control={control}
                  defaultValue={field.tag}
                  render={({ field: inputField }) => <Input {...inputField} placeholder={`Tag ${index + 1}`} />}
                />
                <Button onClick={() => remove(index)} danger disabled={fields.length === 1}>
                  Удалить
                </Button>
              </Space>
            ))}
            <Button type="dashed" onClick={() => append({ tag: '' })} style={{ marginTop: 8 }}>
              Добавить тэг
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Создать статью
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default NewArticle;
