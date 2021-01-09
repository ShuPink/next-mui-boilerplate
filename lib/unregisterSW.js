// use to remove the sw if we're turning it off
import { useEffect } from "react";

export default function useUnregisterSW() {
  useEffect(() => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }, []);
}
