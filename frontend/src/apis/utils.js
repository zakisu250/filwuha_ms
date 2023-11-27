import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:5000/api/v1';
const LOGIN_URL = 'http://127.0.0.1:5000/admin/login';
const CHECK_SLOTS_URL = 'http://localhost:5000/api/v1/reserved_slots';

export async function checkReservedSlots() {
  try {
    const response = await axios.get(CHECK_SLOTS_URL);
    if (response && response.data) {
      const data = await response.data;
      return data;
    } else {
      throw new Error('Failed to fetch reserved slots');
    }
  } catch (error) {
    console.error('Error-message', error);
    throw error;
  }
}

export default async function createOrder(oData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/book`,
      {
        first_name: oData.first_name,
        last_name: oData.last_name,
        email: oData.email,
        phone_number: oData.phone_number,
        order_date: oData.order_date,
        order_time: oData.order_time,
        slot_number: oData.slot_number,
        price: 100,
        payment: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response?.data;
    if (!data?.payment) {
      return data;
    } else {
      throw new Error('Payment not successful', response.error);
    }
  } catch (error) {
    console.log('Error-message', error.message);
    throw error;
  }
}

export async function checkPaymentStatus(paymentId) {
  try {
    const response = await axios.get(`${BASE_URL}/book/${paymentId}`);
    if (!response?.payment) {
      const data = await response.data;
      return data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
}
export async function loginAdmin() {
  try {
    const response = await axios.post(LOGIN_URL);
    if (response && response.data) {
      const data = await response.data;
      return data;
    } else {
      throw new Error('Admin login failed');
    }
  } catch (error) {
    console.error('Error-message', error);
    throw error;
  }
}
