import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import {
  addLaptop,
  editLaptop,
  getAllLaptops,
} from "../redux/actions/laptopsActions";
function EditLaptop({ match }) {
  const { laptops } = useSelector((state) => state.laptopsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [laptop, setlaptop] = useState();
  const [totallaptops, settotallaptops] = useState([]);
  useEffect(() => {
    if (laptops.length == 0) {
      dispatch(getAllLaptops());
    } else {
      settotallaptops(laptops);
      setlaptop(laptops.find((o) => o._id == match.params.laptopid));
      console.log(laptop);
    }
  }, [laptops]);

  function onFinish(values) {
    values._id = laptop._id;

    dispatch(editLaptop(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          {totallaptops.length > 0 && (
            <Form
              initialValues={laptop}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Laptop</h3>

              <hr />
              <Form.Item
                name="name"
                label="Laptop name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image url or link"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="modelNo"
                label="Model number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="brand"
                label="Brand name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="processor"
                label="Processor name and version"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="ramCapacity"
                label="RAM capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="romCapacity"
                label="ROM capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="romType"
                label="ROM type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="displaySize"
                label="Display size"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="osType"
                label="OS type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div className="text-right">
                <button className="btn1">Edit Laptop</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditLaptop;
