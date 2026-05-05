import { useEffect, useRef } from 'react';

const ShaderBackground = () => {
  const canvasRef = useRef(null);

  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  // uDark: 1.0 = dark mode, 0.0 = light mode
  // Dark palette:  navy bg (#0f2b46 / #061320), bright blue lines (#00a8e8)
  // Light palette: near-white bg (#f0f7ff / #d1ecfa), deeper blue lines (#0077aa)
  const fsSource = `
    precision highp float;
    uniform vec2 iResolution;
    uniform float iTime;
    uniform float uDark;

    const float overallSpeed = 0.2;
    const float gridSmoothWidth = 0.015;
    const float axisWidth = 0.05;
    const float majorLineWidth = 0.025;
    const float minorLineWidth = 0.0125;
    const float majorLineFrequency = 5.0;
    const float minorLineFrequency = 1.0;
    const float scale = 5.0;
    const float minLineWidth = 0.01;
    const float maxLineWidth = 0.2;
    const float lineSpeed = 1.0 * overallSpeed;
    const float lineAmplitude = 1.0;
    const float lineFrequency = 0.2;
    const float warpSpeed = 0.2 * overallSpeed;
    const float warpFrequency = 0.5;
    const float warpAmplitude = 1.0;
    const float offsetFrequency = 0.5;
    const float offsetSpeed = 1.33 * overallSpeed;
    const float minOffsetSpread = 0.6;
    const float maxOffsetSpread = 2.0;
    const int linesPerGroup = 16;

    #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
    #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
    #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
    #define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

    float random(float t) {
      return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
    }

    float getPlasmaY(float x, float horizontalFade, float offset) {
      return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
    }

    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      vec2 uv = fragCoord.xy / iResolution.xy;
      vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

      float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
      float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

      space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
      space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

      // Dark mode: solid #0B1120 = vec4(0.043, 0.067, 0.125)
      // Light mode: solid #FFFFFF = vec4(1.0, 1.0, 1.0)
      vec4 darkBg   = vec4(0.043, 0.067, 0.125, 1.0);
      vec4 lightBg  = vec4(1.0, 1.0, 1.0, 1.0);
      vec4 darkLine  = vec4(0.0, 0.66, 0.91, 1.0);
      vec4 lightLine = vec4(0.0, 0.47, 0.69, 1.0);

      vec4 bgColor   = mix(lightBg,   darkBg,   uDark);
      vec4 lineColor = mix(lightLine, darkLine, uDark);

      vec4 lines = vec4(0.0);
      float lineIntensity = 0.0;

      for (int l = 0; l < linesPerGroup; l++) {
        float normalizedLineIndex = float(l) / float(linesPerGroup);
        float offsetTime = iTime * offsetSpeed;
        float offsetPosition = float(l) + space.x * offsetFrequency;
        float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
        float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
        float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
        float linePosition = getPlasmaY(space.x, horizontalFade, offset);
        float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

        float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
        vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
        float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

        line = line + circle;
        lines += line * lineColor * rand;
        lineIntensity += line * rand;
      }

      // Dark mode: additive glow over dark bg
      // Light mode: mix toward lineColor so blue stays blue (no inversion)
      vec4 darkResult  = clamp(bgColor + lines, 0.0, 1.0);
      vec4 lightResult = mix(bgColor, lineColor, clamp(lineIntensity * 0.75, 0.0, 1.0));
      vec4 fragColor = mix(lightResult, darkResult, uDark);
      fragColor.a = 1.0;

      gl_FragColor = fragColor;
    }
  `;

  const loadShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const initShaderProgram = (gl, vs, fs) => {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Shader program link error:', gl.getProgramInfoLog(shaderProgram));
      return null;
    }
    return shaderProgram;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported.');
      return;
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]),
      gl.STATIC_DRAW
    );

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, 'iResolution'),
        time: gl.getUniformLocation(shaderProgram, 'iTime'),
        dark: gl.getUniformLocation(shaderProgram, 'uDark'),
      },
    };

    // Track current dark value for smooth transitions
    let currentDark = document.documentElement.getAttribute('data-theme') === 'dark' ? 1.0 : 0.0;
    let targetDark = currentDark;

    const observer = new MutationObserver(() => {
      targetDark = document.documentElement.getAttribute('data-theme') === 'dark' ? 1.0 : 0.0;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animId;
    const startTime = Date.now();

    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;

      // Smooth transition between light/dark (lerp at ~4% per frame ≈ ~0.25s)
      currentDark += (targetDark - currentDark) * 0.04;

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(programInfo.program);
      gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);
      gl.uniform1f(programInfo.uniformLocations.time, currentTime);
      gl.uniform1f(programInfo.uniformLocations.dark, currentDark);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default ShaderBackground;
