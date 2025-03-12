import React from 'react';

interface CanvasProps {
  children: React.ReactNode;
}

const Canvas: React.FC<CanvasProps> = ({ children }) => {
  return (
    <div className="canvas-container">
      {/* 网格背景 */}
      <div className="canvas-grid">
        {/* 内容区域 */}
        <div className="canvas-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Canvas; 