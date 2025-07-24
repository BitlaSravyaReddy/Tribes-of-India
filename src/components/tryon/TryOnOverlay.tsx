'use client';
import React, { useEffect, useRef, useState } from 'react';
import { TribalItem } from '@/types/tryon';

interface Props {
  video: HTMLVideoElement;
  selectedItem: TribalItem | null;
}

const TryOnOverlay: React.FC<Props> = ({ video, selectedItem }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const overlayImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!selectedItem) return;
    setPosition(selectedItem.defaultPosition);
    setScale(selectedItem.defaultScale);

    const img = new Image();
    img.src = selectedItem.imagePath;
    overlayImgRef.current = img;
  }, [selectedItem]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;
    let frameId: number;

    const render = () => {
      if (!video || !overlayImgRef.current) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const img = overlayImgRef.current;
      if (img.complete) {
        const imgW = img.width * scale;
        const imgH = img.height * scale;
        const x = canvas.width / 2 - imgW / 2 + position.x;
        const y = canvas.height / 2 - imgH / 2 + position.y;
        ctx.globalAlpha = 0.9;
        ctx.drawImage(img, x, y, imgW, imgH);
        ctx.globalAlpha = 1;
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(frameId);
  }, [video, scale, position]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      onWheel={(e) => {
        e.preventDefault();
        setScale((s) => Math.max(0.1, Math.min(3, s - e.deltaY * 0.001)));
      }}
      onMouseDown={(e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startPos = { ...position };

        const moveHandler = (moveEvent: MouseEvent) => {
          setPosition({
            x: startPos.x + (moveEvent.clientX - startX),
            y: startPos.y + (moveEvent.clientY - startY),
          });
        };

        const upHandler = () => {
          window.removeEventListener('mousemove', moveHandler);
          window.removeEventListener('mouseup', upHandler);
        };

        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upHandler);
      }}
    />
  );
};

export default TryOnOverlay;
