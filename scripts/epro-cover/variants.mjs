/**
 * Fifteen compositions for the ePRO card cover. Every one shows the entry
 * summary before (legacy) and after (rebuilt). The canvas is 1920x1280 and
 * the card fades its bottom 42% into ink, so the story sits in the top
 * two-thirds of each frame.
 */
import { beforeScreen, afterScreen, phone } from './screens.mjs'

const B = () => beforeScreen()
const A = () => afterScreen()

/** Place a phone. x/y are canvas px; z scales; r rotates in degrees. */
const ph = (screen, { x, y, z = 1, r = 0, cls = '', style = '', inner = '' }) =>
  `<div class="abs" style="left:${x}px;top:${y}px;${style}">
     <div style="zoom:${z};rotate:${r}deg;transform-origin:50% 50%;${inner}">${phone(screen, cls)}</div>
   </div>`

const tag = (kind, x, y, style = '') =>
  `<span class="abs tag tag--${kind}" style="left:${x}px;top:${y}px;${style}">${kind}</span>`

const light = (x, y, w, h, op = 1) =>
  `<div class="light" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;opacity:${op}"></div>`

const arrow = (x, y, size = 120, color = 'var(--rose)') =>
  `<span class="abs serif" style="left:${x}px;top:${y}px;font-size:${size}px;color:${color};line-height:1">→</span>`

/* Standalone pieces of the rebuilt screen, for the exploded view. */
const part = (html, { x, y, z = 1, r = 0 }) =>
  `<div class="abs" style="left:${x}px;top:${y}px">
     <div class="screen diary part" style="zoom:${z};rotate:${r}deg;width:auto;height:auto;border-radius:0;padding:0;background:transparent;overflow:visible">${html}</div>
   </div>`

export const variants = [
  {
    n: 1,
    id: 'side-by-side',
    note: 'The straight comparison. Legacy screen sits lower and dimmer; the rebuild rises into the light.',
    html: () => `
      ${light(1000, -200, 1200, 1000, 0.9)}
      <div class="abs" style="left:959px;top:0;width:1px;height:1280px;background:var(--line)"></div>
      ${tag('before', 310, 72)}
      ${tag('after', 1116, 72)}
      ${ph(B(), { x: 300, y: 190, z: 1.12, cls: 'dim' })}
      ${ph(A(), { x: 1110, y: 150, z: 1.2 })}`,
  },
  {
    n: 2,
    id: 'overlap-stat',
    note: 'The result, in numbers, with the rebuild overlapping the legacy screen it replaced.',
    html: () => `
      ${light(1000, -260, 1300, 1100, 0.8)}
      <div class="abs eyebrow" style="left:120px;top:150px">Questionnaire completion</div>
      <div class="abs serif" style="left:112px;top:206px;font-size:200px;color:var(--text-muted);opacity:.75">
        40%<span class="abs" style="left:6%;top:50%;width:92%;height:8px;background:var(--rose);rotate:-6deg"></span>
      </div>
      <div class="abs serif" style="left:112px;top:420px;font-size:330px;color:var(--cream)">80%</div>
      <div class="abs" style="left:124px;top:760px;font-size:30px;color:var(--text-muted);max-width:520px;line-height:1.35">finished the daily questionnaire after the rebuild</div>
      ${ph(B(), { x: 860, y: 230, z: 1.02, r: -7, cls: 'dim' })}
      ${ph(A(), { x: 1240, y: 120, z: 1.22, r: 3 })}`,
  },
  {
    n: 3,
    id: 'wipe',
    note: 'One phone, two eras: a comparison slider frozen halfway, with the handle inviting a drag.',
    css: `.half-after { clip-path: inset(0 0 0 50%); }`,
    html: () => `
      ${light(560, -100, 1100, 1100, 0.9)}
      ${ph(B(), { x: 678, y: 110, z: 1.36, cls: 'dim' })}
      ${ph(A(), { x: 678, y: 110, z: 1.36, style: 'clip-path: inset(0 0 0 282px)' })}
      <div class="abs" style="left:958px;top:110px;width:5px;height:1180px;background:var(--rose);box-shadow:0 0 40px rgba(217,123,114,.6)"></div>
      <div class="abs" style="left:904px;top:586px;width:112px;height:112px;border-radius:999px;background:var(--rose);color:var(--ink);display:flex;align-items:center;justify-content:center;font-size:54px;box-shadow:0 20px 50px rgba(0,0,0,.6)">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg>
      </div>
      <div class="abs" style="left:420px;top:641px;width:484px;height:1px;background:var(--line)"></div>
      <div class="abs" style="left:1016px;top:641px;width:484px;height:1px;background:var(--line)"></div>
      ${tag('before', 300, 614)}
      ${tag('after', 1500, 614)}`,
  },
  {
    n: 4,
    id: 'four-in-ten',
    note: 'The headline figure, counted by hand, next to the screen that moved it.',
    html: () => `
      ${light(1150, -220, 1100, 1000, 0.85)}
      <div class="abs eyebrow" style="left:130px;top:140px">Participants who finished</div>
      <div class="abs serif" style="left:124px;top:196px;font-size:168px;color:var(--text-muted);opacity:.7;white-space:nowrap">4 in 10</div>
      <div class="abs" style="left:134px;top:290px;width:560px;height:6px;background:var(--rose);rotate:-4deg;opacity:.95"></div>
      <div class="abs serif" style="left:124px;top:372px;font-size:262px;color:var(--cream);white-space:nowrap">8 in 10</div>
      <div class="abs" style="left:134px;top:690px;font-size:30px;color:var(--text-muted);line-height:1.4;max-width:560px">Native iOS rebuild for study participants over 60</div>
      ${ph(B(), { x: 1020, y: 330, z: 0.9, r: -8, cls: 'dim' })}
      ${ph(A(), { x: 1290, y: 120, z: 1.18, r: 2 })}`,
  },
  {
    n: 5,
    id: 'perspective',
    note: 'Both phones angled in 3D, the legacy one falling back and the rebuild turning toward the viewer.',
    html: () => `
      ${light(650, -180, 1100, 1000, 0.9)}
      ${ph(B(), { x: 320, y: 210, z: 1.1, cls: 'dim', inner: 'transform: perspective(1600px) rotateY(34deg) rotateX(3deg)' })}
      ${ph(A(), { x: 1060, y: 130, z: 1.24, inner: 'transform: perspective(1600px) rotateY(-26deg) rotateX(2deg)' })}
      ${tag('before', 310, 72)}
      ${tag('after', 1446, 72)}`,
  },
  {
    n: 6,
    id: 'in-hand',
    note: 'Keeps the photographic warmth of the current cover: both screens over the clinician’s hands, softened.',
    html: ({ root }) => `
      <img src="file://${root}/public/work/epro/hero-hands.webp" class="abs" style="left:-80px;top:-120px;width:2080px;height:1386px;object-fit:cover;filter:blur(4px) brightness(.78) saturate(.9)">
      <div class="abs" style="inset:0;background:linear-gradient(180deg, rgba(12,8,16,.18), rgba(12,8,16,.5) 70%, var(--ink-2))"></div>
      ${light(900, -300, 1300, 1100, 0.55)}
      ${tag('before', 390, 72)}
      ${tag('after', 1120, 72)}
      ${ph(B(), { x: 380, y: 180, z: 1.1, r: -3, cls: 'dim' })}
      ${ph(A(), { x: 1110, y: 140, z: 1.2, r: 2 })}`,
  },
  {
    n: 7,
    id: 'the-slide',
    note: '“From the slide we skipped in demos to the one we led with”: the two screens as two deck slides.',
    css: `
      .slide { position:absolute; width: 1040px; height: 640px; border-radius: 28px; overflow: hidden; box-shadow: 0 50px 120px -30px rgba(0,0,0,.8); }
      .slide .cap { position:absolute; left: 64px; top: 64px; width: 380px; }
      .slide .cap .eyebrow { display:block; margin-bottom: 20px; }
      .slide .cap .t { font-family: var(--serif); font-size: 52px; line-height: 1.05; letter-spacing: -0.02em; }
      .slide .cap .n { position:absolute; left:0; top: 480px; font-size: 22px; letter-spacing: .04em; opacity: .7; }
      .slide .ph { position:absolute; left: 560px; top: 48px; }
    `,
    html: () => `
      ${light(900, -300, 1300, 1100, 0.6)}
      <div class="slide" style="left:40px;top:300px;rotate:-4deg;background:linear-gradient(160deg,#f6f2ec,#e9e1d6);color:var(--ink)">
        <div class="cap"><span class="eyebrow" style="color:#8a5a52">Slide 14 of 15</span><div class="t">The entry summary, as it shipped</div><div class="n">Skipped in every demo</div></div>
        <div class="ph" style="filter:grayscale(1)"><div style="zoom:1.02">${phone(B(), 'phone--flat')}</div></div>
      </div>
      <div class="slide" style="left:800px;top:70px;rotate:3deg;background:linear-gradient(160deg,#1a1020,#0d0811);border:1px solid var(--line);color:var(--cream)">
        <div class="cap"><span class="eyebrow">Slide 1 of 15</span><div class="t">Your evening diary, submitted</div><div class="n">The one we lead with</div></div>
        <div class="ph"><div style="zoom:1.02">${phone(A())}</div></div>
      </div>`,
  },
  {
    n: 8,
    id: 'callouts',
    note: 'A design-review sheet: the legacy screen set aside, the rebuild pinned with the three things that changed.',
    css: `
      .pin { position:absolute; width: 60px; height: 60px; border-radius: 999px; background: var(--rose); color: var(--ink); font: 600 26px/1 var(--sans); display:flex; align-items:center; justify-content:center; box-shadow: 0 0 0 10px rgba(217,123,114,.22); }
      .lead { position:absolute; height: 1px; background: var(--rose); opacity: .8; }
      .note { position:absolute; width: 520px; font-size: 32px; line-height: 1.3; color: var(--cream); }
      .note b { display:block; font-size: 22px; letter-spacing: .16em; text-transform: uppercase; color: var(--peach); font-weight: 600; margin-bottom: 10px; }
    `,
    html: () => `
      ${light(500, -200, 1100, 1000, 0.75)}
      ${tag('before', 130, 72)}
      ${ph(B(), { x: 120, y: 240, z: 0.92, r: -6, cls: 'dim' })}
      ${ph(A(), { x: 740, y: 110, z: 1.24 })}
      <div class="pin" style="left:1196px;top:196px">1</div>
      <div class="lead" style="left:1256px;top:226px;width:100px"></div>
      <div class="note" style="left:1376px;top:184px"><b>Done, with a time</b>Submitted 7:30 pm. Editable until tomorrow.</div>
      <div class="pin" style="left:1196px;top:500px">2</div>
      <div class="lead" style="left:1256px;top:530px;width:100px"></div>
      <div class="note" style="left:1376px;top:488px"><b>Grouped, not listed</b>Answers read as words, under the scale they used.</div>
      <div class="pin" style="left:1196px;top:830px">3</div>
      <div class="lead" style="left:1256px;top:860px;width:100px"></div>
      <div class="note" style="left:1376px;top:818px"><b>Symptoms as rings</b>Is 7 good or bad? Now you can see it.</div>`,
  },
  {
    n: 9,
    id: 'macro',
    note: 'Tight crops of the top of each screen, so the difference reads at thumbnail size.',
    html: () => `
      <div class="abs" style="left:0;top:0;width:960px;height:1280px;overflow:hidden;background:#e9e7ea">
        <div class="abs" style="left:0;top:-150px"><div class="dim" style="zoom:2.4615;filter:saturate(.5) brightness(.9)">${B()}</div></div>
      </div>
      <div class="abs" style="left:960px;top:0;width:960px;height:1280px;overflow:hidden;background:#fff">
        <div class="abs" style="left:0;top:-120px"><div style="zoom:2.4615">${A()}</div></div>
      </div>
      <div class="abs" style="left:956px;top:0;width:8px;height:1280px;background:var(--ink)"></div>
      ${tag('before', 56, 24, 'background:var(--ink);border-color:var(--ink)')}
      ${tag('after', 1180, 24)}`,
  },
  {
    n: 10,
    id: 'questions',
    note: 'The training-room questions crowd the legacy screen. The rebuild has nothing left to ask.',
    css: `.q { position:absolute; font-family: var(--serif); font-style: italic; font-size: 56px; letter-spacing: -0.01em; color: var(--cream); white-space: nowrap; }`,
    html: () => `
      ${light(1100, -200, 1200, 1000, 0.9)}
      ${ph(B(), { x: 400, y: 250, z: 1.0, r: -5, cls: 'dim' })}
      <div class="q" style="left:80px;top:100px;rotate:-6deg">Where do I press?</div>
      <div class="q" style="left:800px;top:300px;rotate:5deg;color:var(--rose)">Is 10 good or bad?</div>
      <div class="q" style="left:40px;top:760px;rotate:-4deg;color:var(--text-muted);font-size:48px">Did that save?</div>
      <div class="q" style="left:820px;top:660px;rotate:4deg;color:var(--text-muted);font-size:48px">Where do I go now?</div>
      ${ph(A(), { x: 1330, y: 150, z: 1.16 })}
      <div class="abs serif" style="left:1340px;top:70px;font-size:40px;color:var(--text-muted);font-style:italic">Nothing left to ask.</div>`,
  },
  {
    n: 11,
    id: 'two-worlds',
    note: 'Legacy on a clinical cream plate, rebuild on the site’s ink, split on a diagonal.',
    html: () => `
      <div class="abs" style="inset:0;background:linear-gradient(160deg,#f6f2ec,#e9e1d6);clip-path:polygon(0 0,57% 0,43% 100%,0 100%)"></div>
      ${light(1150, -220, 1200, 1000, 0.9)}
      ${tag('before', 150, 72, 'border-color:rgba(12,8,16,.4);color:var(--ink)')}
      ${tag('after', 1550, 72)}
      ${ph(B(), { x: 300, y: 190, z: 1.1, r: -4, style: 'filter:grayscale(1) contrast(.95)' })}
      ${ph(A(), { x: 1130, y: 130, z: 1.22, r: 2 })}`,
  },
  {
    n: 12,
    id: 'exploded',
    note: 'The rebuild pulled apart into the components that made new question types cheap.',
    css: `.part > * { box-shadow: 0 30px 70px -20px rgba(0,0,0,.7); } .part .pill, .part .card { margin:0 } .part .ringbox { background:#fff; border-radius: 24px; padding: 20px 24px; }`,
    html: () => `
      ${light(300, -200, 1100, 1000, 0.8)}
      ${tag('before', 130, 72)}
      ${ph(B(), { x: 120, y: 240, z: 0.86, r: -8, cls: 'dim' })}
      ${ph(A(), { x: 620, y: 110, z: 1.2 })}
      ${part(`<span class="pill" style="height:44px;font-size:18px;padding:0 18px">Submitted 7:30 pm <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg></span>`, { x: 1230, y: 150, z: 2.1, r: 3 })}
      ${part(`<section class="card" style="width:330px"><div class="card-head"><h2>How you feel</h2><span>Scale of 1 to 5</span></div><div class="arow"><span>Pain overall</span><b>Somewhat</b></div><div class="arow"><span>Tiredness</span><b>A little</b></div></section>`, { x: 1200, y: 330, z: 1.8, r: -2 })}
      ${part(`<div class="ringbox"><div class="rings" style="margin:0;gap:28px"><div class="ring"><div class="ringwrap"><svg viewBox="0 0 72 72"><circle cx="36" cy="36" r="31" fill="none" stroke="#dfe5ee" stroke-width="7"/><circle cx="36" cy="36" r="31" fill="none" stroke="#15296b" stroke-width="7" stroke-linecap="round" stroke-dasharray="136.4 194.8" transform="rotate(-90 36 36)"/></svg><span class="num">7</span></div><b>Pain now</b><small>Quite a lot</small></div></div></div>`, { x: 1260, y: 760, z: 2.3, r: 4 })}`,
  },
  {
    n: 13,
    id: 'migration',
    note: 'A dotted path carries the legacy summary into the rebuild; the label names the move.',
    html: () => `
      ${light(1000, -200, 1200, 1000, 0.85)}
      <svg class="abs" style="left:0;top:0" width="1920" height="1280" viewBox="0 0 1920 1280" fill="none">
        <path d="M 520 230 C 700 30, 1100 10, 1290 110" stroke="var(--rose)" stroke-width="5" stroke-dasharray="4 22" stroke-linecap="round"/>
        <path d="M 1250 72 L 1296 116 L 1238 130" stroke="var(--rose)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="abs eyebrow" style="left:740px;top:84px;background:var(--ink);padding:0 18px;line-height:56px;border:1px solid var(--line);border-radius:999px">Legacy web wrapper → native iOS</div>
      ${tag('before', 330, 212)}
      ${tag('after', 1180, 160)}
      ${ph(B(), { x: 320, y: 300, z: 1.02, r: -2, cls: 'dim' })}
      ${ph(A(), { x: 1170, y: 250, z: 1.2 })}`,
  },
  {
    n: 14,
    id: 'ghost',
    note: 'The legacy screen as a wireframe ghost behind the rebuild in full colour.',
    css: `
      .ghost .phone { background: transparent; box-shadow: inset 0 0 0 3px rgba(242,232,220,.32); }
      .ghost .phone::before, .ghost .phone::after { background: rgba(242,232,220,.3); box-shadow: none; }
      .ghost .screen { background: transparent; color: rgba(242,232,220,.62); }
      .ghost .island { background: rgba(242,232,220,.22); }
      .ghost .homebar { background: rgba(242,232,220,.35); }
      .ghost .legacy .row, .ghost .legacy .row > span:last-child { border-color: rgba(242,232,220,.22); }
      .ghost .legacy .nav .links { color: rgba(242,232,220,.4); }
      .ghost .legacy .bars i { background: rgba(242,232,220,.5) }
      .ghost .legacy .batt { background: transparent; border: 1px solid rgba(242,232,220,.5); color: rgba(242,232,220,.7) }
    `,
    html: () => `
      ${light(900, -200, 1200, 1000, 0.9)}
      ${tag('before', 430, 72)}
      ${tag('after', 1030, 72)}
      <div class="ghost">${ph(B(), { x: 420, y: 190, z: 1.12, r: -5 })}</div>
      ${ph(A(), { x: 1020, y: 150, z: 1.22, r: 3 })}`,
  },
  {
    n: 15,
    id: 'editorial',
    note: 'Magazine spread: serif wordmarks and both phones tipped on the same axis, cropped by the frame.',
    html: () => `
      ${light(1100, -300, 1300, 1100, 0.9)}
      <div class="abs serif" style="left:90px;top:70px;font-size:150px;color:var(--text-muted);font-style:italic;opacity:.8">Before</div>
      <div class="abs serif" style="right:90px;top:70px;font-size:150px;color:var(--cream);font-style:italic">After</div>
      ${ph(B(), { x: 240, y: 330, z: 1.12, r: -12, cls: 'dim' })}
      ${ph(A(), { x: 1040, y: 250, z: 1.28, r: -12 })}`,
  },
]
