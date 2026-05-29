/* js/components/dashboard/miniChart.js */

/**
 * Renders a tiny sparkline on a canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {Array} values - Array of {close}
 */
export function renderMiniChart(canvas, values) {
  if (!canvas || values.length < 2) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.offsetWidth || 200;
  const height = canvas.offsetHeight || 60;
  canvas.width = width;
  canvas.height = height;

  const closes = values.map(v => v.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const range = max - min || 1;

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.strokeStyle = '#2e86de';
  ctx.lineWidth = 1.5;

  closes.forEach((val, i) => {
    const x = (i / (closes.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}