import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Timestamp() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from Firestore
  useEffect(() => {
    async function fetchOrders() {
      const orderRef = collection(db, 'orders');
      const querySnap = await getDocs(orderRef);

      const orderData = [];
      querySnap.forEach((doc) => {
        const data = doc.data();

        // Check if createdAt field exists and is a string
        if (data.createdAt && typeof data.createdAt === 'string') {
          // Convert the string to a JavaScript Date object
          const date = new Date(data.createdAt);

          // Define locale and options for Spanish in Mexico
          const locale = 'es-MX';
          const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
          const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };

          // Format the date and time strings with the specified locale and options
          const formattedDate = date.toLocaleDateString(locale, dateOptions);
          const formattedTime = date.toLocaleTimeString(locale, timeOptions);

          // Combine date and time
          const formattedDateTime = `${formattedDate} ${formattedTime}`;

          orderData.push(formattedDateTime);
        } else {
          // Handle other cases or display an error message
          orderData.push('Invalid Timestamp');
        }
      });

      setOrders(orderData);
    }

    fetchOrders();
  }, []);

  return (
    <div className='mx-auto flex items-center justify-center'>
      {orders.map((order, index) => (
        <li key={index}>{order}</li>
      ))}
    </div>
  );
}
