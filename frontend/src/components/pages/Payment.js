import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';

function Payment() {
  const location = useLocation();
  const formData = location.state;
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    phone: phone_number,
    orderDate: order_date,
    orderTime: order_time,
  } = formData;
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [message, setMessage] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isPaying) {
      try {
        // Make a post request to the payment API
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:5000/api/v1/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            phone_number,
            order_date,
            order_time,
            price: 100,
            payment: false,
          }),
        });
        // Handle the response from the payment API
        const data = await response?.json();
        if (!data?.payment) {
          setPaymentStatus(false);
          setPaymentId(data?.order_id);
          setIsPaying(true);
        } else {
          setPaymentStatus(true);
          setIsPaying(false);
        }
        setIsLoading(false);
      } catch (error) {
        // Handle any errors that occur during the Pay post request
        console.log(error);
        setIsPaying(false);
        setIsLoading(false);
      }
    } else {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/v1/book/${paymentId}`
        );
        const data = await response?.json();
        if (data?.payment) {
          setPaymentStatus(true);
          setIsPaying(false);
          setMessage('Payment Successful');
        } else {
          setPaymentStatus(false);
          setIsPaying(true);
          setMessage('Payment Not Successful');
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };
  console.log(paymentId, message);

  return paymentStatus ? (
    <div className="flex flex-col justify-center items-center h-1/2 text-xl w-1/3 mx-auto mt-20 p-5 border border-y-primaryText">
      <h2 className="font-bold text-center text-4xl mb-10 w-full">Receipt</h2>
      <p className="text-center w-full mb-2 font-bold">Order Scheduled</p>
      <ul className="text-left w-full">
        <li className="flex justify-between py-2">
          <p>Name:</p>
          <span>
            <strong>
              {formData.firstName} {formData.lastName}
            </strong>
          </span>{' '}
        </li>

        <li className="flex justify-between py-2">
          <p>Product:</p>
          <span>
            <strong>{formData.service}</strong>
          </span>
        </li>

        {formData.email && (
          <li className="flex justify-between py-2">
            <p>Email:</p>
            <span>{formData.email}</span>
          </li>
        )}

        <li className="flex justify-between py-2">
          <p>Phone number:</p>
          <span>
            <strong>{formData.phone}</strong>
          </span>
        </li>

        <li className="flex justify-between py-2">
          <p>Date:</p>
          <span>
            <strong>{formData.orderDate}</strong>
          </span>
        </li>

        <li className="flex justify-between py-2">
          <p>Time:</p>
          <span>
            <strong>{formData.orderTime}</strong>
          </span>
        </li>

        <li className="flex justify-between py-2">
          <p>Price:</p>
          <span>
            <strong>100 ETB</strong>
          </span>
        </li>
      </ul>
      {!message ? <p>Payment not successful</p> : <p>Payment Successful</p>}
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-1/2 text-xl w-1/3 mx-auto mt-20 p-5 border border-y-primaryText">
      <h2 className="font-bold text-center text-4xl mb-10 w-full">
        Payment Page
      </h2>
      <p className="text-left w-full mb-2 font-bold">Order Summary:</p>
      <ul className="text-left w-full">
        <li className="flex justify-between py-2">
          <p>Name:</p>
          <span>
            <strong>
              {formData.firstName} {formData.lastName}
            </strong>
          </span>{' '}
        </li>

        <li className="flex justify-between py-2">
          <p>Product:</p>
          <span>
            <strong>{formData.service}</strong>
          </span>
        </li>

        {formData.email && (
          <li className="flex justify-between py-2">
            <p>Email:</p>
            <span>{formData.email}</span>
          </li>
        )}

        <li className="flex justify-between py-2">
          <p>Phone number:</p>
          <span>
            <strong>{formData.phone}</strong>
          </span>
        </li>

        <li className="flex justify-between py-2">
          <p>Date:</p>
          <span>
            <strong>{formData.orderDate}</strong>
          </span>
        </li>

        <li className="flex justify-between py-2">
          <p>Time:</p>
          <span>
            <strong>{formData.orderTime}</strong>
          </span>
        </li>

        <li className="flex justify-between py-2">
          <p>Price:</p>
          <span>
            <strong>100 ETB</strong>
          </span>
        </li>
        <li className="flex justify-between py-2">
          <p>Payment Status:</p>
          <span>
            <strong>{paymentStatus ? 'Paid' : 'Not Paid'}</strong>
          </span>
        </li>
      </ul>
      <p>{paymentStatus}</p>
      <button
        className="w-1/3 my-5 px-8 py-1 rounded-lg bg-slate-300 hover:bg-slate-500 hover:text-white transition-all"
        disabled={isLoading}
        onClick={handlePay}
      >
        {isLoading ? 'Loading...' : isPaying ? 'Check Payment' : 'Pay'}
      </button>
    </div>
  );
}
export default Payment;
