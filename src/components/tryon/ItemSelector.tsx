'use client';
import React from 'react';
import { TribalItem } from '@/types/tryon';

interface Props {
  items: TribalItem[];
  selectedItem: TribalItem | null;
  onSelect: (item: TribalItem) => void;
}

const ItemSelector: React.FC<Props> = ({ items, selectedItem, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(item)}
          className={`p-2 border rounded-lg ${selectedItem?.name === item.name ? 'border-amber-600' : 'border-gray-300'}`}
        >
          <img src={item.imagePath} alt={item.name} className="h-24 mx-auto" />
          <p className="text-sm text-center">{item.name}</p>
        </button>
      ))}
    </div>
  );
};

export default ItemSelector;
