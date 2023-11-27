import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [updatedOrderDatails, setUpdatedOrderDetails] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    order_date: "",
    order_time: "",
    slot_number: "",
    price: "",
    payment: "",
  });

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/v1/admin/orders/"
        );
        setOrders(response.data.Orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, []);

  const handleUpdateOrder = (orderId) => {
    setEditingOrder(orderId);
  };
  const confirmUpdateOrder = async (orderId) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/v1/admin/orders/${orderId}`);
      setOrders(
        orders.map((order) =>
          order.order_id === orderId
            ? { ...order, ...updatedOrderDatails }
            : order
        )
      );
      setEditingOrder(null);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  const handleDeleteOrder = (orderId) => {
    setConfirmDelete(orderId);
    console.log("Deleting order:", orderId);
  };
  const confirmDeleteOrder = async (orderId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:5000/api/v1/admin/orders/${orderId}`
      );
      setOrders(
        orders.map((order) =>
          order.order_id === editingOrder
            ? { ...order, ...updatedOrderDatails }
            : order
        )
      );
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-end ">
      <h1 className="text-5xl font-semibold my-auto mx-4">Order Lists</h1>
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
                value={updatedOrderDatails.first_name}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDatails,
                    first_name: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={updatedOrderDatails.last_name}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDatails,
                    last_name: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={updatedOrderDatails.phone_number}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDatails,
                    phone_number: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Email"
                value={updatedOrderDatails.email}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDatails,
                    email: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Order Date"
                value={updatedOrderDatails.order_date}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDatails,
                    order_date: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Order Time"
                value={updatedOrderDatails.order_time}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDatails,
                    order_time: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Slot Number"
                value={updatedOrderDatails.slot_number}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDatails,
                    slot_number: e.target.value,
                  })
                }
                className="border py-1 px-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Price"
                value={updatedOrderDatails.price}
                onChange={(e) =>
                  setUpdatedOrderDetails({
                    ...updatedOrderDatails,
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
                value={updatedOrderDatails.payment}
                onChange={(e) => setUpdatedOrderDetails(e.target.value)}
                className="border py-1 px-2 rounded"
              >
                <option value="true">Paid</option>
                <option value="false">Unpaid</option>
              </select>
            </div>
            <button
              onClick={() => setEditingOrder(null)}
              className="px-4 py-2 bg-gray-300 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={confirmUpdateOrder}
              className="px-4 py-2 bg-green-500 rounded text-white hover:bg-green-600 transition duration-200"
            >
              Save Changes
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
  );
};

export default AdminPage;
