// Collapse the navigation only after JavaScript is available.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const narrowScreen = window.matchMedia('(max-width: 44rem)');

function setMenuOpen(open) {
  navigation.hidden = narrowScreen.matches && !open;
  menuButton.setAttribute('aria-expanded', String(open));
}

function updateMenu() {
  menuButton.hidden = !narrowScreen.matches;
  if (narrowScreen.matches && navigation.contains(document.activeElement)) {
    menuButton.focus();
  }
  setMenuOpen(false);
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (link && narrowScreen.matches) {
    document.getElementById(link.hash.slice(1)).focus({ preventScroll: true });
    setMenuOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});

narrowScreen.addEventListener('change', updateMenu);
updateMenu();

// Normalised array power for eight half-wavelength-spaced sensors.
const elementCount = 8;
const radians = Math.PI / 180;
const plotFloor = -30;

function arrayResponse(scanAngle, sourceAngle) {
  const phaseStep = Math.PI * (Math.sin(sourceAngle * radians) - Math.sin(scanAngle * radians));
  let real = 0;
  let imaginary = 0;

  for (let element = 0; element < elementCount; element += 1) {
    const phase = element * phaseStep;
    real += Math.cos(phase);
    imaginary += Math.sin(phase);
  }

  const amplitude = Math.hypot(real, imaginary) / elementCount;
  return Math.max(plotFloor, 20 * Math.log10(amplitude));
}

const plot = document.getElementById('response-plot');
const context = plot.getContext('2d');
const angleSlider = document.getElementById('source-angle');
const angleValue = document.getElementById('angle-value');

function drawResponse() {
  const angle = Number(angleSlider.value);
  const width = plot.clientWidth;
  const height = plot.clientHeight;
  const scale = window.devicePixelRatio || 1;
  plot.width = Math.round(width * scale);
  plot.height = Math.round(height * scale);
  context.setTransform(scale, 0, 0, scale, 0, 0);

  const left = 40;
  const right = width - 18;
  const top = 29;
  const bottom = height - 24;
  const x = (degrees) => left + (degrees + 80) / 160 * (right - left);
  const y = (decibels) => top + decibels / plotFloor * (bottom - top);

  context.font = '11px Consolas, monospace';
  context.fillStyle = '#abc1b4';
  context.strokeStyle = '#3d574d';
  context.lineWidth = 1;
  context.fillText('POWER (dB)', left, 13);
  context.textAlign = 'right';
  context.fillText('STEERING ANGLE', right, 13);

  for (const level of [0, -10, -20, -30]) {
    context.beginPath();
    context.moveTo(left, y(level));
    context.lineTo(right, y(level));
    context.stroke();
    context.fillText(String(level), left - 8, y(level) + 4);
  }

  context.textAlign = 'center';
  for (const mark of [-80, -40, 0, 40, 80]) {
    context.beginPath();
    context.moveTo(x(mark), top);
    context.lineTo(x(mark), bottom);
    context.stroke();
    context.fillText(mark + '°', x(mark), bottom + 17);
  }

  const fill = context.createLinearGradient(0, top, 0, bottom);
  fill.addColorStop(0, 'rgba(178, 230, 172, 0.40)');
  fill.addColorStop(1, 'rgba(178, 230, 172, 0.02)');

  context.beginPath();
  context.moveTo(left, y(arrayResponse(-80, angle)));
  for (let scanAngle = -79.5; scanAngle <= 80; scanAngle += 0.5) {
    context.lineTo(x(scanAngle), y(arrayResponse(scanAngle, angle)));
  }
  context.strokeStyle = '#b2e6ac';
  context.lineWidth = 2;
  context.stroke();
  context.lineTo(right, bottom);
  context.lineTo(left, bottom);
  context.closePath();
  context.fillStyle = fill;
  context.fill();

  context.beginPath();
  context.moveTo(x(angle), top);
  context.lineTo(x(angle), bottom);
  context.setLineDash([3, 5]);
  context.strokeStyle = '#b2e6ac';
  context.lineWidth = 1;
  context.stroke();
  context.setLineDash([]);

  context.beginPath();
  context.arc(x(angle), top, 4, 0, 2 * Math.PI);
  context.fillStyle = '#d7f5b9';
  context.fill();

  const label = (angle > 0 ? '+' : '') + angle + '°';
  angleValue.value = label;
  plot.setAttribute('aria-label', 'Simulated array power peaks at the source angle of ' + angle + ' degrees.');
}

if (context) {
  plot.hidden = false;
  document.getElementById('plot-note').hidden = true;
  document.getElementById('signal-control').hidden = false;
  angleSlider.addEventListener('input', drawResponse);
  window.addEventListener('resize', drawResponse);
  drawResponse();
}

// The postcards remain direct image links without the dialog or JavaScript.
const postcards = Array.from(document.querySelectorAll('.postcard'));
const photoDialog = document.getElementById('photo-dialog');
const photoTitle = document.getElementById('photo-title');
const photoPreview = document.getElementById('photo-preview');
let currentPhoto = 0;
let opener = null;

function showPhoto(index) {
  currentPhoto = (index + postcards.length) % postcards.length;
  const postcard = postcards[currentPhoto];
  const preview = new Image();
  preview.src = postcard.href;
  preview.alt = postcard.querySelector('img').alt;
  photoTitle.textContent = postcard.dataset.title;
  photoPreview.replaceChildren(preview);
}

if (typeof photoDialog.showModal === 'function') {
  postcards.forEach((postcard, index) => {
    postcard.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      opener = postcard;
      showPhoto(index);
      photoDialog.showModal();
    });
  });

  document.getElementById('previous-photo').addEventListener('click', () => showPhoto(currentPhoto - 1));
  document.getElementById('next-photo').addEventListener('click', () => showPhoto(currentPhoto + 1));
  photoDialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const direction = event.key === 'ArrowLeft' ? -1 : 1;
      showPhoto(currentPhoto + direction);
      event.preventDefault();
    }
  });
  photoDialog.addEventListener('close', () => {
    opener.focus({ preventScroll: true });
  });
}
