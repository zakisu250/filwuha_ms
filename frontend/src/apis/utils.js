import axios from 'axios';
const BASE_URL = 'https://filwuha-api.onrender.com/api/v1';
const LOGIN_URL = 'https://filwuha-api.onrender.com/api/v1/admin/login';
const CHECK_SLOTS_URL =
  'https://filwuha-api.onrender.com/api/v1/reserved_slots';

// API GET request to fetch all reserved slots
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
    throw error.response;
  }
}

//API POST request to create an order
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
      return response.error;
    }
  } catch (error) {
    const errorData = error.response.data;
    throw errorData;
  }
}

// API GET request to check the status payment
export async function checkPaymentStatus(paymentId) {
  try {
    const response = await axios.get(`${BASE_URL}/book/${paymentId}`);
    if (!response?.payment) {
      const data = await response.data;
      return data;
    } else {
      throw response;
    }
  } catch (error) {
    throw error.response.data;
  }
}

// Authorization POST API request
export async function loginAdmin(adminData) {
  const response = await axios.post(LOGIN_URL, adminData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  try {
    if (response && response.data) {
      const data = response.data;
      return data;
    } else {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

// Admin Route to fetch orders made by customers
export async function fetchOrders() {
  try {
    const response = await axios.get(`${BASE_URL}/admin/orders`);
    if (response && response.data) {
      const data = await response.data;
      return data;
    } else {
      throw new Error('Failed to fetch orders');
    }
  } catch (error) {
    console.error('Error-message', error);
    throw error;
  }
}

// Admin Route to update orders
export async function updateOrder(orderId, updatedDetails) {
  try {
    const response = await axios.put(
      `${BASE_URL}/admin/orders/${orderId}`,
      updatedDetails,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response && response.data) {
      const data = await response.data;
      return data;
    } else {
      throw response;
    }
  } catch (error) {
    console.error('Error-message', error);
    throw error;
  }
}

// Admin Route to delete orders
export async function deleteOrder(orderId) {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/orders/${orderId}`);
    if (response) {
      const data = await response.data;
      return data;
    } else {
      throw response;
    }
  } catch (error) {
    console.error('Error-message', error);
    throw error;
  }
}
