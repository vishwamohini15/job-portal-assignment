import React from 'react';
import ReactSlider from 'react-slider';

function SalaryRangeSlider({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Salary Range (₹)</label>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={value}
        onChange={onChange}
        min={1000}
        max={100000}
        step={5000}
        minDistance={10000}
        pearling
      />
      <div className="flex justify-between text-sm mt-2">
        <span>₹{value[0]}</span>
        <span>₹{value[1]}</span>
      </div>

      {/* Slider styles */}
      <style>{`
        .horizontal-slider {
          height: 6px;
          background: #e5e7eb;
          margin-top: 10px;
        }
        .thumb {
          height: 18px;
          width: 18px;
          background-color: #2563eb;
          border-radius: 50%;
          cursor: pointer;
          margin-top: -6px;
        }
        .track {
          background: #60a5fa;
        }
      `}</style>
    </div>
  );
}

export default SalaryRangeSlider;
