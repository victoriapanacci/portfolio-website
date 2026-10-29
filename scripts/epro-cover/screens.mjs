/**
 * The two ePRO entry-summary screens, rebuilt in HTML so the card cover can
 * be rendered crisp at any size. `before` is the legacy "Confirm Entry
 * Summary"; `after` is the rebuilt "Your evening diary" review, matching
 * the DribbleCollect design system in /public/work/epro/prototype.
 */

export const PHONE_W = 390
export const PHONE_H = 844

/** Styles shared by every screen and the device frame. */
export const screenCss = `
  .phone {
    position: relative;
    box-sizing: content-box;
    width: ${PHONE_W}px;
    height: ${PHONE_H}px;
    padding: 14px;
    border-radius: 64px;
    background: #0b0b0d;
    box-shadow:
      inset 0 0 0 2px #2c2c31,
      inset 0 0 0 4px #0b0b0d,
      0 50px 100px -20px rgba(0, 0, 0, 0.7),
      0 20px 40px -20px rgba(0, 0, 0, 0.6);
  }
  .phone::before {
    /* side buttons */
    content: '';
    position: absolute;
    left: -3px;
    top: 190px;
    width: 3px;
    height: 110px;
    border-radius: 2px 0 0 2px;
    background: #2c2c31;
    box-shadow: 0 150px 0 #2c2c31, 0 -70px 0 #2c2c31;
  }
  .phone::after {
    content: '';
    position: absolute;
    right: -3px;
    top: 230px;
    width: 3px;
    height: 76px;
    border-radius: 0 2px 2px 0;
    background: #2c2c31;
  }
  .phone--flat { box-shadow: inset 0 0 0 2px #2c2c31, inset 0 0 0 4px #0b0b0d; }
  .screen {
    position: relative;
    width: ${PHONE_W}px;
    height: ${PHONE_H}px;
    border-radius: 50px;
    overflow: hidden;
    background: #fff;
    font-family: Inter, -apple-system, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .island {
    position: absolute;
    top: 11px;
    left: 50%;
    width: 124px;
    height: 36px;
    translate: -50% 0;
    border-radius: 999px;
    background: #000;
    z-index: 5;
  }
  .homebar {
    position: absolute;
    bottom: 8px;
    left: 50%;
    width: 140px;
    height: 5px;
    translate: -50% 0;
    border-radius: 999px;
    background: #0f172a;
    opacity: 0.9;
  }

  /* ---- Before: the legacy Confirm Entry Summary ---- */
  .legacy { color: #111; }
  .legacy .status {
    position: absolute;
    top: 14px;
    left: 0;
    right: 0;
    padding: 0 26px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 17px;
    font-weight: 600;
  }
  .legacy .status .back { display: block; font-size: 12px; font-weight: 500; margin-top: 2px; }
  .legacy .status .right { display: flex; gap: 6px; align-items: center; font-size: 12px; font-weight: 600; margin-top: 4px; }
  .legacy .bars { display: inline-flex; gap: 2px; align-items: flex-end; height: 11px; }
  .legacy .bars i { width: 3px; background: #111; border-radius: 1px; }
  .legacy .batt { background: #111; color: #fff; border-radius: 4px; padding: 1px 4px; font-size: 11px; }
  .legacy .nav {
    position: absolute;
    top: 96px;
    left: 0;
    right: 0;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 19px;
  }
  .legacy .nav .links { color: #2f7cf6; display: flex; gap: 14px; }
  .legacy .nav .title { font-weight: 600; margin-left: auto; padding-right: 10px; }
  .legacy .rows { position: absolute; top: 150px; left: 24px; right: 0; }
  .legacy .row {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 20px;
    padding: 14px 0 14px;
    font-size: 19px;
    line-height: 1.35;
    border-bottom: 1px solid #c8c8cc;
  }
  .legacy .row > span:first-child { padding-right: 6px; }
  .legacy .row > span:last-child { border-left: 1px solid #c8c8cc; padding-left: 14px; margin: -14px 0; padding-top: 14px; padding-bottom: 14px; }

  /* ---- After: Your evening diary ---- */
  .diary {
    --canvas: #ffffff; --surface: #f1f5f9; --primary: #15296b; --ink: #0f172a;
    --ink-soft: #475569; --line: #cbd5e1; --success-bg: #f0fdf4; --success-ink: #166534;
    color: var(--ink);
    padding: 56px 20px 34px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .diary .top { display: flex; align-items: center; justify-content: space-between; }
  .diary .iconbtn {
    width: 48px; height: 48px; border-radius: 999px; background: var(--surface);
    display: flex; align-items: center; justify-content: center; color: var(--ink);
  }
  .diary .pill {
    display: inline-flex; align-items: center; gap: 6px; height: 36px; padding: 0 14px;
    border-radius: 999px; background: var(--success-bg); color: var(--success-ink);
    font-size: 15px; font-weight: 600;
  }
  .diary h1 {
    margin: 8px 0 0; padding: 0 20px;
    font-family: Figtree, Inter, sans-serif; font-size: 30px; font-weight: 700;
    line-height: 1.2; letter-spacing: -0.01em;
  }
  .diary .sub { margin: -8px 0 0; padding: 0 20px; font-size: 18px; line-height: 1.4; color: var(--ink-soft); }
  .diary .card {
    box-sizing: border-box; border-radius: 24px; padding: 20px; background: var(--surface);
    display: flex; flex-direction: column;
  }
  .diary .card-head {
    display: flex; align-items: baseline; justify-content: space-between;
    padding-bottom: 12px; border-bottom: 1px solid var(--line);
  }
  .diary .card h2 { margin: 0; font-family: Figtree, Inter, sans-serif; font-size: 20px; font-weight: 700; line-height: 1.3; }
  .diary .card-head span { font-size: 15px; color: var(--ink-soft); }
  .diary .arow {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    padding: 11px 0; font-size: 18px; line-height: 1.3;
  }
  .diary .arow + .arow { border-top: 1px solid var(--line); }
  .diary .arow b { font-weight: 600; }
  .diary .rings { display: flex; justify-content: space-between; margin-top: 16px; padding: 0 6px; }
  .diary .ring { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
  .diary .ring svg { width: 72px; height: 72px; }
  .diary .ring b { font-size: 16px; font-weight: 600; display: block; }
  .diary .ring small { font-size: 14px; color: var(--ink-soft); }
  .diary .ring .num { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: Figtree, Inter, sans-serif; font-size: 20px; font-weight: 700; }
  .diary .ringwrap { position: relative; width: 72px; height: 72px; }
`

const chevron = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`
const check = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>`

function ring(value, label, word) {
  const r = 31
  const c = 2 * Math.PI * r
  const dash = (value / 10) * c
  return `
    <div class="ring">
      <div class="ringwrap">
        <svg viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="${r}" fill="none" stroke="#dfe5ee" stroke-width="7"/>
          <circle cx="36" cy="36" r="${r}" fill="none" stroke="#15296b" stroke-width="7"
            stroke-linecap="round" stroke-dasharray="${dash.toFixed(2)} ${c.toFixed(2)}"
            transform="rotate(-90 36 36)"/>
        </svg>
        <span class="num">${value}</span>
      </div>
      <b>${label}</b><small>${word}</small>
    </div>`
}

export function beforeScreen() {
  return `
    <div class="screen legacy">
      <div class="island"></div>
      <div class="status">
        <div>2:42 <span style="font-size:13px">➤</span><span class="back">◀ App Store</span></div>
        <div class="right">
          <span class="bars"><i style="height:4px"></i><i style="height:6px"></i><i style="height:8px"></i><i style="height:11px;background:#c8c8cc"></i></span>
          <span>LTE</span><span class="batt">34</span>
        </div>
      </div>
      <div class="nav">
        <span class="links"><span>Ok</span><span>Cancel</span></span>
        <span class="title">Confirm Entry Summary</span>
      </div>
      <div class="rows">
        <div class="row"><span>Did this event just occur?</span><span>No</span></div>
        <div class="row"><span>Date</span><span>26/May/2025</span></div>
        <div class="row"><span>Time</span><span>14:41</span></div>
        <div class="row"><span>Are you enjoying your day?</span><span>No</span></div>
        <div class="row"><span>How happy are you from a scale of 0-10?</span><span>4</span></div>
      </div>
      <div class="homebar"></div>
    </div>`
}

export function afterScreen() {
  return `
    <div class="screen diary">
      <div class="island"></div>
      <div class="top">
        <span class="iconbtn">${chevron}</span>
        <span class="pill">Submitted 7:30 pm ${check}</span>
      </div>
      <h1>Your evening diary</h1>
      <p class="sub">Edit until 7:30 pm tomorrow.</p>
      <section class="card">
        <div class="card-head"><h2>How you feel</h2><span>Scale of 1 to 5</span></div>
        <div class="arow"><span>Pain overall</span><b>Somewhat</b></div>
        <div class="arow"><span>Tiredness</span><b>A little</b></div>
        <div class="arow"><span>Sleep last night</span><b>Well</b></div>
        <div class="arow"><span>Mood today</span><b>Good</b></div>
      </section>
      <section class="card">
        <h2>Symptoms, 1 to 10</h2>
        <div class="rings">
          ${ring(7, 'Pain now', 'Quite a lot')}
          ${ring(2, 'Nausea', 'Very mild')}
          ${ring(6, 'Overall', 'Fairly good')}
        </div>
      </section>
      <div class="homebar"></div>
    </div>`
}

/** Wrap a screen in the device frame. */
export function phone(screen, cls = '') {
  return `<div class="phone ${cls}">${screen}</div>`
}
