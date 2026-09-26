import React, { useEffect, useRef, useState } from 'react';
import { LiquidGlassShape } from './types';
import { glassEngine, GLProgramRefs } from './LiquidGlassEngine';
import { useLiquidGlassParent } from './LiquidGlassContext';
import './liquid-glass.css';

interface LiquidGlassButtonProps {
  children?: React.ReactNode;
  text?: string;
  shape?: LiquidGlassShape;
  size?: number; // font size or button size base
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

export function LiquidGlassButton({
  children,
  text,
  shape = 'pill',
  size = 14,
  onClick,
  className = '',
  style,
  title,
}: LiquidGlassButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRefs = useRef<GLProgramRefs | null>(null);
  const parent = useLiquidGlassParent();
  const isNested = Boolean(parent);
  const [borderRadius, setBorderRadius] = useState<number>(size * 1.5);

  useEffect(() => {
    const button = buttonRef.current;
    const canvas = canvasRef.current;
    if (!button || !canvas) return;

    // Setup WebGL (nested or standalone)
    const refs = glassEngine.setupWebGL(canvas, isNested);
    glRefs.current = refs;

    const updateSize = () => {
      const rect = button.getBoundingClientRect();
      let w = Math.ceil(rect.width);
      let h = Math.ceil(rect.height);
      let r = size;

      if (shape === 'circle') {
        const circleDim = Math.max(w, h, size * 2.4);
        w = circleDim;
        h = circleDim;
        r = circleDim / 2;
        button.style.width = `${circleDim}px`;
        button.style.height = `${circleDim}px`;
      } else if (shape === 'pill') {
        r = h / 2;
      }

      if (w > 0 && h > 0) {
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          canvas.style.width = `${w}px`;
          canvas.style.height = `${h}px`;
          canvas.style.borderRadius = `${r}px`;
          button.style.borderRadius = `${r}px`;

          if (refs && refs.gl) {
            refs.gl.viewport(0, 0, w, h);
          }
        }
        setBorderRadius(r);
      }
    };

    updateSize();

    const render = () => {
      const refs = glRefs.current;
      if (!refs || !refs.gl) return;
      const gl = refs.gl;

      gl.useProgram(refs.program);

      const rect = canvas.getBoundingClientRect();
      const posX = rect.left + rect.width / 2;
      const posY = rect.top + rect.height / 2;

      gl.uniform2f(refs.resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(refs.borderRadiusLoc, borderRadius);

      const p = glassEngine.params;
      gl.uniform1f(refs.warpLoc, p.warp ? 1.0 : 0.0);
      gl.uniform1f(refs.blurRadiusLoc, p.blurRadius);
      gl.uniform1f(refs.edgeIntensityLoc, p.edgeIntensity);
      gl.uniform1f(refs.rimIntensityLoc, p.rimIntensity);
      gl.uniform1f(refs.baseIntensityLoc, p.baseIntensity);
      gl.uniform1f(refs.edgeDistanceLoc, p.edgeDistance);
      gl.uniform1f(refs.rimDistanceLoc, p.rimDistance);
      gl.uniform1f(refs.baseDistanceLoc, p.baseDistance);
      gl.uniform1f(refs.cornerBoostLoc, p.cornerBoost);
      gl.uniform1f(refs.rippleEffectLoc, p.rippleEffect);
      gl.uniform1f(refs.tintOpacityLoc, p.tintOpacity);

      if (isNested && parent) {
        const containerInfo = parent.getContainerInfo();
        if (!containerInfo.canvas) return;

        // Sample parent container's canvas as nested glass texture!
        gl.bindTexture(gl.TEXTURE_2D, refs.texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          containerInfo.canvas
        );

        gl.uniform2f(refs.textureSizeLoc, containerInfo.width, containerInfo.height);
        if (refs.buttonPositionLoc) {
          gl.uniform2f(refs.buttonPositionLoc, posX, posY);
        }
        if (refs.containerPositionLoc) {
          gl.uniform2f(refs.containerPositionLoc, containerInfo.x, containerInfo.y);
        }
        if (refs.containerSizeLoc) {
          gl.uniform2f(refs.containerSizeLoc, containerInfo.width, containerInfo.height);
        }
      } else {
        // Standalone button sampling page snapshot
        const snapshot = glassEngine.pageSnapshot;
        if (!snapshot) return;

        gl.bindTexture(gl.TEXTURE_2D, refs.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, snapshot);

        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        gl.uniform2f(refs.textureSizeLoc, snapshot.width, snapshot.height);
        gl.uniform1f(refs.scrollYLoc, scrollY);
        gl.uniform2f(refs.containerPositionLoc, posX, posY);
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const unregister = glassEngine.registerRenderer(render);
    render();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
      render();
    });
    resizeObserver.observe(button);

    return () => {
      unregister();
      resizeObserver.disconnect();
    };
  }, [shape, size, borderRadius, isNested, parent]);

  const shapeClass =
    shape === 'circle' ? 'glass-button-circle' : shape === 'pill' ? 'glass-button-pill' : '';

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`glass-button ${shapeClass} ${className}`}
      onClick={onClick}
      style={{
        padding: shape === 'circle' ? '0' : '10px 22px',
        fontSize: `${size}px`,
        ...style,
      }}
      title={title}
    >
      <canvas ref={canvasRef} />
      <span className="glass-button-content">
        {text}
        {children}
      </span>
    </button>
  );
}
