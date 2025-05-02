import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const Socket = () => {
  useEffect(() => {
    const socket = io('http://localhost:6000'); // تأكد من استخدام عنوان الخادم الصحيح
    socket.on('new', (data) => {
      alert(data); // عند تلقي الحدث، يتم عرض الإشعار
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>Socket</div>
  );
};

export default Socket;
