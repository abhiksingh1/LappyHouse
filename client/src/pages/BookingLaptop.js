import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllLaptops } from "../redux/actions/laptopsActions";
import moment from "moment";
import { bookLaptop } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from "aos";

import "aos/dist/aos.css"; // You can also use <link> for styles
const { RangePicker } = DatePicker;
function BookingLaptop({ match }) {
  const { laptops } = useSelector((state) => state.laptopsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [laptop, setlaptop] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [charger, setcharger] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (laptops.length == 0) {
      dispatch(getAllLaptops());
    } else {
      setlaptop(laptops.find((o) => o._id == match.params.laptopid));
    }
  }, [laptops]);

  useEffect(() => {
    setTotalAmount(totalHours * laptop.rentPerHour);
    if (charger) {
      setTotalAmount(totalAmount + 1 * totalHours);
    }
  }, [charger, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      laptop: laptop._id,
      totalHours,
      totalAmount,
      chargerRequired: charger,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookLaptop(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            src={laptop.image}
            className="laptopimg2 bs1 w-100"
            data-aos="flip-left"
            data-aos-duration="1500"
          />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Laptop Info
          </Divider>
          <div style={{ textAlign: "right" }}>

            <p>{laptop.name}</p>
            <p>Model Number : {laptop.modelNo}</p>
            <p>Brand : {laptop.brand}</p>
            <p>Processor : {laptop.processor}</p>
            <p>RAM : {laptop.ramCapacity} GB </p>
            <p>ROM : {laptop.romCapacity} GB </p>
            <p>ROM Type : {laptop.romType}</p>
            <p>Display Size : {laptop.displaySize} "</p>
            <p>OS : {laptop.osType}</p>
            <p>{laptop.rentPerHour} Rent Per hour /-</p>


          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{laptop.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setcharger(true);
                  } else {
                    setcharger(false);
                  }
                }}
              >
                Charger Required
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency="inr"
                amount={totalAmount * 100}
                stripeKey="pk_test_51LDvD6SCKJVpRfCsHmf2kCUG2EdcP7v8St5ZMKMAJy9nqS8B0TJCLodFluIj4Tu0Esd5mu06fGHdrX6GcVO38YXK00CON7P3Kh"
              >
                <button className="btn1">Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>

        {laptop.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {laptop.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingLaptop;
