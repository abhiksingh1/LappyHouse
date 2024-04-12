import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllLaptops } from "../redux/actions/laptopsActions";
import { Col, Row, Divider, DatePicker, Checkbox } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
const { RangePicker } = DatePicker;
function Home() {
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

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];

    for (var laptop of laptops) {
      if (laptop.bookedTimeSlots.length == 0) {
        temp.push(laptop);
      } else {
        for (var booking of laptop.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(laptop);
          }
        }
      }
    }

    setTotallaptops(temp);
  }

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
          />
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

                  <div>
                    <button className="btn1 mr-2">
                      <Link to={`/booking/${laptop._id}`}>Book Now</Link>
                    </button>
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

export default Home;
