// scripts.js — demo scripts and simple navigation handlers
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter-change');
const refreshBtn = document.getElementById('refresh');
const tableBody = document.getElementById('table-body');

function drawSparkline(svg, values) {
  if(!svg) return;
  const w = 60, h = 20;
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  let d = '';
  values.forEach((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * h;
    d += (i === 0 ? 'M' : 'L') + x + ' ' + y + ' ';
  });
  svg.innerHTML = '<path d="'+d.trim()+'" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round" stroke-linecap="round"></path>';
}

function randomSeries(n, base=1) {
  let v = base;
  const out = [];
  for (let i=0;i<n;i++){
    v += (Math.random()-0.5) * base * 0.08;
    out.push(Math.max(v, 0.0001));
  }
  return out;
}

function updateRow(row) {
  if(!row) return;
  const priceCell = row.querySelector('.cell.price');
  const changeCell = row.querySelector('.cell.change');
  const chart = row.querySelector('.sparkline');

  let current = parseFloat((priceCell.textContent || '').replace(/[$,]/g,'')) || (Math.random()*1000);
  const delta = current * ((Math.random()-0.5)/200);
  const next = Math.max(0.0001, current + delta);
  priceCell.textContent = (next>=1000 ? '$' + (next.toLocaleString(undefined,{maximumFractionDigits:2})) : '$' + next.toFixed(2));

  const pct = ((next - current)/current)*100;
  changeCell.textContent = (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
  changeCell.classList.toggle('positive', pct>=0);
  changeCell.classList.toggle('negative', pct<0);

  const series = randomSeries(10, next/1000 + 1);
  drawSparkline(chart, series);
}

function updateAllRows() {
  const rows = tableBody ? [...tableBody.querySelectorAll('.row')] : [];
  rows.forEach(r => updateRow(r));
}

function applyFilters() {
  if(!tableBody) return;
  const q = (searchInput && searchInput.value || '').toLowerCase();
  const changeFilter = filterSelect ? filterSelect.value : 'all';
  const onlyHighVolume = document.getElementById('only-high-volume') ? document.getElementById('only-high-volume').checked : false;
  const onlyPositive = document.getElementById('only-positive') ? document.getElementById('only-positive').checked : false;

  const rows = [...tableBody.querySelectorAll('.row')];
  rows.forEach(row => {
    const pair = (row.dataset.pair || '').toLowerCase();
    const changeText = row.querySelector('.cell.change').textContent || '';
    const volText = row.querySelector('.cell.volume').textContent || '0';
    const volNum = parseFloat(volText.replace(/[^\d.]/g,'')) || 0;
    const isPos = changeText.includes('+');

    let visible = true;
    if (q && !pair.includes(q)) visible = false;
    if (changeFilter === 'up' && !isPos) visible = false;
    if (changeFilter === 'down' && isPos) visible = false;
    if (onlyHighVolume && volNum < 10) visible = false;
    if (onlyPositive && !isPos) visible = false;

    row.style.display = visible ? '' : 'none';
  });
}

if(searchInput) searchInput.addEventListener('input', applyFilters);
if(filterSelect) filterSelect.addEventListener('change', applyFilters);
const hv = document.getElementById('only-high-volume'); if(hv) hv.addEventListener('change', applyFilters);
const op = document.getElementById('only-positive'); if(op) op.addEventListener('change', applyFilters);
const rb = document.getElementById('refresh'); if(rb) rb.addEventListener('click', () => { updateAllRows(); applyFilters(); });

document.querySelectorAll('.sparkline').forEach(s => drawSparkline(s, randomSeries(10, Math.random()*2 + 1)));
setInterval(() => { updateAllRows(); applyFilters(); }, 3000);

// Simple waitlist behavior: no backend — redirect to thank-you page on submit
const waitlist = document.getElementById('waitlist');
if(waitlist){
  waitlist.addEventListener('submit', (e)=>{
    // let the form proceed to thank-you.html (GET)
  });
}
