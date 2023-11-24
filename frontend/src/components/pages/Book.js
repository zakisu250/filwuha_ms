import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Book() {
  const navigate = useNavigate();
  const timeIntervals = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    orderDate: "",
    orderTime: "",
    slot: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment", { state: formData });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="border rounded-md p-2"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="border rounded-md p-2"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="border rounded-md p-2"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border rounded-md p-2"
          />
          <select
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="border rounded-md p-2"
            required
          >
            <option value="">Select Service</option>
            <option value="Bathing">Bathing</option>
          </select>
          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleInputChange}
            placeholder="Date"
            className="border rounded-md p-2"
            required
          />
          <select
            name="orderTime"
            value={formData.orderTime}
            onChange={handleInputChange}
            className="border rounded-md p-2"
            required
          >
            <option value="">Select Time</option>
            {timeIntervals.map((time) => (
              <option key={time} value={time.slice(0, 8)}>
                {time}
              </option>
            ))}
          </select>
          <select
            name="slot"
            value={formData.slot}
            onChange={handleInputChange}
            className="border rounded-md p-2"
            required
          >
            <option value="">Select Slot</option>
            {[1, 2, 3, 4, 5, 6].map((slot) => (
              <option key={slot} value={slot}>
                Slot {slot}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <input
            type="checkbox"
            name="terms"
            onChange={handleInputChange}
            className="mr-2"
            required
          />
          <label htmlFor="terms">
            I agree to the{" "}
            <a
              href="/terms"
              className="text-blue-500 hover:text-blue-600 transition duration-500 ease-in-out"
            >
              Terms & Conditions
            </a>
          </label>
        </div>
        <div className="mt-4"></div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold text-lg rounded-lg px-10 py-2 mt-9 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default Book;
