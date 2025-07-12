
import React from 'react';

interface StyleButtonProps {
    currentStyle: string;
    styleName: string;
    setStyle: (style: string) => void;
    displayName: string;
}

const StyleButton: React.FC<StyleButtonProps> = ({ currentStyle, styleName, setStyle, displayName }) => (
  <button
    type="button"
    onClick={() => setStyle(styleName)}
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
      currentStyle === styleName 
        ? 'bg-blue-600 text-white shadow-sm' 
        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    }`}
  >
    {displayName}
  </button>
);

export default StyleButton;
