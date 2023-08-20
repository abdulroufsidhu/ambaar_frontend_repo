import { BarcodeScanner } from "react-barcode-qrcode-scanner";
import { TextResult } from "dynamsoft-javascript-barcode";
import React from "react";

interface MyBarcodeScannerProps {
  active: boolean;
  onScanned: (results: TextResult[]) => void;
  onClicked: (result: TextResult) => void;
}

export function MyBarcodeScanner({
  active,
  onScanned,
  onClicked,
}: MyBarcodeScannerProps) {
  const [isPause, setIsPause] = React.useState(false); //whether the video is paused
  const [runtimeSettings, setRuntimeSettings] = React.useState(
    '{"ImageParameter":{"BarcodeFormatIds":["BF_QR_CODE"],"Description":"","Name":"Settings"},"Version":"3.0"}'
  ); //use JSON template to decode QR codes only
  const onOpened = (cam: HTMLVideoElement, camLabel: string) => {
    // You can access the video element in the onOpened event
    console.log("opened");
  };

  const onClosed = () => {
    console.log("closed");
  };

  const onDeviceListLoaded = (devices: MediaDeviceInfo[]) => {
    console.table(devices);
  };

  const onInitialized = () => {
    // when the Barcode Reader is initialized
    console.info("barcode reader initialized");
  };

  return (
    <div>
      {active && "Scanning ..."}
      <BarcodeScanner
        isActive={active}
        isPause={isPause}
        license="license key for Dynamsoft Barcode Reader"
        drawOverlay={true}
        desiredCamera="back"
        desiredResolution={{ width: 1280, height: 720 }}
        runtimeSettings={runtimeSettings}
        onScanned={onScanned}
        onClicked={onClicked}
        onOpened={onOpened}
        onClosed={onClosed}
        onInitialized={onInitialized}
        onDeviceListLoaded={onDeviceListLoaded}
      />
    </div>
  );
}
