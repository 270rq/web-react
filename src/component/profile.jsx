import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Button, message, Cascader, Modal } from 'antd';
import axios from 'axios';
import { YMaps, Map, Placemark} from "@pbe/react-yandex-maps";


const Profile = ({ id }) => {
  const [form] = Form.useForm();
  const [flowerOptions, setFlowerOptions] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState([55.751574, 37.573856]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${id}`);
        if (!response.data) {
          throw new Error("Network response for user data was not valid");
        }
        setUserData(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/user/`, values);
      if (response.status === 200) {
        message.success('Данные успешно сохранены');
      } else {
        message.error('Ошибка при сохранении данных');
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
      message.error('Ошибка при сохранении данных');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
  };

  const handleMapPinDrop = (location) => {
    setSelectedLocation(location);
    form.setFieldsValue({ location: location });
    setModalVisible(false);
  };

  return (
    <div>
      <h2>Личный профиль</h2>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={userData}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'Введите корректный E-mail!',
            },
            {
              required: true,
              message: 'Пожалуйста, введите E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш никнейм!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="allergen"
          label="Аллерген"
          rules={[{ required: true, message: 'Пожалуйста, выберите аллерген!' }]}
        >
          <Cascader options={flowerOptions} placeholder="Выберите аллерген" />
        </Form.Item>

        <Form.Item
          name="location"
          label="Геолокация"
          rules={[{ required: true, message: 'Пожалуйста, выберите вашу геолокацию!' }]}
        >
          <Input placeholder="Выберите вашу геолокацию" readOnly />
        </Form.Item>

        <Form.Item
          name="receive_notifications"
          label="Разрешить уведомления"
          tooltip="Хотите получать уведомления о выбранном аллергене по вашему адресу?"
          valuePropName="checked"
        >
          <Checkbox checked={userData.receive_notifications} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Сохранить</Button>
          <Button onClick={handleLogout} style={{ marginLeft: '8px' }}>Выход</Button>
          <Button onClick={() => setModalVisible(true)} style={{ marginLeft: '8px' }}>Выбрать геолокацию на карте</Button>
        </Form.Item>
      </Form>

      <Modal
        title="Выберите геолокацию на карте"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <YMaps>
          <Map
            width="100%"
            height="400px"
            defaultState={{ center: selectedLocation, zoom: 9 }}
          defaultOptions={{ suppressMapOpenBlock: true }}

            onClick={(e) => handleMapPinDrop(e.get('coords'))}

          >
            {selectedLocation && <Placemark geometry={selectedLocation} />}
          </Map>
        </YMaps>
      </Modal>
    </div>
  );
};

export default Profile;