import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox, Button, message, Cascader, Modal } from "antd";
import axios from "axios";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { config } from "../config/config";

const Profile = ({ onLogout }) => {
  const [form] = Form.useForm();
  const [flowerOptions, setFlowerOptions] = useState([]);
  const [userData, setUserData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState([55.751574, 37.573856]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = +localStorage.getItem("id");
        const response = await axios.get(`${config.host}/user/${id}`);
        if (!response.data) {
          throw new Error("Ошибка получения данных пользователя");
        }
        setUserData(response.data);

        const responseFlower = await axios.get(`${config.host}/family`);
        if (!responseFlower.data) {
          throw new Error("Ошибка получения данных семейства");
        }
        const data = responseFlower.data;
        const newFlowerOptions = data.map((family) => ({
          value: family.id,
          label: family.name,
          children: family.flower.map((flower) => ({
            value: flower.id,
            label: flower.name,
          })),
        }));
        form.setFieldsValue(response.data);
        form.setFieldValue('location',[response.data.x,response.data.y])
        form.setFieldValue('allergen', [
          data.find(family => family.flower.find(flower => flower.id === response.data.flowerId)).id,
          response.data.flowerId
        ]);
        setFlowerOptions(newFlowerOptions);
      } catch (error) {
        console.error("Ошибка при получении данных:", error.message);
      }
    };

    fetchData();
  }, [form]);

  const onFinish = async (values) => {
    try {
      const id = +localStorage.getItem("id");
      console.log(values)
      const { email, allergen, nickname, receive_notifications, location } = values;
      const response = await axios.put(`${config.host}/user/${id}`, {
        email: email,
        flowerId: allergen[1],
        nickname: nickname,
        receive_notifications: receive_notifications,
        x: location[0],
        y: location[1]});
      if (response.status === 200) {
        message.success("Данные успешно сохранены");
      } else {
        message.error("Ошибка при сохранении данных");
      }
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error.message);
      message.error("Ошибка при сохранении данных");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    onLogout();
  };

  const handleMapPinDrop = (location) => {
    setSelectedLocation(location);
    form.setFieldsValue({ location: location });
    setModalVisible(false);
  };

  return (
    <div>
      <h2>Личный профиль</h2>
      <Form form={form} onFinish={onFinish} initialValues={userData}>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Введите корректный E-mail!",
            },
            {
              required: true,
              message: "Пожалуйста, введите E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите ваш никнейм!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="allergen"
          label="Аллерген"
          rules={[
            { required: true, message: "Пожалуйста, выберите аллерген!" },
          ]}
        >
          <Cascader options={flowerOptions} placeholder="Выберите аллерген" />
        </Form.Item>

        <Form.Item
          name="location"
          label="Геолокация"
          rules={[
            {
              required: true,
              message: "Пожалуйста, выберите вашу геолокацию!",
            },
          ]}
        >
          <Input
            value={`${selectedLocation[0]}, ${selectedLocation[1]}`}
            readOnly
          />
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
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
          <Button onClick={handleLogout} style={{ marginLeft: "8px" }}>
            Выход
          </Button>
          <Button
            onClick={() => setModalVisible(true)}
            style={{ marginLeft: "8px" }}
          >
            Выбрать геолокацию на карте
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Выберите геолокацию на карте"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <YMaps>
          <Map
            width="100%"
            height="400px"
            defaultState={{ center: selectedLocation, zoom: 9 }}
            defaultOptions={{ suppressMapOpenBlock: true }}
            onClick={(e) => handleMapPinDrop(e.get("coords"))}
          >
            {selectedLocation && <Placemark geometry={selectedLocation} />}
          </Map>
        </YMaps>
      </Modal>
    </div>
  );
};

export default Profile;