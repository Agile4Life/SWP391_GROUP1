import { useEffect, useState } from 'react';
import { glassEngine } from './LiquidGlassEngine';
import { DEFAULT_GLASS_PARAMS, LiquidGlassParams } from './types';
import './liquid-glass.css';

interface LiquidGlassControlsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiquidGlassControls({ isOpen, onClose }: LiquidGlassControlsProps) {
  const [params, setParams] = useState<LiquidGlassParams>({ ...glassEngine.params });

  useEffect(() => {
    return glassEngine.subscribe((updated) => {
      setParams({ ...updated });
    });
  }, []);

  const handleChange = (key: keyof LiquidGlassParams, value: number | boolean) => {
    const next = { ...params, [key]: value };
    setParams(next);
    glassEngine.setParams(next);
  };

  const handleReset = () => {
    setParams({ ...DEFAULT_GLASS_PARAMS });
    glassEngine.setParams({ ...DEFAULT_GLASS_PARAMS });
  };

  const handleRecapture = () => {
    glassEngine.pageSnapshot = null;
    glassEngine.captureSnapshot();
  };

  if (!isOpen) return null;

  return (
    <div className="glass-controls-panel">
      <div className="glass-controls-header">
        <h4 className="glass-controls-title">
          <span>🍎</span> Liquid Glass Shader Tuner
        </h4>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#A0978E',
            fontSize: '1.1rem',
            cursor: 'pointer',
            padding: '2px 6px',
          }}
          title="Đóng bảng điều khiển"
        >
          ✕
        </button>
      </div>

      <div className="glass-control-row">
        <div className="glass-control-label">
          <span>Edge Intensity</span>
          <span className="glass-control-value">{params.edgeIntensity.toFixed(3)}</span>
        </div>
        <input
          type="range"
          className="glass-slider"
          min="0"
          max="0.1"
          step="0.001"
          value={params.edgeIntensity}
          onChange={(e) => handleChange('edgeIntensity', parseFloat(e.target.value))}
        />
      </div>

      <div className="glass-control-row">
        <div className="glass-control-label">
          <span>Rim Intensity</span>
          <span className="glass-control-value">{params.rimIntensity.toFixed(3)}</span>
        </div>
        <input
          type="range"
          className="glass-slider"
          min="0"
          max="0.2"
          step="0.001"
          value={params.rimIntensity}
          onChange={(e) => handleChange('rimIntensity', parseFloat(e.target.value))}
        />
      </div>

      <div className="glass-control-row">
        <div className="glass-control-label">
          <span>Base Intensity</span>
          <span className="glass-control-value">{params.baseIntensity.toFixed(3)}</span>
        </div>
        <input
          type="range"
          className="glass-slider"
          min="0"
          max="0.05"
          step="0.001"
          value={params.baseIntensity}
          onChange={(e) => handleChange('baseIntensity', parseFloat(e.target.value))}
        />
      </div>

      <div className="glass-control-row">
        <div className="glass-control-label">
          <span>Edge Distance</span>
          <span className="glass-control-value">{params.edgeDistance.toFixed(2)}</span>
        </div>
        <input
          type="range"
          className="glass-slider"
          min="0.05"
          max="0.5"
          step="0.01"
          value={params.edgeDistance}
          onChange={(e) => handleChange('edgeDistance', parseFloat(e.target.value))}
        />
      </div>

      <div className="glass-control-row">
        <div className="glass-control-label">
          <span>Rim Distance</span>
          <span className="glass-control-value">{params.rimDistance.toFixed(2)}</span>
        </div>
        <input
          type="range"
          className="glass-slider"
          min="0.1"
          max="2.0"
          step="0.05"
          value={params.rimDistance}
          onChange={(e) => handleChange('rimDistance', parseFloat(e.target.value))}
        />
      </div>

      <div className="glass-control-row">
        <div className="glass-control-label">
          <span>Base Distance</span>
          <span className="glass-control-value">{params.baseDistance.toFixed(2)}</span>
        </div>
        <input
          type="range"
          className="glass-slider"
          min="0.05"
          max="0.3"
          step="0.01"
          value={params.baseDistance}
          onChange={(e) => handleChange('baseDistance', parseFloat(e.target.value))}
        />
      </div>

      <div className="glass-control-row">
        <div className="glass-control-label">
          <span>Corner Boost</span>
          <span className="glass-control-value">{params.cornerBoost.toFixed(3)}</span>
        </div>
        <input
          type="range"
          className="glass-slider"
          min="0"
          max="0.1"
          step="0.001"
          value={params.cornerBoost}
          onChange={(e) => handleChange('cornerBoost', parseFloat(e.target.value))}
        />
      </div>

      <div className="glass-control-row">
        <div className="glass-control-label">
          <span>Ripple Effect</span>
          <span className="glass-control-value">{params.rippleEffect.toFixed(2)}</span>
        </div>
        <input
          type="range"
          className="glass-slider"
          min="0"
          max="0.5"
          step="0.01"
          value={params.rippleEffect}
          onChange={(e) => handleChange('rippleEffect', parseFloat(e.target.value))}
        />
      </div>

      <div className="glass-control-row">
        <div className="glass-control-label">
          <span>Blur Radius</span>
          <span className="glass-control-value">{params.blurRadius.toFixed(1)}px</span>
        </div>
        <input
          type="range"
          className="glass-slider"
          min="0"
          max="12.0"
          step="0.5"
          value={params.blurRadius}
          onChange={(e) => handleChange('blurRadius', parseFloat(e.target.value))}
        />
      </div>

      <div className="glass-control-row">
        <div className="glass-control-label">
          <span>Tint Opacity</span>
          <span className="glass-control-value">{params.tintOpacity.toFixed(2)}</span>
        </div>
        <input
          type="range"
          className="glass-slider"
          min="0"
          max="0.8"
          step="0.05"
          value={params.tintOpacity}
          onChange={(e) => handleChange('tintOpacity', parseFloat(e.target.value))}
        />
      </div>

      <div className="glass-control-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.74rem', color: '#DDD4CA' }}>Center Warping</span>
        <input
          type="checkbox"
          checked={params.warp}
          onChange={(e) => handleChange('warp', e.target.checked)}
          style={{ cursor: 'pointer', accentColor: '#C2A684' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '14px' }}>
        <button type="button" className="glass-toggle-btn" onClick={handleReset}>
          ↺ Mặc định
        </button>
        <button type="button" className="glass-toggle-btn" onClick={handleRecapture}>
          📷 Chụp lại
        </button>
      </div>
    </div>
  );
}
