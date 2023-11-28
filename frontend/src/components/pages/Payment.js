import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import createOrder, { checkPaymentStatus } from '../../apis/utils';
import { toast } from 'react-toastify';
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
    e.preventDefault();
    setIsLoading(true);
    if (!isPaying) {
      try {
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
          setPaymentStatus(true);
          setIsPaying(false);
        }
        setIsLoading(false);
      } catch (error) {
        setIsPaying(false);
        setIsLoading(false);
        setMessage(error.message);
      }
    } else {
      try {
        const data = await checkPaymentStatus(paymentId);
        if (data) {
          console.log(data);
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
          setPaymentStatus(false);
          setIsPaying(true);
          setMessage(data.message);
        }
      } catch (error) {
        setMessage(error.message);
      }
      setIsLoading(false);
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
          className="w-1/3 my-5 px-8 py-2 rounded-lg bg-slate-300 hover:bg-slate-500 hover:text-white transition-all"
          disabled={isLoading}
          onClick={handlePay}
        >
          {isLoading ? 'Loading...' : isPaying ? 'Proceed with payment' : 'Pay'}
        </button>
      </div>
    </div>
  );
}
export default Payment;
