import { useEffect } from 'react';
import { Routes } from './src/routes';
import { getDeviceId } from './src/services/getDeviceId';

export default function App() {

  useEffect(() => {
    getDeviceId().then(deviceId => console.log("deviceId", deviceId))
  }, []);

  return (
    <Routes />
  );
}

