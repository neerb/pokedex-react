import React, { useRef, useEffect, useState } from 'react';
import './spiderstatgraph.css';

const SpiderStatGraph = ({ data }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const { offsetWidth, offsetHeight } = canvasRef.current.parentNode;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const size = Math.min(dimensions.width, dimensions.height); // Maintain aspect ratio
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size / 2) * 0.8; // Adjust based on available size
    const numAttributes = data.length;
    const angleStep = (2 * Math.PI) / numAttributes;

    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define colors for each attribute or data point
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

    // Draw webbing lines
    const levels = 4; // Number of webbing levels
    for (let level = 1; level <= levels; level++) {
      ctx.beginPath();
      const webRadius = (radius / levels) * level;
      for (let i = 0; i <= numAttributes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + webRadius * Math.cos(angle);
        const y = centerY + webRadius * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = '#bbb';
      ctx.stroke();
    }

    // Draw the axes
    ctx.beginPath();
    for (let i = 0; i < numAttributes; i++) {
      const angle = i * angleStep - Math.PI / 2; // Adjust to start from the top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#ccc';
    ctx.stroke();

    // Draw the data polygon
    ctx.beginPath();
    for (let i = 0; i < numAttributes; i++) {
      const value = data[i].base_stat / 255; // Assuming base_stat is the value for each attribute, normalized to [0, 1]
      const angle = i * angleStep - Math.PI / 2; // Adjust to start from the top
      const x = centerX + value * radius * Math.cos(angle);
      const y = centerY + value * radius * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(34, 202, 236, 0.2)'; // Set fill color for the polygon
    ctx.fill();
    ctx.strokeStyle = 'rgba(34, 202, 236, 1)';
    ctx.stroke();

    // Draw colored dots
    for (let i = 0; i < numAttributes; i++) {
      const angle = i * angleStep - Math.PI / 2; // Adjust to start from the top
      const x = centerX + (radius + 10) * Math.cos(angle); // Increase the distance for better visibility
      const y = centerY + (radius + 10) * Math.sin(angle); // Increase the distance for better visibility

      ctx.fillStyle = colors[i]; // Set color based on attribute value
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI); // Draw a small circle at the end of each attribute
      ctx.fill();
    }
  }, [data, dimensions]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default SpiderStatGraph;
