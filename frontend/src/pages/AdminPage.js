import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { fetchOrders, updateOrder, deleteOrder } from '../apis/utils';
import { toast } from 'react-toastify';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [updatedOrderDetails, setUpdatedOrderDetails] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    order_date: '',
    order_time: '',
    slot_number: '',
    price: 100,
    payment: false,
  });
  const [userData, setUserData] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    try {
      // If a token exists
      if (token) {
        // Decode the token
        const decodedToken = jwt_decode(token);
        // Extract the username from the decoded token
        const userRole = decodedToken.sub.username;
        // Check if the username is either 'zaki' or 'admin'
        const isValidUserRole = ['zaki', 'admin'].includes(userRole);

        // If the username is valid, set the user data
        if (isValidUserRole) {
          setUserData(userRole);
        }
      } else {
        // If no token exists, set the user data to null and redirect to the admin page
        setUserData(null);
        window.location.href = '/admin';
      }
    } catch (error) {
      // If an error occurs, log the error, set the user data to null, and redirect to the unauthorized page
      console.error('Error checking user role:', error);
      setUserData(null);
      window.location.href = '/unauthorized';
    }
  }, [token]); // Run this effect whenever the token changes

  useEffect(() => {
    // Define an async function to fetch orders
    const fetchData = async function () {
      // Call the fetchOrders function and await its response
      const response = await fetchOrders();
      // Log the response
      console.log(response);
      // Set the orders state with the Orders from the response
      setOrders(response.Orders);
    };
    // Call the fetchData function
    fetchData();
  }, [confirmDelete, updatedOrderDetails]); // Run this effect whenever confirmDelete or updatedOrderDetails changes

  const handleUpdateOrder = (orderId) => {
    // Set the editingOrder state with the provided orderId
    setEditingOrder(orderId);
    // Find the order with the provided orderId in the orders state
    const order = orders.find((order) => order.order_id === orderId);
    // Set the updatedOrderDetails state with the details of the found order
    setUpdatedOrderDetails({
      first_name: order.first_name,
      last_name: order.last_name,
      phone_number: order.phone_number,
      email: order.email,
      order_date: order.order_date,
      order_time: order.order_time,
      slot_number: order.slot_number,
      price: order.price,
      payment: order.payment === true ? '1' : '0', // Convert the payment boolean to a string
    });
  };

  const confirmUpdateOrder = async (orderId) => {
    // Set the isLoading state to true to indicate that a request is being made
    setIsLoading(true);
    try {
      // Call the updateOrder function with the orderId and updatedOrderDetails and await its response
      const data = await updateOrder(orderId, updatedOrderDetails);
      // Create a new array of orders where the order with the provided orderId is replaced with its updated details
      const updatedOrders = orders.map((order) =>
        order.order_id === orderId
          ? { ...order, ...updatedOrderDetails }
          : order
      );
      // Set the orders state with the new array of orders
      setOrders(updatedOrders);
      // Reset the editingOrder state to null
      setEditingOrder(null);
      // Display a success toast with the message from the response
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
    } catch (error) {
      // If an error occurs, log the error
      console.error('Error updating order:', error);
      // Rethrow the error
      throw error;
    } finally {
      // Set the isLoading state to false to indicate that the request has finished
      setIsLoading(false);
    }
  };

  // Handle when the delete button is clicked
  const handleDeleteOrder = (orderId) => {
    setConfirmDelete(orderId);
  };

  const confirmDeleteOrder = async (orderId) => {
    try {
      // Call the deleteOrder function with the orderId and await its response
      const data = await deleteOrder(orderId);
      // Create a new array of orders that does not include the order with the provided orderId
      setOrders(orders.filter((order) => order.order_id !== orderId));
      // Reset the confirmDelete state to null
      setConfirmDelete(null);
      // Display a success toast with the message from the response
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
    } catch (error) {
      // If an error occurs, log the error
      console.error('Error deleting order:', error);
      // Rethrow the error
      throw error;
    }
  };

  return userData ? (
    <div className="flex flex-col h-full justify-start items-center">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-5xl font-semibold my-10 mx-4">Order Lists</h1>
        <button
          className="px-4 py-1 mr-10 rounded-lg bg-indigo-200 hover:bg-indigo-400 hover:text-textIcon transition-all"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/admin';
          }}
        >
          Logout
        </button>
      </div>
      {confirmDelete && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Confirm Deletion
            </h2>
            <p className="text-center mb-6">
              Are you sure you want to delete this order?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-300 rounded text-black hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDeleteOrder(confirmDelete)}
                className="px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {editingOrder && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Order</h2>
            <div className="flex flex-col mb-4">
              <input
                type="text"
                placeholder="First Name"
                value={updatedOrderDetails.first_name}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDetails,
                    first_name: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={updatedOrderDetails.last_name}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDetails,
                    last_name: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={updatedOrderDetails.phone_number}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDetails,
                    phone_number: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Email"
                value={updatedOrderDetails.email}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDetails,
                    email: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Order Date"
                value={updatedOrderDetails.order_date}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDetails,
                    order_date: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Order Time"
                value={updatedOrderDetails.order_time}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDetails,
                    order_time: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Slot Number"
                value={updatedOrderDetails.slot_number}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDetails,
                    slot_number: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Price"
                value={updatedOrderDetails.price}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDetails,
                    price: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <label htmlFor="payment" className="mb-2">
                Payment:
              </label>
              <select
                id="payment"
                value={updatedOrderDetails.payment}
                onChange={(e) => {
                  setUpdatedOrderDetails({
                    ...updatedOrderDetails,
                    payment: e.target.value === '1' ? true : false,
                  });
                }}
                className="border py-1 px-2 rounded"
              >
                <option value="1">Paid</option>
                <option value="0">Unpaid</option>
              </select>
            </div>
            <button
              onClick={() => setEditingOrder(null)}
              className="px-4 py-2 bg-gray-300 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={() => confirmUpdateOrder(editingOrder)}
              disabled={isLoading}
              className="px-4 py-2 bg-green-500 rounded text-white hover:bg-green-600 transition duration-200"
            >
              {isLoading ? 'Updating' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr>
            <th className="border text-center py-1 bg-gray-200">ID</th>
            <th className="border text-center py-1 bg-gray-200">First Name</th>
            <th className="border text-center py-1 bg-gray-200">Last Name</th>
            <th className="border text-center py-1 bg-gray-200">
              Phone Number
            </th>
            <th className="border text-center py-1 bg-gray-200">Email</th>
            <th className="border text-center py-1 bg-gray-200">Order Date</th>
            <th className="border text-center py-1 bg-gray-200">Order Time</th>
            <th className="border text-center py-1 bg-gray-200">Slot</th>
            <th className="border text-center py-1 bg-gray-200">Price</th>
            <th className="border text-center py-1 bg-gray-200">Payment</th>
            <th className="border text-center py-1 bg-gray-200"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td className="border text-center py-1">{order.order_id}</td>
              <td className="border text-center py-1">{order.first_name}</td>
              <td className="border text-center py-1">{order.last_name}</td>
              <td className="border text-center py-1">{order.phone_number}</td>
              <td className="border text-center py-1">{order.email}</td>
              <td className="border text-center py-1">{order.order_date}</td>
              <td className="border text-center py-1">{order.order_time}</td>
              <td className="border text-center py-1">{order.slot_number}</td>
              <td className="border text-center py-1">{order.price}</td>
              <td className="border text-center py-1">
                {order.payment ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-500"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-red-500"
                  />
                )}
              </td>
              <td className="border text-center py-1">
                <button
                  className="mr-2 text-gray-500 hover:text-blue-700"
                  onClick={() => handleUpdateOrder(order.order_id)}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button
                  className="text-gray-500 hover:text-red-700"
                  onClick={() => handleDeleteOrder(order.order_id, order)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    ' '
  );
};

export default AdminPage;
