import { useState, useEffect } from 'react';
import { userAPIs } from './api';
import { WebFPoint } from '@wlfi/webf-point';

export const useGetDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    if (!WebFPoint.isAvailable()) {
      return;
    }
      try {
        (async (): Promise<void> => { 
          const result = await WebFPoint.generateUniqueId();
          if (!result?.id) {
            return;
          }
          await userAPIs.regNewDevice({ deviceIdentity: result.id });
          setDeviceId(result?.id);
          console.log('Generate unique id result:', result);
        })();
      } catch (err) {
        console.error('Failed to generate unique id:', err);
      }
  }, []);

  return {deviceId};
};