import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';

export default function Receipt() {
  const location = useLocation();
  const formData = location.state;

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Payment Page</Text>
          <Text>Order Summary:</Text>
          <Text>
            Name: {formData.firstName} {formData.lastName}
          </Text>
          <Text>Product: {formData.service}</Text>
          {formData.email && <Text>Email: {formData.email}</Text>}
          <Text>Phone number: {formData.phone}</Text>
          <Text>Date: {formData.orderDate}</Text>
          <Text>Time: {formData.orderTime}</Text>
          <Text>Slot: {formData.slot}</Text>
          <Text>Account: CBE: 123456789</Text>
          <Text>Price: 100 ETB</Text>
          <Text>Payment Status: Successfully Paid</Text>
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <div className="receipt">
      <div className="flex flex-col justify-center items-center h-1/2 text-xl w-1/2 mx-auto p-5 border border-y-primaryText">
        <h2 className="font-bold text-center text-4xl mb-10 w-full">Receipt</h2>
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
            <span>Successfully Paid</span>
          </li>
        </ul>
        <div className="flex w-full justify-end items-center">
          <PDFDownloadLink document={<MyDocument />} fileName="receipt.pdf">
            {({ blob, url, loading, error }) =>
              loading ? (
                'Loading document...'
              ) : (
                <i className="fa-solid fa-file-arrow-down text-5xl m-10"></i>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
