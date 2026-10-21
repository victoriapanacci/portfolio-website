/* @ds-bundle: {"format":4,"namespace":"DribbleCollect","components":[{"name":"Button"},{"name":"IconButton"},{"name":"Chip"},{"name":"DiaryCard"},{"name":"ProgressRing"},{"name":"DateStrip"},{"name":"QuestionHeader"},{"name":"RatingSlider"},{"name":"OptionList"},{"name":"WeekGrid"},{"name":"UpNextCard"},{"name":"StudyProgressCard"},{"name":"CareTeamCard"},{"name":"ObjectSlot"},{"name":"Switch"}]} */
(function () {
  var R = window.React;
  var h = R.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function omit(o, keys) { var r = {}; for (var k in o) { if (keys.indexOf(k) < 0) r[k] = o[k]; } return r; }

  var PATHS = {
    back: ['M15 5l-7 7 7 7'],
    chevron: ['M9 5l7 7-7 7'],
    mic: ['M9 6a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z', 'M5 11a7 7 0 0 0 14 0', 'M12 18v3'],
    settings: ['M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z', 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'],
    help: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', 'M9.5 9.5a2.5 2.5 0 0 1 4.9.7c0 1.7-2.4 2.2-2.4 3.8', 'M12 17.2h.01'],
    phone: ['M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2'],
    sunrise: ['M12 3v3M5.6 8.6 3.5 6.5M18.4 8.6l2.1-2.1M3 17h18M7 17a5 5 0 0 1 10 0M8 21h8'],
    check: ['M5 12.5l4.5 4.5L19 7'],
    bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
    bellOff: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0', 'M3 3l18 18'],
    pencil: ['M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z', 'M14.5 5.5l3 3'],
    stop: ['M8 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z'],
    minus: ['M5 12h14'],
    plus: ['M12 5v14M5 12h14'],
    mug: ['M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z', 'M16 11h1.5a2.5 2.5 0 0 1 0 5H16', 'M8 3c0 1 1 1.5 1 2.5M12 3c0 1 1 1.5 1 2.5'],
    notebook: ['M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6z', 'M9 3v18', 'M12 8h3M12 12h3'],
    moon: ['M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z'],
    sun: ['M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z','M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4'],
    pillow: ['M4 8c0-2 1.5-3 3-3 1.5 0 3 .6 5 .6S15.5 5 17 5c1.5 0 3 1 3 3v8c0 2-1.5 3-3 3-1.5 0-3-.6-5-.6S8.5 19 7 19c-1.5 0-3-1-3-3V8z', 'M8 9.5c1.3.4 2.6.6 4 .6s2.7-.2 4-.6']
  };
  function Icon(p) {
    var size = p.size || 22;
    return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: p.name === 'stop' ? 'currentColor' : 'none', stroke: 'currentColor', strokeWidth: p.strokeWidth || 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true },
      (PATHS[p.name] || []).map(function (d, i) { return h('path', { key: i, d: d }); }));
  }

  function Button(p) {
    var variant = p.variant || 'primary';
    var block = p.block !== false;
    var rest = omit(p, ['variant', 'block', 'icon', 'children', 'className', 'href']);
    var props = Object.assign({ className: cx('dc-btn', 'dc-btn-' + variant, block && 'dc-btn-block', p.className) }, rest);
    var kids = [p.icon ? h(Icon, { key: 'i', name: p.icon, size: 20 }) : null, h('span', { key: 'l' }, p.children)];
    if (p.href) { props.href = p.href; return h('a', props, kids); }
    if (!props.type) props.type = 'button';
    return h('button', props, kids);
  }

  function IconButton(p) {
    var rest = omit(p, ['icon', 'label', 'accent', 'className', 'href']);
    var props = Object.assign({ className: cx('dc-icon-btn', p.accent && 'dc-icon-btn-accent', p.className), 'aria-label': p.label }, rest);
    var icon = h(Icon, { name: p.icon });
    if (p.href) { props.href = p.href; return h('a', props, icon); }
    props.type = 'button';
    return h('button', props, icon);
  }

  function Switch(p) {
    var st = R.useState(!!p.defaultChecked);
    var on = p.checked !== undefined ? !!p.checked : st[0];
    function toggle() {
      if (p.disabled) return;
      if (p.checked === undefined) st[1](!on);
      if (p.onChange) p.onChange(!on);
    }
    return h('button', { type: 'button', role: 'switch', className: cx('dc-switch', p.className), 'aria-checked': on, 'aria-label': p.label, 'aria-labelledby': p.labelledBy, disabled: p.disabled, onClick: toggle },
      h('span', { className: 'dc-switch-track' },
        h('span', { className: 'dc-switch-knob' }, on ? h(Icon, { name: 'check', size: 16, strokeWidth: 3 }) : null)));
  }

  function Chip(p) {
    var ic = p.iconEnd || p.icon;
    return h('span', { className: cx('dc-chip', 'dc-chip-' + (p.tone || 'primary')) }, p.children, ic ? h(Icon, { name: ic, size: 16 }) : null);
  }

  function ProgressRing(p) {
    var size = p.size || 96, stroke = p.stroke || Math.round(size / 12);
    var r = size / 2 - stroke / 2, c = 2 * Math.PI * r;
    var tone = p.tone || 'onDark';
    var frac = Math.max(0, Math.min(1, (p.value || 0) / (p.max || 1)));
    var bar = p.dashed
      ? h('circle', { cx: size / 2, cy: size / 2, r: r, fill: 'none', className: 'dc-ring-dash-' + tone, strokeWidth: stroke, strokeLinecap: 'round', strokeDasharray: '4 10', transform: 'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')' })
      : h('circle', { cx: size / 2, cy: size / 2, r: r, fill: 'none', className: 'dc-ring-bar-' + tone, strokeWidth: stroke, strokeLinecap: 'round', strokeDasharray: (frac * c).toFixed(1) + ' ' + c.toFixed(1), transform: 'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')' });
    var hasSub = !!p.sublabel;
    var core = null;
    if (p.icon && PATHS[p.icon]) {
      var s = size * 0.4, o = size / 2 - s / 2;
      core = h('g', null,
        h('circle', { cx: size / 2, cy: size / 2, r: r - stroke / 2 - Math.max(3, size * 0.05), className: 'dc-ring-core-' + tone }),
        h('g', { transform: 'translate(' + o + ' ' + o + ') scale(' + (s / 24) + ')', fill: 'none', className: 'dc-ring-icon-' + tone, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' },
          PATHS[p.icon].map(function (d, i) { return h('path', { key: i, d: d }); })));
    }
    return h('svg', { className: 'dc-ring', width: size, height: size, viewBox: '0 0 ' + size + ' ' + size, role: 'img', 'aria-label': p.ariaLabel || ((p.value || 0) + ' of ' + (p.max || 1)) },
      h('circle', { cx: size / 2, cy: size / 2, r: r, fill: 'none', className: 'dc-ring-track-' + tone, strokeWidth: stroke }),
      bar,
      core,
      p.label ? h('text', { x: size / 2, y: hasSub ? size / 2 - size * 0.09 : size / 2, textAnchor: 'middle', dominantBaseline: 'central', fontSize: Math.round(size * 0.21), className: 'dc-ring-label-' + tone }, p.label) : null,
      hasSub ? h('text', { x: size / 2, y: size / 2 + size * 0.15, textAnchor: 'middle', dominantBaseline: 'central', fontSize: Math.max(12, Math.round(size * 0.135)), fontWeight: 500, className: 'dc-ring-sub-' + tone }, p.sublabel) : null);
  }

  function DiaryCard(p) {
    var state = p.state || 'open';
    var slot = p.slot || 'Evening';
    var title = h('h2', { className: 'dc-diary-title' }, slot, h('br'), 'diary');
    if (state === 'submitted') {
      return h('section', { className: 'dc-diary dc-diary-done' },
        h('span', { className: 'dc-check-disc' }, h(Icon, { name: 'check', size: 24, strokeWidth: 3 })),
        h('h2', { className: 'dc-diary-title' }, 'Thank you, ' + (p.name || 'Maria') + '.', h('br'), 'See you tomorrow.'),
        h('div', { className: 'dc-diary-foot' },
          h('span', null, 'Editable until ' + (p.editableUntil || '7:30 pm tomorrow')),
          h('a', { href: p.reviewHref || '#review' }, 'Review')));
    }
    var ring, body = null, action = null, note = null;
    var slotIcon = slot === 'Morning' ? 'sun' : 'moon';
    function hm(t) { var q = String(t).split(':'); return q.length === 2 ? (+q[0]) + ' h ' + (+q[1]) + ' min' : String(t); }
    if (state === 'notOpen') {
      ring = h('span', { className: 'dc-diary-disc dc-diary-disc-waiting', role: 'img', 'aria-label': slot + ' diary, opens in ' + hm(p.opensIn || '1:48') }, h(Icon, { name: slotIcon, size: 44, strokeWidth: 1.8 }));
    } else if (state === 'inProgress') {
      var a = p.answered == null ? 3 : p.answered, t = p.total || 8;
      ring = h(ProgressRing, { value: a, max: t, label: a + '/' + t, sublabel: 'done', ariaLabel: a + ' of ' + t + ' questions answered' });
      action = h(Button, { variant: 'onDark', href: p.href, onClick: p.onStart }, 'Resume');
    } else {
      ring = h('span', { className: 'dc-diary-disc', role: 'img', 'aria-label': slot + ' diary' }, h(Icon, { name: slotIcon, size: 44, strokeWidth: 1.8 }));
      action = h(Button, { variant: 'onDark', href: p.href, onClick: p.onStart }, 'Start');
    }
    return h('section', { className: 'dc-diary' },
      h('div', { className: 'dc-diary-head' }, h('div', null, title, note), ring),
      body, action);
  }

  var MARK_WORD = { done: 'submitted', missed: 'missed', open: 'open', upcoming: 'upcoming' };
  function Mark(p) {
    if (p.kind === 'done') return h('span', { className: 'dc-mark' }, h(Icon, { name: 'check', size: 14, strokeWidth: 3.5 }));
    return h('span', { className: 'dc-mark dc-mark-' + p.kind });
  }
  var SAMPLE_DAYS = [
    { dow: 'Fri', day: 'Friday', num: 16, am: 'done', pm: 'done' },
    { dow: 'Sat', day: 'Saturday', num: 17, am: 'done', pm: 'missed' },
    { dow: 'Sun', day: 'Sunday', num: 18, am: 'done', pm: 'done' },
    { dow: 'Mon', day: 'Monday', num: 19, am: 'done', pm: 'open', today: true },
    { dow: 'Tue', day: 'Tuesday', num: 20, am: 'upcoming', pm: 'upcoming' },
    { dow: 'Wed', day: 'Wednesday', num: 21, am: 'upcoming', pm: 'upcoming' },
    { dow: 'Thu', day: 'Thursday', num: 22, am: 'upcoming', pm: 'upcoming' }
  ];
  function DateStrip(p) {
    var days = p.days || SAMPLE_DAYS;
    return h('div', { className: 'dc-strip' }, h('div', { className: 'dc-strip-inner' }, days.map(function (d, i) {
      var label = (d.today ? 'Today, ' : '') + (d.day || d.dow) + ' ' + d.num + ': morning ' + MARK_WORD[d.am] + ', evening ' + MARK_WORD[d.pm];
      return h('button', { key: i, type: 'button', className: cx('dc-day', d.today && 'dc-day-today'), 'aria-label': label, 'aria-current': d.today ? 'date' : undefined, onClick: p.onSelect ? function () { p.onSelect(d); } : undefined },
        h('span', { className: 'dc-day-dow' }, d.dow),
        h('span', { className: 'dc-day-num' }, d.num),
        h('span', { className: 'dc-marks' }, h(Mark, { kind: d.am }), h(Mark, { kind: d.pm })));
    })));
  }

  function QuestionHeader(p) {
    var cur = p.current || 1, tot = p.total || 8;
    return h('div', { className: 'dc-qhead' },
      h(IconButton, { icon: 'back', label: 'Back', onClick: p.onBack, href: p.backHref }),
      h('div', { className: 'dc-qhead-count' },
        h(ProgressRing, { size: 28, stroke: 4, value: cur, max: tot, tone: 'onLight', ariaLabel: 'Question ' + cur + ' of ' + tot }),
        h('span', { 'aria-hidden': true }, 'Question ' + cur + ' of ' + tot)),
      h(IconButton, { icon: 'mic', label: 'Speak your answer', accent: true, onClick: p.onMic }));
  }

  var PAIN_WORDS = ['Barely any', 'Very mild', 'Mild', 'Some', 'Moderate', 'Fairly strong', 'Quite a lot', 'Strong', 'Very strong', 'Worst pain'];
  function RatingSlider(p) {
    var min = p.min || 1, max = p.max || 10, n = max - min;
    var words = p.words || PAIN_WORDS;
    var st = R.useState(p.defaultValue == null ? null : p.defaultValue);
    var value = p.value !== undefined ? p.value : st[0];
    var trackRef = R.useRef(null);
    function set(v) {
      v = Math.max(min, Math.min(max, v));
      if (p.value === undefined) st[1](v);
      if (p.onChange) p.onChange(v);
    }
    function fromPointer(e) {
      var el = trackRef.current; if (!el) return;
      var rect = el.getBoundingClientRect(), half = 22;
      var x = (e.clientX - rect.left - half) / Math.max(1, rect.width - 2 * half);
      set(Math.round(min + Math.max(0, Math.min(1, x)) * n));
    }
    function pos(v) { var f = (v - min) / n; return 'calc(' + f + ' * (100% - var(--thumb)) + var(--thumb) / 2)'; }
    function onKey(e) {
      var cur = value == null ? min : value;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { set(cur + 1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { set(cur - 1); e.preventDefault(); }
      else if (e.key === 'Home') { set(min); e.preventDefault(); }
      else if (e.key === 'End') { set(max); e.preventDefault(); }
    }
    var nums = [];
    for (var v = min; v <= max; v++) nums.push(h('span', { key: v, className: cx('dc-slider-num', v === value && 'dc-slider-num-on'), style: { left: pos(v) } }, v));
    var word = value == null ? null : words[value - min];
    return h('div', { className: 'dc-slider' },
      h('div', { className: 'dc-slider-readout', 'aria-live': 'polite' },
        value == null ? h('span', { className: 'dc-slider-hint' }, 'Tap a number or slide to answer')
          : [h('span', { key: 'v', className: 'dc-slider-value' }, value), h('span', { key: 'w', className: 'dc-slider-word' }, word)]),
      h('div', { className: 'dc-slider-body' },
        h('button', { type: 'button', className: 'dc-icon-btn dc-slider-step', 'aria-label': 'Lower', onClick: function () { set((value == null ? min + 1 : value) - 1); } }, h(Icon, { name: 'minus' })),
        h('div', { className: 'dc-slider-scale' },
          h('div', {
            ref: trackRef, className: 'dc-slider-track', role: 'slider', tabIndex: 0,
            'aria-label': p.label || 'Pain right now', 'aria-valuemin': min, 'aria-valuemax': max,
            'aria-valuenow': value == null ? undefined : value, 'aria-valuetext': value == null ? 'Not answered' : value + ', ' + word,
            onKeyDown: onKey,
            onPointerDown: function (e) { if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId); fromPointer(e); },
            onPointerMove: function (e) { if (e.buttons) fromPointer(e); }
          },
            h('div', { className: 'dc-slider-rail' }),
            value == null ? null : h('div', { className: 'dc-slider-fill', style: { width: pos(value) } }),
            value == null ? null : h('div', { className: 'dc-slider-thumb', style: { left: 'calc(' + pos(value) + ' - var(--thumb) / 2)' } }, value)),
          h('div', { className: 'dc-slider-nums', 'aria-hidden': true }, nums),
          h('div', { className: 'dc-slider-anchors' }, h('span', null, min + ' · ' + (p.lowAnchor || 'No pain')), h('span', null, (p.highAnchor || 'Worst pain') + ' · ' + max))),
        h('button', { type: 'button', className: 'dc-icon-btn dc-slider-step', 'aria-label': 'Higher', onClick: function () { set((value == null ? min - 1 : value) + 1); } }, h(Icon, { name: 'plus' }))));
  }

  var DEFAULT_OPTIONS = ['Not at all', 'A little', 'Somewhat', 'Quite a bit', 'Extremely'];
  function OptionList(p) {
    var opts = p.options || DEFAULT_OPTIONS;
    var st = R.useState(p.defaultValue == null ? null : p.defaultValue);
    var value = p.value !== undefined ? p.value : st[0];
    function pick(i) {
      var next = value === i ? null : i;
      if (p.value === undefined) st[1](next);
      if (p.onChange) p.onChange(next);
    }
    return h('div', { className: 'dc-options', role: 'radiogroup', 'aria-label': p.label || 'Pick one' }, opts.map(function (o, i) {
      var n = i + 1, on = value === n, proposed = !on && p.proposed === n;
      return h('button', { key: n, type: 'button', role: 'radio', 'aria-checked': on, className: cx('dc-option', on && 'dc-option-on', proposed && 'dc-option-proposed'), onClick: function () { pick(n); } },
        h('span', { className: 'dc-option-badge' }, n),
        h('span', { className: 'dc-option-label' }, o),
        on ? h(Icon, { name: 'check', size: 22, strokeWidth: 3 }) : null);
    }));
  }

  var SAMPLE_WEEK = [['M', 1, 1], ['T', 1, 1], ['W', 1, 1], ['T', 1, 1], ['F', 1, 1], ['S', 1, 0], ['S', 1, 1]];
  function WeekGrid(p) {
    var week = p.week || SAMPLE_WEEK, done = 0;
    week.forEach(function (w) { done += (w[1] ? 1 : 0) + (w[2] ? 1 : 0); });
    var total = week.length * 2;
    return h('section', { className: 'dc-card' },
      h('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' } },
        h('h3', { className: 'dc-card-title' }, p.title || 'Last 7 days'),
        h('span', { className: 'dc-card-label' }, done + ' of ' + total + ' done')),
      h('div', { className: 'dc-week', role: 'img', 'aria-label': (p.title || 'Last 7 days') + ': ' + done + ' of ' + total + ' diaries done' }, week.map(function (w, i) {
        return h('div', { key: i, className: 'dc-week-day' },
          h('span', { className: cx('dc-week-am', !w[1] && 'dc-week-miss') }),
          h('span', { className: cx('dc-week-pm', !w[2] && 'dc-week-miss') }),
          h('span', { className: 'dc-week-letter' }, w[0]));
      })));
  }

  function UpNextCard(p) {
    return h('section', { className: 'dc-card', style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px' } },
        h('span', { style: { width: '48px', height: '48px', borderRadius: '999px', background: 'var(--canvas)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } }, h(Icon, { name: 'sunrise', size: 24 })),
        h('h3', { className: 'dc-card-title' }, p.title || 'Tomorrow’s morning diary')),
      h('div', { className: 'dc-divider', style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' } },
        h('span', { style: { fontSize: '18px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' } }, 'Opens ' + (p.opensAt || '7:00 am')),
        p.reminder === false ? h(Chip, { tone: 'neutral', iconEnd: 'bellOff' }, 'Reminder off') : h(Chip, { tone: 'primary', iconEnd: 'bell' }, 'Reminder on')));
  }

  function StudyProgressCard(p) {
    var day = p.day || 23, of = p.of || 84;
    return h('section', { className: 'dc-card' },
      h('div', { style: { display: 'flex', alignItems: 'baseline', gap: '8px' } },
        h('span', { className: 'dc-big' }, 'Day ' + day),
        h('span', { style: { fontSize: '18px', color: 'var(--ink-soft)' } }, 'of ' + of + ' in the ' + (p.study || 'SUNRISE Study'))),
      h('div', { className: 'dc-bar', role: 'img', 'aria-label': 'Day ' + day + ' of ' + of }, h('span', { style: { width: Math.round(day / of * 100) + '%' } })),
      h('div', { className: 'dc-bar-legend' }, h('span', null, 'Started ' + (p.started || 'Sep 27')), h('span', null, (of - day) + ' days to go')));
  }

  function CareTeamCard(p) {
    return h('section', { className: 'dc-card', style: { display: 'flex', flexDirection: 'column' } },
      h('h3', { className: 'dc-card-title' }, 'Questions about the study?'),
      h('p', { style: { margin: '6px 0 16px', fontSize: '15px', lineHeight: 1.4, color: 'var(--ink-soft)' } }, p.hours || 'Your study nurse is available weekdays, 9 am to 5 pm.'),
      p.phone ? h('p', { style: { margin: '0 0 12px', fontSize: '18px', fontWeight: 600, userSelect: 'all' } }, p.phone) : null,
      h(Button, { variant: 'outline', icon: 'phone', href: p.href, onClick: p.onCall }, 'Call your study nurse'));
  }

  function ObjectSlot(p) {
    var w = p.width || p.size || 72, hgt = p.height || p.size || 72;
    return h('div', { className: cx('dc-object', p.hideInEasy !== false && 'dc-object-hide-easy'), role: 'img', 'aria-label': 'Placeholder for 3D ' + (p.object || 'mug') + ', ' + w + ' by ' + hgt + ' pt', style: { width: w + 'px', height: hgt + 'px' } },
      h(Icon, { name: p.object || 'mug', size: Math.round(Math.min(w, hgt) * 0.42), strokeWidth: 1.6 }));
  }

  var api = { Button: Button, IconButton: IconButton, Chip: Chip, DiaryCard: DiaryCard, ProgressRing: ProgressRing, DateStrip: DateStrip, QuestionHeader: QuestionHeader, RatingSlider: RatingSlider, OptionList: OptionList, WeekGrid: WeekGrid, UpNextCard: UpNextCard, StudyProgressCard: StudyProgressCard, CareTeamCard: CareTeamCard, ObjectSlot: ObjectSlot, Switch: Switch, Icon: Icon };
  window.DribbleCollect = Object.assign(window.DribbleCollect || {}, api);
})();
