import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import createOrder, { checkPaymentStatus } from '../apis/utils';
import { toast } from 'react-toastify';
import LoadingSVG from '../assets/images/Loading.svg';
import 'react-toastify/dist/ReactToastify.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    phone: phone_number,
    orderDate: order_date,
    orderTime: order_time,
    slot: slot_number,
  } = formData;

  const [paymentStatus, setPaymentStatus] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [message, setMessage] = useState(false);

  const handlePay = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Set the isLoading state to true to indicate that a request is being made
    setIsLoading(true);
    // Check if the user is not already in the process of paying
    if (!isPaying) {
      try {
        // Call the createOrder function with the order details and await its response
        const data = await createOrder({
          first_name,
          last_name,
          email,
          phone_number,
          order_date,
          order_time,
          slot_number,
          price: 100,
          payment: false,
        });
        // If the payment is not successful, set the paymentStatus state to false, set the paymentId state with the order_id from the response, set the isPaying state to true, and display an info toast with the message from the response
        if (!data?.payment) {
          setPaymentStatus(false);
          setPaymentId(data?.order_id);
          setIsPaying(true);
          toast.info(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        } else {
          // If the payment is successful, set the paymentStatus state to true and set the isPaying state to false
          setPaymentStatus(true);
          setIsPaying(false);
        }
        // Set the isLoading state to false to indicate that the request has finished
        setIsLoading(false);
      } catch (error) {
        // If an error occurs, set the isPaying state to false, set the isLoading state to false, and set the message state with the error message
        setIsPaying(false);
        setIsLoading(false);
        setMessage(error.message);
      }
    } else {
      // If the user is already in the process of paying, call the handleCheck function and set the isLoading state to false
      handleCheck();
      setIsLoading(false);
    }
    // Set the isLoading state to false to indicate that the request has finished
    setIsLoading(false);
  };

  const handleCheck = async () => {
    try {
      // Call the checkPaymentStatus function with the paymentId and await its response
      const data = await checkPaymentStatus(paymentId);
      // If the response is truthy
      if (data) {
        // Set the paymentStatus state to true, set the isPaying state to false, display a success toast with the message from the response, and navigate to the /receipt route with the formData as state
        setPaymentStatus(true);
        setIsPaying(false);
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate('/receipt', { state: formData });
      } else {
        // If the response is falsy, set the paymentStatus state to false, set the isPaying state to true, and set the message state with the message from the response
        setPaymentStatus(false);
        setIsPaying(true);
        setMessage(data.message);
      }
    } catch (error) {
      // If an error occurs, set the message state with the error message
      setMessage(error.message);
    }
  };

  return (
    <div className="flex mt-10">
      <div className="flex flex-col justify-center items-center h-1/2 text-xl w-1/2 mx-auto p-5 border border-y-primaryText">
        <h2 className="font-bold text-center text-4xl mb-10 w-full">
          Payment Page
        </h2>
        <p className="text-left w-full mb-2 font-bold">Order Summary:</p>
        <ul className="text-left w-full">
          <li className="flex justify-between py-2">
            <p>Name:</p>
            <span>
              {formData.firstName} {formData.lastName}
            </span>{' '}
          </li>

          <li className="flex justify-between py-2">
            <p>Product:</p>
            <span>{formData.service}</span>
          </li>
          {formData.email && (
            <li className="flex justify-between py-2">
              <p>Email:</p>
              <span>{formData.email}</span>
            </li>
          )}

          <li className="flex justify-between py-2">
            <p>Phone number:</p>
            <span>{formData.phone}</span>
          </li>

          <li className="flex justify-between py-2">
            <p>Date:</p>
            <span>{formData.orderDate}</span>
          </li>

          <li className="flex justify-between py-2">
            <p>Time:</p>
            <span>{formData.orderTime}</span>
          </li>

          <li className="flex justify-between py-2">
            <p>Slot:</p>
            <span>{formData.slot}</span>
          </li>
          <li className="flex justify-between py-2">
            <p>Account:</p>
            <span>CBE: 123456789</span>
          </li>

          <li className="flex justify-between py-2">
            <p>Price:</p>
            <span>100 ETB</span>
          </li>

          <li className="flex justify-between py-2">
            <p>Payment Status:</p>
            <span>{paymentStatus ? 'Paid' : 'Not Paid'}</span>
          </li>
        </ul>
        {message && <p className="text-red-500 py-3">{message}</p>}
        <p>{paymentStatus}</p>
        <button
          className="w-full my-5 px-8 font-bold py-2 rounded-lg bg-slate-300 hover:bg-slate-500 hover:text-white transition-all"
          disabled={isLoading}
          onClick={handlePay}
        >
          {isLoading ? (
            <img src={LoadingSVG} alt="Loading" className="w-6 h-6 inline" />
          ) : isPaying ? (
            'Proceed with payment'
          ) : (
            'Pay'
          )}
        </button>
      </div>
    </div>
  );
}
export default Payment;
