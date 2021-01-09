/**
 * detects whether user is on mobile
 * thanks to Reed Barger
 * https://reedbarger.com/how-to-create-a-custom-usedevicedetect-react-hook/
 */
import { useState, useEffect } from "react";

export default function useDeviceDetect() {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;

    // note I removed iPad from here since the uesr might still scroll on an iPad
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setMobile(mobile);
  }, []);

  return { isMobile };
}
