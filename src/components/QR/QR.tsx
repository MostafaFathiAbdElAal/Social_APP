"use client";
import QRCode from "react-qr-code";

export default function QR({ value }: { value: string }) {
  return (
      <QRCode title={value} bgColor="whitesmoke" value={value} size={70} level="M" />
    
  );
}
