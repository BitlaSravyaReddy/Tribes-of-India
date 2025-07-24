'use client';
import React, { useState } from 'react';
import { tribalItems } from '@/libs/data/tribalitems';
import { TribalItem } from '@/types/tryon';
import CameraComponent from './CameraComponent';
import TryOnOverlay from './TryOnOverlay';
import ItemSelector from './ItemSelector';

const TribalTryOnApp: React.FC = () => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<TribalItem | null>(null);

  return (
    <div className="min-h-screen p-4 bg-amber-50">
      <h1 className="text-4xl font-bold text-center text-amber-800 mb-4">Tribal Try-On App</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-4 border-amber-300">
          {video ? (
            <>
              <CameraComponent onVideoReady={setVideo} />
              <TryOnOverlay video={video} selectedItem={selectedItem} />
            </>
          ) : (
            <CameraComponent onVideoReady={setVideo} />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-amber-700 mb-2">Choose your tribal item</h2>
          <ItemSelector
            items={tribalItems}
            selectedItem={selectedItem}
            onSelect={setSelectedItem}
          />
        </div>
      </div>
    </div>
  );
};

export default TribalTryOnApp;
