import React, { useEffect, useRef, useState } from 'react';

export default function Store2DHeatmapCanvas({ points = [] }) {
  const canvasRef = useRef(null);
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [hoverInfo, setHoverInfo] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas background
    ctx.fillStyle = '#0B0F17';
    ctx.fillRect(0, 0, width, height);

    // Draw Store Architectural Layout Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Architectural Store Structural Outlines
    // Entrance Gate
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, height - 80, 120, 60);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fillRect(20, height - 80, 120, 60);
    ctx.fillStyle = '#93C5FD';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('MAIN ENTRANCE', 30, height - 45);

    // Shelves / Aisles
    const storeShelves = [
      { x: 180, y: 100, w: 80, h: 220, label: 'AISLE 1 - BEVERAGES' },
      { x: 300, y: 100, w: 80, h: 220, label: 'AISLE 2 - SNACKS' },
      { x: 420, y: 100, w: 80, h: 220, label: 'AISLE 3 - CARE' },
      { x: 560, y: 80, w: 140, h: 100, label: 'PROMOTIONAL ENDCAP' },
      { x: 560, y: height - 120, w: 140, h: 80, label: 'CHECKOUT COUNTERS' },
    ];

    storeShelves.forEach((s) => {
      ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.fillRect(s.x, s.y, s.w, s.h);
      ctx.strokeRect(s.x, s.y, s.w, s.h);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(s.label, s.x + 8, s.y + 20);
    });

    // Render Heatmap Spatial Intensity Radial Gradients
    const activePoints = selectedZone === 'All Zones'
      ? points
      : points.filter((p) => p.zone_name.toLowerCase().includes(selectedZone.toLowerCase()));

    activePoints.forEach((p) => {
      const px = (p.x_coord / 100) * width;
      const py = (p.y_coord / 100) * height;
      const radius = 35 * p.intensity;

      const grad = ctx.createRadialGradient(px, py, 2, px, py, radius);
      grad.addColorStop(0, `rgba(239, 68, 68, ${0.8 * p.intensity})`);   // Core Hot Red
      grad.addColorStop(0.4, `rgba(245, 158, 11, ${0.5 * p.intensity})`); // Warm Amber
      grad.addColorStop(0.7, `rgba(16, 185, 129, ${0.3 * p.intensity})`); // Emerald Outer
      grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
    });

  }, [points, selectedZone]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = ((x / canvas.width) * 100).toFixed(1);
    const pctY = ((y / canvas.height) * 100).toFixed(1);

    setHoverInfo({ x, y, pctX, pctY });
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800">
      {/* Heatmap Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="font-bold text-slate-100 text-sm">2D Spatial Attention Heatmap</h3>
          <p className="text-xs text-slate-400">Real-time eye gaze & customer dwell intensity mapping</p>
        </div>

        {/* Zone Filter Toggles */}
        <div className="flex items-center gap-2">
          {['All Zones', 'Aisle 1', 'Promotional', 'Checkout'].map((z) => (
            <button
              key={z}
              onClick={() => setSelectedZone(z)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedZone === z
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0B0F17]">
        <canvas
          ref={canvasRef}
          width={760}
          height={420}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverInfo(null)}
          className="w-full h-auto cursor-crosshair block"
        />

        {/* Hover Coordinate Overlay */}
        {hoverInfo && (
          <div
            className="absolute pointer-events-none bg-slate-900/90 border border-slate-700 text-[11px] text-slate-200 px-2.5 py-1 rounded-md shadow-lg"
            style={{ left: Math.min(hoverInfo.x + 10, 620), top: Math.min(hoverInfo.y + 10, 360) }}
          >
            Coord: ({hoverInfo.pctX}%, {hoverInfo.pctY}%) • Density: High
          </div>
        )}

        {/* Color Scale Bar */}
        <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-slate-800 p-2 rounded-lg flex items-center gap-3">
          <span className="text-[10px] font-semibold text-slate-400">Low Gaze</span>
          <div className="w-24 h-2 rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"></div>
          <span className="text-[10px] font-semibold text-slate-400">High Gaze</span>
        </div>
      </div>
    </div>
  );
}
