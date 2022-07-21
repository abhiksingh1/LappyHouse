import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteLaptop, getAllLaptops } from "../redux/actions/laptopsActions";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
const { RangePicker } = DatePicker;
function AdminHome() {
  const { laptops } = useSelector((state) => state.laptopsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalLaptops, setTotallaptops] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLaptops());
  }, []);

  useEffect(() => {
    setTotallaptops(laptops);
  }, [laptops]);

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addlaptop">ADD LAPTOP</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading == true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalLaptops.map((laptop) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="laptop p-2 bs1">
                <img src={laptop.image} className="laptopimg" />

                <div className="laptop-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{laptop.name}</p>
                    <p> Rent Per Hour {laptop.rentPerHour} /-</p>
                  </div>

                  <div className="mr-4">
                    <Link to={`/editlaptop/${laptop._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this laptop?"
                      onConfirm={() => {
                        dispatch(deleteLaptop({ laptopid: laptop._id }));
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;
