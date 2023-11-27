export const BASE_URL = 'http://127.0.0.1:5000/api/v1';

export default async function createOrder(oData) {
  try {
    // Make a post request to the payment API
    const response = await fetch(`${BASE_URL}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: oData.first_name,
        last_name: oData.last_name,
        email: oData.email,
        phone_number: oData.phone_number,
        order_date: oData.order_date,
        order_time: oData.order_time,
        slot_number: oData.slot_number,
        price: 100,
        payment: false,
      }),
    });
    const data = await response?.json();
    if (!data?.payment) {
      return data;
    } else {
      throw new Error(data);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getOrderWithId(paymentId) {
  try {
    const response = await fetch(`${BASE_URL}/${paymentId}`);
    const data = await response?.json();
    if (data?.payment) {
      return {
        paymentStatus: true,
        isPaying: false,
        message: 'Payment Successful',
      };
    } else {
      return {
        paymentStatus: true,
        isPaying: false,
        message: 'Payment Not Successful',
      };
    }
  } catch (error) {
    return {
      error: error,
    };
  }
}
