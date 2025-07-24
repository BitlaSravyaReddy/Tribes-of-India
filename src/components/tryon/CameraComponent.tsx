'use client';
import React, { useEffect, useRef } from 'react';

interface Props {
  onVideoReady: (video: HTMLVideoElement) => void;
}

const CameraComponent: React.FC<Props> = ({ onVideoReady }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            onVideoReady(videoRef.current!);
          };
        }
      } catch (error) {
        console.error("Camera error:", error);
      }
    };

    startCamera();

    return () => {
      const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks();
      tracks?.forEach((t) => t.stop());
    };
  }, [onVideoReady]);

  return <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />;
};

export default CameraComponent;
