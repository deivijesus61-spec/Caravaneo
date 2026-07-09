/* === db.js === */
// localStorage persistence layer
const DB = {
  _key: k => 'cv4_' + k,
  get(key, fallback = null) {
    try { const v = localStorage.getItem(this._key(key)); return v !== null ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem(this._key(key), JSON.stringify(val)); return true; }
    catch { return false; }
  },
  del(key) { localStorage.removeItem(this._key(key)); },
  update(key, fn, fallback = null) {
    const val = this.get(key, fallback);
    const next = fn(val);
    this.set(key, next);
    return next;
  },
  clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith('cv4_'))
      .forEach(k => localStorage.removeItem(k));
  },
};


/* === icons.jsx === */
// SVG Icon system
function Icon({
  name,
  size = 20,
  color,
  className = '',
  style
}) {
  const paths = {
    home: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "9 22 9 12 15 12 15 22"
    })),
    search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "21",
      x2: "16.65",
      y2: "16.65"
    })),
    bell: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13.73 21a2 2 0 0 1-3.46 0"
    })),
    user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "7",
      r: "4"
    })),
    map: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
      points: "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "2",
      x2: "8",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      y1: "6",
      x2: "16",
      y2: "22"
    })),
    plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "5",
      x2: "12",
      y2: "19"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    })),
    chevron_right: /*#__PURE__*/React.createElement("polyline", {
      points: "9 18 15 12 9 6"
    }),
    chevron_left: /*#__PURE__*/React.createElement("polyline", {
      points: "15 18 9 12 15 6"
    }),
    chevron_down: /*#__PURE__*/React.createElement("polyline", {
      points: "6 9 12 15 18 9"
    }),
    chevron_up: /*#__PURE__*/React.createElement("polyline", {
      points: "18 15 12 9 6 15"
    }),
    x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "18",
      y1: "6",
      x2: "6",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "6",
      x2: "18",
      y2: "18"
    })),
    check: /*#__PURE__*/React.createElement("polyline", {
      points: "20 6 9 17 4 12"
    }),
    clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 6 12 12 16 14"
    })),
    calendar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "4",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      y1: "2",
      x2: "16",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "2",
      x2: "8",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "10",
      x2: "21",
      y2: "10"
    })),
    mappin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    })),
    navigation: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
      points: "3 11 22 2 13 21 11 13 3 11"
    })),
    camera: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "13",
      r: "4"
    })),
    watch: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "5",
      y: "2",
      width: "14",
      height: "20",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 2v2M15 2v2M9 20v2M15 20v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 10v2l1 1"
    })),
    zap: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
      points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
    })),
    flag: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "22",
      x2: "4",
      y2: "15"
    })),
    send: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "22",
      y1: "2",
      x2: "11",
      y2: "13"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "22 2 15 22 11 13 2 9 22 2"
    })),
    phone: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
    })),
    shield: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    })),
    share: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "5",
      r: "3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "6",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "19",
      r: "3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8.59",
      y1: "13.51",
      x2: "15.42",
      y2: "17.49"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "15.41",
      y1: "6.51",
      x2: "8.59",
      y2: "10.49"
    })),
    download: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "7 10 12 15 17 10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "15",
      x2: "12",
      y2: "3"
    })),
    edit: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
    })),
    settings: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
    })),
    info: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "16",
      x2: "12",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "8",
      x2: "12.01",
      y2: "8"
    })),
    log_out: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "16 17 21 12 16 7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "12",
      x2: "9",
      y2: "12"
    })),
    route: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "6",
      cy: "19",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "5",
      r: "3"
    })),
    pause: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "6",
      y: "4",
      width: "4",
      height: "16"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "4",
      width: "4",
      height: "16"
    })),
    play: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
      points: "5 3 19 12 5 21 5 3"
    })),
    stop: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2"
    })),
    heart: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
    })),
    activity: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
      points: "22 12 18 12 15 21 9 3 6 12 2 12"
    })),
    compass: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
    })),
    eye: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    })),
    eye_off: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "1",
      y1: "1",
      x2: "23",
      y2: "23"
    })),
    qr: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "14",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "14",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "5",
      y: "5",
      width: "3",
      height: "3"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "16",
      y: "5",
      width: "3",
      height: "3"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "16",
      y: "16",
      width: "3",
      height: "3"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "5",
      y: "16",
      width: "3",
      height: "3"
    })),
    people: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M23 21v-2a4 4 0 0 0-3-3.87"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 3.13a4 4 0 0 1 0 7.75"
    })),
    gpx: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 12h8M12 8v8"
    })),
    near_me: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
      points: "3 11 22 2 13 21 11 13 3 11"
    }))
  };
  const d = paths[name];
  if (!d) return null;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color || 'currentColor',
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: style
  }, d);
}

// App logo — fist with lightning bolt (SVG inline)
function BrandLogo({
  size = 40,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    className: className
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "fist-grad",
    cx: "50%",
    cy: "40%",
    r: "60%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#6ee7a0"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#16a34a"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "22",
    fill: "#0b130e"
  }), /*#__PURE__*/React.createElement("g", {
    fill: "url(#fist-grad)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "32",
    y: "42",
    width: "36",
    height: "8",
    rx: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "50",
    width: "40",
    height: "26",
    rx: "8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "34",
    y: "28",
    width: "9",
    height: "18",
    rx: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "45",
    y: "25",
    width: "9",
    height: "20",
    rx: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "56",
    y: "27",
    width: "8",
    height: "18",
    rx: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "56",
    width: "10",
    height: "14",
    rx: "5"
  })), /*#__PURE__*/React.createElement("polygon", {
    points: "58,18 48,36 56,36 46,58 62,36 54,36 66,18",
    fill: "#facc15",
    opacity: "0.9"
  }));
}

// Attend fist (with overlay indicator)
function AttendFist({
  size = 32,
  attending = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(BrandLogo, {
    size: size
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: -3,
      right: -3,
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: attending ? 'var(--accent)' : 'var(--bg3)',
      border: '2px solid var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 8,
      fontWeight: 800,
      color: attending ? '#0b130e' : 'var(--text3)'
    }
  }, attending ? '✓' : '?'));
}

/* === data.jsx === */
// ─── Haversine distance (km) ───────────────────────────────
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function routeDistance(points) {
  let d = 0;
  for (let i = 1; i < points.length; i++) d += haversine(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]);
  return d;
}

// ─── Real Bogotá routes (lat/lng) ─────────────────────────
const ROUTES = {
  centro: {
    id: 'centro',
    name: 'Centro Histórico',
    color: '#4ade80',
    startName: 'Plaza Bolívar',
    endName: 'Parque Nacional',
    emoji: '🏛️',
    points: [[4.5981, -74.0761],
    // Plaza Bolívar
    [4.6009, -74.0737],
    // Calle 10 / Carrera 8
    [4.6048, -74.0712],
    // La Candelaria alta
    [4.6091, -74.0693],
    // Carrera 7 / Calle 16
    [4.6140, -74.0678],
    // Parque Santander area
    [4.6192, -74.0666],
    // Carrera 7 / Calle 22
    [4.6248, -74.0661],
    // Museo Nacional
    [4.6333, -74.0675] // Parque Nacional
    ]
  },
  norte: {
    id: 'norte',
    name: 'Séptima Norte',
    color: '#60a5fa',
    startName: 'Parque Nacional',
    endName: 'Calle 100',
    emoji: '🏙️',
    points: [[4.6333, -74.0675],
    // Parque Nacional
    [4.6415, -74.0634],
    // Calle 53
    [4.6497, -74.0598],
    // Calle 63
    [4.6575, -74.0563],
    // Calle 72
    [4.6649, -74.0527],
    // Calle 82
    [4.6734, -74.0491],
    // Calle 92
    [4.6820, -74.0455] // Calle 100
    ]
  },
  universidades: {
    id: 'universidades',
    name: 'Ruta Universidades',
    color: '#a78bfa',
    startName: 'Ciudad Universitaria',
    endName: 'Plaza Bolívar',
    emoji: '🎓',
    points: [[4.6359, -74.0828],
    // UNAL - Ciudad Universitaria
    [4.6311, -74.0798],
    // Calle 45 / NQS
    [4.6260, -74.0770],
    // Calle 39
    [4.6205, -74.0740],
    // Calle 32
    [4.6158, -74.0715],
    // Calle 26 / Av. El Dorado
    [4.6102, -74.0692],
    // Calle 19
    [4.6048, -74.0721],
    // Calle 11
    [4.5981, -74.0761] // Plaza Bolívar
    ]
  }
};

// Pre-calculate distances
Object.values(ROUTES).forEach(r => {
  r.distanceKm = routeDistance(r.points);
  r.distanceStr = r.distanceKm.toFixed(1) + ' km';
  // Estimate walk duration (4.5 km/h average for group)
  const mins = Math.round(r.distanceKm / 4.5 * 60);
  r.durationStr = mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins} min`;
});

// ─── Users ────────────────────────────────────────────────
const USERS = {
  me: {
    id: 'me',
    name: 'Santiago Morales',
    handle: 'smorales',
    initials: 'SM',
    color: '#4ade80',
    bio: 'Activista · Bogotá',
    verified: true,
    followers: '2.4k',
    organized: 4,
    attended: 12,
    photoURL: null
  },
  lopez: {
    id: 'lopez',
    name: 'María López',
    handle: 'mlopez',
    initials: 'ML',
    color: '#f472b6',
    bio: 'Organizadora · Caravanas por la Paz',
    verified: false,
    followers: '890',
    organized: 8,
    attended: 20,
    photoURL: null
  },
  ramirez: {
    id: 'ramirez',
    name: 'Carlos Ramírez',
    handle: 'c.ramirez',
    initials: 'CR',
    color: '#60a5fa',
    bio: 'Estudiante · UNAL',
    verified: false,
    followers: '234',
    organized: 1,
    attended: 5,
    photoURL: null
  },
  torres: {
    id: 'torres',
    name: 'Valentina Torres',
    handle: 'vtorres',
    initials: 'VT',
    color: '#a78bfa',
    bio: 'Docente · U. Distrital',
    verified: true,
    followers: '5.1k',
    organized: 3,
    attended: 14,
    photoURL: null
  },
  herrera: {
    id: 'herrera',
    name: 'Juan Herrera',
    handle: 'jherrera',
    initials: 'JH',
    color: '#fb923c',
    bio: 'Periodista · Colombia',
    verified: true,
    followers: '12k',
    organized: 0,
    attended: 28,
    photoURL: null
  },
  rivera: {
    id: 'rivera',
    name: 'Ana Rivera',
    handle: 'arivera',
    initials: 'AR',
    color: '#ff6b9d',
    bio: 'Líder vecinal · Chapinero',
    verified: true,
    followers: '15.2k',
    organized: 6,
    attended: 30,
    photoURL: null
  },
  mendez: {
    id: 'mendez',
    name: 'Prof. Carlos Méndez',
    handle: 'profcmendez',
    initials: 'CM',
    color: '#fcd34d',
    bio: 'Constitucionalista · U. de los Andes',
    verified: true,
    followers: '8.7k',
    organized: 2,
    attended: 9,
    photoURL: null
  },
  luna: {
    id: 'luna',
    name: 'Valeria Luna',
    handle: 'vluna',
    initials: 'VL',
    color: '#34d399',
    bio: 'Ambientalista · Bogotá Verde',
    verified: true,
    followers: '22k',
    organized: 10,
    attended: 35,
    photoURL: null
  }
};

// ─── VIPs (notable public figures) ───────────────────────
const VIPS = {
  petro: {
    id: 'petro',
    name: 'Gustavo Petro',
    role: 'Presidente · Colombia',
    initials: 'GP',
    color: '#f59e0b',
    handle: '@petrogustavo'
  },
  garcia: {
    id: 'garcia',
    name: 'Elena García',
    role: 'Alcaldesa · Bogotá',
    initials: 'EG',
    color: '#ff4081',
    handle: '@egarciabogota'
  },
  santos: {
    id: 'santos',
    name: 'Roberto Santos',
    role: 'Líder sindical · CUT · 500k seguidores',
    initials: 'RS',
    color: '#69f0ae',
    handle: '@rsantoscut'
  },
  vargas: {
    id: 'vargas',
    name: 'Dra. Sofía Vargas',
    role: 'Constitucionalista · U. Nacional',
    initials: 'SV',
    color: '#ffd740',
    handle: '@sofiavargas_jus'
  },
  rodriguez: {
    id: 'rodriguez',
    name: 'Marco Rodríguez',
    role: 'Senador · Pacto Histórico',
    initials: 'MR',
    color: '#7986cb',
    handle: '@senadorrodriguez'
  },
  espinosa: {
    id: 'espinosa',
    name: 'Lucía Espinosa',
    role: 'Directora · Amnistía Internacional Colombia',
    initials: 'LE',
    color: '#4dd0e1',
    handle: '@luciaespinosa_ai'
  }
};

// ─── Default activities ────────────────────────────────────
function buildDefaultActivities() {
  return [{
    id: 'act1',
    title: 'Marcha por la Paz · Bogotá',
    type: 'caravana',
    routeId: 'centro',
    date: '2026-07-12',
    time: '09:00',
    organizer: 'lopez',
    attendees: ['me', 'lopez', 'ramirez', 'torres'],
    vips: ['garcia'],
    description: 'Marcha pacífica desde la Plaza Bolívar hasta el Parque Nacional. Todos bienvenidos, ambiente familiar.',
    visibility: 'public',
    status: 'upcoming',
    createdAt: Date.now() - 86400000 * 2
  }, {
    id: 'act2',
    title: 'Caravana Estudiantil UNAL',
    type: 'caravana',
    routeId: 'universidades',
    date: '2026-07-14',
    time: '10:30',
    organizer: 'ramirez',
    attendees: ['ramirez', 'torres', 'mendez'],
    vips: ['vargas'],
    description: 'Movilización estudiantil en defensa de la educación pública.',
    visibility: 'public',
    status: 'upcoming',
    createdAt: Date.now() - 86400000
  }, {
    id: 'act3',
    title: 'Vigilia Ambiental · Séptima',
    type: 'static',
    routeId: 'norte',
    date: '2026-07-10',
    time: '17:00',
    organizer: 'luna',
    attendees: ['luna', 'herrera', 'rivera', 'me', 'lopez'],
    vips: [],
    description: 'Vigilia por el río Bogotá y los humedales de la ciudad.',
    visibility: 'public',
    status: 'live',
    createdAt: Date.now() - 3600000
  }];
}

// ─── Notifications ──────────────────────────────────────
const DEFAULT_NOTIFICATIONS = [{
  id: 'n1',
  text: 'María López te invitó a "Marcha por la Paz · Bogotá"',
  time: 'Hace 2h',
  read: false,
  icon: 'flag'
}, {
  id: 'n2',
  text: 'Ana Rivera confirmó asistencia a tu evento',
  time: 'Hace 5h',
  read: false,
  icon: 'check'
}, {
  id: 'n3',
  text: '"Vigilia Ambiental · Séptima" está en curso ahora',
  time: 'Hace 1h',
  read: true,
  icon: 'zap'
}, {
  id: 'n4',
  text: 'Tu caravana del sábado tiene 24 confirmados',
  time: 'Ayer',
  read: true,
  icon: 'people'
}];

/* === components.jsx === */
const {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} = React;

// ─── Toast system ──────────────────────────────────────────
let _toastId = 0;
let _setToasts = null;
function toast(msg, type = 'default', duration = 3000) {
  if (!_setToasts) return;
  const id = ++_toastId;
  _setToasts(ts => [...ts, {
    id,
    msg,
    type
  }]);
  setTimeout(() => _setToasts(ts => ts.filter(t => t.id !== id)), duration);
}
function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    _setToasts = setToasts;
    return () => {
      _setToasts = null;
    };
  }, []);
  if (!toasts.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "toast-container"
  }, toasts.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: `toast ${t.type !== 'default' ? t.type : ''}`
  }, t.msg)));
}

// ─── Avatar ───────────────────────────────────────────────
function Avatar({
  user,
  size = 44,
  ring = false,
  onClick
}) {
  const u = typeof user === 'string' ? USERS[user] || VIPS[user] || {
    initials: '?',
    color: '#888'
  } : user;
  if (!u) return null;
  const style = {
    width: size,
    height: size,
    fontSize: size * 0.38,
    background: u.photoURL ? `center/cover url(${u.photoURL})` : `linear-gradient(135deg, ${u.color}, color-mix(in srgb, ${u.color} 55%, #000))`,
    color: '#0b130e',
    boxShadow: ring ? `0 0 0 2px var(--bg), 0 0 0 3.5px ${u.color}` : 'none',
    cursor: onClick ? 'pointer' : 'default'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "cv-avatar",
    style: style,
    onClick: onClick
  }, !u.photoURL && u.initials);
}

// ─── Verified badge ──────────────────────────────────────
function VerifiedBadge({
  size = 13
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 13 13",
    style: {
      flexShrink: 0,
      marginLeft: 3
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "6.5",
    cy: "6.5",
    r: "6.5",
    fill: "#60a5fa"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "3.5,6.5 5.5,8.5 9.5,4.5",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

// ─── Attendees strip ─────────────────────────────────────
function AttendeesStrip({
  attendees,
  max = 4,
  size = 30
}) {
  const shown = attendees.slice(0, max);
  const rest = attendees.length - shown.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-attendees"
  }, shown.map(id => /*#__PURE__*/React.createElement(Avatar, {
    key: id,
    user: id,
    size: size
  }))), rest > 0 && /*#__PURE__*/React.createElement("span", {
    className: "card-count"
  }, "+", rest));
}

// ─── Route thumbnail (canvas) ────────────────────────────
function RouteThumbnail({
  routeId,
  width = 64,
  height = 44
}) {
  const canvasRef = useRef(null);
  const route = ROUTES[routeId];
  useEffect(() => {
    if (!canvasRef.current || !route) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pts = route.points;
    if (pts.length < 2) return;
    const lats = pts.map(p => p[0]);
    const lngs = pts.map(p => p[1]);
    const minLat = Math.min(...lats),
      maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs),
      maxLng = Math.max(...lngs);
    const pad = 6;
    const W = width,
      H = height;
    const toX = lng => pad + (lng - minLng) / (maxLng - minLng || 1) * (W - pad * 2);
    const toY = lat => H - pad - (lat - minLat) / (maxLat - minLat || 1) * (H - pad * 2);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#182019';
    ctx.fillRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = 'rgba(74,222,128,0.08)';
    ctx.lineWidth = 0.5;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(W * i / 4, 0);
      ctx.lineTo(W * i / 4, H);
      ctx.stroke();
    }

    // Route line
    ctx.beginPath();
    ctx.moveTo(toX(pts[0][1]), toY(pts[0][0]));
    for (let i = 1; i < pts.length; i++) ctx.lineTo(toX(pts[i][1]), toY(pts[i][0]));
    ctx.strokeStyle = route.color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();

    // Start dot
    ctx.beginPath();
    ctx.arc(toX(pts[0][1]), toY(pts[0][0]), 3, 0, Math.PI * 2);
    ctx.fillStyle = route.color;
    ctx.fill();

    // End dot
    const last = pts[pts.length - 1];
    ctx.beginPath();
    ctx.arc(toX(last[1]), toY(last[0]), 3, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fill();
  }, [routeId]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: width,
    height: height,
    style: {
      width: width + 'px',
      height: height + 'px',
      borderRadius: 6
    }
  });
}

// ─── Activity card ───────────────────────────────────────
function ActivityCard({
  activity,
  onPress
}) {
  const route = ROUTES[activity.routeId];
  const now = new Date();
  const actDate = new Date(activity.date + 'T' + activity.time);
  const isLive = activity.status === 'live';
  const isPast = actDate < now && !isLive;
  return /*#__PURE__*/React.createElement("div", {
    className: "activity-card",
    onClick: () => onPress(activity)
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-map"
  }, /*#__PURE__*/React.createElement(RouteThumbnail, {
    routeId: activity.routeId,
    width: 320,
    height: 140
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-map-overlay"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 10,
      left: 12,
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `card-tag ${isLive ? 'tag-live' : activity.type === 'caravana' ? 'tag-caravana' : 'tag-static'}`
  }, isLive ? '● EN VIVO' : activity.type === 'caravana' ? 'Caravana' : 'Estática'), activity.visibility === 'private' && /*#__PURE__*/React.createElement("span", {
    className: "card-tag",
    style: {
      background: 'rgba(0,0,0,.5)',
      color: 'var(--text2)'
    }
  }, "Privada"))), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, activity.title), /*#__PURE__*/React.createElement("div", {
    className: "card-meta"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text2)',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 13
  }), " ", activity.date, " · ", activity.time), route && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text2)',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mappin",
    size: 13
  }), " ", route.startName))), /*#__PURE__*/React.createElement("div", {
    className: "card-footer"
  }, /*#__PURE__*/React.createElement(AttendeesStrip, {
    attendees: activity.attendees,
    max: 3
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text2)'
    }
  }, activity.attendees.length, " asistentes"), route && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text3)',
      marginLeft: 8
    }
  }, route.distanceStr)));
}

// ─── Screen wrapper ──────────────────────────────────────
function Screen({
  children,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `screen ${className}`
  }, children);
}

// ─── Top bar ─────────────────────────────────────────────
function TopBar({
  title,
  onBack,
  actions,
  transparent
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "topbar",
    style: transparent ? {
      background: 'transparent',
      borderColor: 'transparent'
    } : {}
  }, onBack && /*#__PURE__*/React.createElement("button", {
    className: "topbar-back",
    onClick: onBack
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_left",
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    className: "topbar-title"
  }, title), actions);
}

// ─── Bottom navigation ────────────────────────────────────
function BottomNav({
  tab,
  setTab,
  notifCount = 0
}) {
  const items = [{
    id: 'home',
    label: 'Inicio',
    icon: 'home'
  }, {
    id: 'explore',
    label: 'Explorar',
    icon: 'compass'
  }, {
    id: 'notifs',
    label: 'Alertas',
    icon: 'bell'
  }, {
    id: 'profile',
    label: 'Perfil',
    icon: 'user'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "bottom-nav"
  }, items.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    className: `nav-item ${tab === item.id ? 'active' : ''}`,
    onClick: () => setTab(item.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: item.icon,
    size: 22
  }), /*#__PURE__*/React.createElement("span", null, item.label), item.id === 'notifs' && notifCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "nav-badge"
  }, notifCount))));
}

// ─── Sheet (bottom drawer) ───────────────────────────────
function Sheet({
  children,
  onClose,
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sheet-backdrop",
    onClick: e => e.target === e.currentTarget && onClose()
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-handle"
  }), title && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 17
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    className: "topbar-action",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 20
  }))), children));
}

/* === maps.jsx === */
// Leaflet map components — requires window.L (Leaflet loaded via CDN)

// ─── Leaflet full map ─────────────────────────────────────
function LeafletMap({
  id,
  center,
  zoom = 14,
  routes = [],
  puck,
  style = {},
  onMapReady
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layersRef = useRef({});
  const theme = document.documentElement.getAttribute('data-theme') || 'noche';

  // Tile URLs
  const tileUrl = theme === 'dia' ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  useEffect(() => {
    if (!containerRef.current || mapRef.current || !window.L) return;
    const map = window.L.map(containerRef.current, {
      center: center || [4.6097, -74.0817],
      zoom,
      zoomControl: false,
      attributionControl: false
    });
    window.L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Custom zoom control (bottom right)
    window.L.control.zoom({
      position: 'bottomright'
    }).addTo(map);
    mapRef.current = map;
    if (onMapReady) onMapReady(map);
    return () => {
      map.remove();
      mapRef.current = null;
      layersRef.current = {};
    };
  }, []);

  // Update routes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.L) return;

    // Remove old route layers
    ['route', 'start', 'end'].forEach(k => {
      Object.keys(layersRef.current).forEach(key => {
        if (key.startsWith(k + '_')) {
          layersRef.current[key].remove();
          delete layersRef.current[key];
        }
      });
    });
    const allPoints = [];
    routes.forEach((route, i) => {
      if (!route.points || route.points.length < 2) return;

      // Route shadow
      const shadow = window.L.polyline(route.points, {
        color: '#000',
        weight: 6,
        opacity: 0.3
      }).addTo(map);
      layersRef.current[`route_shadow_${i}`] = shadow;

      // Route line
      const line = window.L.polyline(route.points, {
        color: route.color || '#4ade80',
        weight: 4,
        opacity: 0.95,
        lineJoin: 'round',
        lineCap: 'round'
      }).addTo(map);
      layersRef.current[`route_${i}`] = line;

      // Start marker
      const startIcon = window.L.divIcon({
        html: '<div class="map-marker start"></div>',
        className: '',
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
      const startMarker = window.L.marker(route.points[0], {
        icon: startIcon
      }).addTo(map);
      layersRef.current[`start_${i}`] = startMarker;

      // End marker
      const endIcon = window.L.divIcon({
        html: '<div class="map-marker end"></div>',
        className: '',
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
      const endMarker = window.L.marker(route.points[route.points.length - 1], {
        icon: endIcon
      }).addTo(map);
      layersRef.current[`end_${i}`] = endMarker;
      allPoints.push(...route.points);
    });

    // Fit bounds to all routes
    if (allPoints.length > 0) {
      map.fitBounds(allPoints, {
        padding: [24, 24],
        maxZoom: 15
      });
    }
  }, [JSON.stringify(routes)]);

  // Update GPS puck
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.L) return;
    if (layersRef.current.puck) {
      layersRef.current.puck.setLatLng(puck || [0, 0]);
      if (!puck) {
        layersRef.current.puck.remove();
        delete layersRef.current.puck;
      }
    } else if (puck) {
      const puckIcon = window.L.divIcon({
        html: '<div class="map-puck"></div>',
        className: '',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      layersRef.current.puck = window.L.marker(puck, {
        icon: puckIcon,
        zIndexOffset: 1000
      }).addTo(map);
    }
    if (puck) map.panTo(puck, {
      animate: true,
      duration: 0.5
    });
  }, [puck ? puck[0] + ',' + puck[1] : null]);
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    id: id,
    style: {
      width: '100%',
      height: '100%',
      ...style
    }
  });
}

// ─── Route card map (small preview) ──────────────────────
function RouteCardMap({
  routeId,
  height = 140
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const route = ROUTES[routeId];
  useEffect(() => {
    if (!containerRef.current || mapRef.current || !window.L || !route) return;
    const center = route.points[Math.floor(route.points.length / 2)];
    const map = window.L.map(containerRef.current, {
      center,
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false
    });
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);
    window.L.polyline(route.points, {
      color: route.color,
      weight: 3,
      opacity: 0.9
    }).addTo(map);
    map.fitBounds(route.points, {
      padding: [16, 16],
      animate: false
    });
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [routeId]);
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    style: {
      width: '100%',
      height,
      background: 'var(--bg3)'
    }
  });
}

/* === screens-home.jsx === */
// ─── Home screen ──────────────────────────────────────────
function HomeScreen({
  app
}) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    let list = app.activities;
    if (filter === 'live') list = list.filter(a => a.status === 'live');else if (filter === 'upcoming') list = list.filter(a => a.status === 'upcoming');else if (filter === 'mine') list = list.filter(a => a.attendees.includes('me') || a.organizer === 'me');
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(a => a.title.toLowerCase().includes(q) || (ROUTES[a.routeId]?.name || '').toLowerCase().includes(q));
    }
    return list;
  }, [app.activities, filter, search]);
  const liveCount = app.activities.filter(a => a.status === 'live').length;
  return /*#__PURE__*/React.createElement(Screen, null, /*#__PURE__*/React.createElement("div", {
    className: "screen-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-hero"
  }, /*#__PURE__*/React.createElement(BrandLogo, {
    size: 38
  }), /*#__PURE__*/React.createElement("div", {
    className: "home-greeting"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-greeting-top"
  }, "Buenos días"), /*#__PURE__*/React.createElement("div", {
    className: "home-greeting-name"
  }, USERS.me.name.split(' ')[0])), /*#__PURE__*/React.createElement("button", {
    className: "topbar-action",
    onClick: () => app.push('settings')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 22
  }))), /*#__PURE__*/React.createElement("div", {
    className: "search-bar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    color: "var(--text3)"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Buscar caravanas...",
    value: search,
    onChange: e => setSearch(e.target.value)
  }), search && /*#__PURE__*/React.createElement("button", {
    onClick: () => setSearch('')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16,
    color: "var(--text3)"
  }))), liveCount > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 16px 16px',
      background: 'linear-gradient(90deg, #3d1a1a, #1a1a3d)',
      border: '1px solid var(--red)',
      borderRadius: 12,
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      cursor: 'pointer'
    },
    onClick: () => setFilter('live')
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--red)',
      animation: 'blink 1s infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--red)',
      fontSize: 14
    }
  }, liveCount, " caravana", liveCount > 1 ? 's' : '', " en curso ahora"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 16,
    color: "var(--red)",
    style: {
      marginLeft: 'auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '0 16px 16px',
      overflowX: 'auto'
    }
  }, [{
    id: 'all',
    label: 'Todas'
  }, {
    id: 'live',
    label: '● En vivo'
  }, {
    id: 'upcoming',
    label: 'Próximas'
  }, {
    id: 'mine',
    label: 'Mis eventos'
  }].map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    onClick: () => setFilter(f.id),
    style: {
      flexShrink: 0,
      padding: '7px 14px',
      borderRadius: 20,
      fontSize: 13,
      fontWeight: 600,
      background: filter === f.id ? 'var(--accent)' : 'var(--bg3)',
      color: filter === f.id ? '#0b130e' : 'var(--text2)',
      border: '1px solid',
      borderColor: filter === f.id ? 'var(--accent)' : 'var(--border)',
      whiteSpace: 'nowrap'
    }
  }, f.label))), filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '40px 20px',
      color: 'var(--text3)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "compass",
    size: 40,
    color: "var(--text3)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 15
    }
  }, search ? 'Sin resultados' : 'No hay actividades en este filtro')) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: '0 16px 100px'
    }
  }, filtered.map(a => /*#__PURE__*/React.createElement(ActivityCard, {
    key: a.id,
    activity: a,
    onPress: () => app.push('detail', {
      id: a.id
    })
  })))), /*#__PURE__*/React.createElement("button", {
    className: "fab",
    onClick: () => app.push('create')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 26
  })));
}

// ─── Explore screen ───────────────────────────────────────
function ExploreScreen({
  app
}) {
  return /*#__PURE__*/React.createElement(Screen, null, /*#__PURE__*/React.createElement(TopBar, {
    title: "Explorar rutas"
  }), /*#__PURE__*/React.createElement("div", {
    className: "screen-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 8px',
      color: 'var(--text2)',
      fontSize: 13
    }
  }, "Rutas disponibles en Bogotá"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }
  }, Object.values(ROUTES).map(route => /*#__PURE__*/React.createElement("div", {
    key: route.id,
    className: "row-item",
    style: {
      margin: '0 12px',
      borderRadius: 12,
      border: '1px solid var(--border)',
      marginBottom: 12,
      padding: 0,
      overflow: 'hidden',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 100,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(RouteCardMap, {
    routeId: route.id,
    height: 100
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, transparent 40%, rgba(11,19,14,.85) 100%)',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '10px 14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--text)'
    }
  }, route.emoji, " ", route.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: 'var(--text2)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "route",
    size: 14
  }), route.distanceStr), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: 'var(--text2)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), route.durationStr), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: 'var(--text2)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mappin",
    size: 14
  }), route.startName))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 80
    }
  })));
}

// ─── Notifications screen ──────────────────────────────────
function NotificationsScreen({
  app
}) {
  const [notifs, setNotifs] = useState(() => DB.get('notifs', DEFAULT_NOTIFICATIONS));
  const markAllRead = () => {
    const updated = notifs.map(n => ({
      ...n,
      read: true
    }));
    setNotifs(updated);
    DB.set('notifs', updated);
  };
  const unreadCount = notifs.filter(n => !n.read).length;
  return /*#__PURE__*/React.createElement(Screen, null, /*#__PURE__*/React.createElement(TopBar, {
    title: "Notificaciones",
    actions: unreadCount > 0 ? /*#__PURE__*/React.createElement("button", {
      className: "topbar-action",
      onClick: markAllRead,
      style: {
        color: 'var(--accent)',
        fontSize: 13,
        fontWeight: 600,
        width: 'auto',
        padding: '0 8px'
      }
    }, "Leídas") : null
  }), /*#__PURE__*/React.createElement("div", {
    className: "screen-scroll"
  }, notifs.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '60px 20px',
      color: 'var(--text3)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, "Sin notificaciones")) : notifs.map(n => /*#__PURE__*/React.createElement("div", {
    key: n.id,
    className: `notif-item ${!n.read ? 'unread' : ''}`,
    onClick: () => {
      setNotifs(prev => prev.map(x => x.id === n.id ? {
        ...x,
        read: true
      } : x));
      DB.set('notifs', notifs.map(x => x.id === n.id ? {
        ...x,
        read: true
      } : x));
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: '50%',
      flexShrink: 0,
      background: 'var(--bg3)',
      border: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--accent)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n.icon || 'bell',
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "notif-text"
  }, n.text), /*#__PURE__*/React.createElement("div", {
    className: "notif-time"
  }, n.time)), !n.read && /*#__PURE__*/React.createElement("div", {
    className: "notif-dot"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 80
    }
  })));
}

/* === screens-register.jsx === */
// ─── VIP Invite section ───────────────────────────────────
function VipInviteSection({
  invites,
  setInvites
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  // Unified catalog of VIPs and verified users
  const catalog = useMemo(() => [...Object.entries(VIPS).map(([k, v]) => ({
    key: k,
    ...v,
    type: 'vip'
  })), ...Object.entries(USERS).filter(([k, u]) => u.verified && k !== 'me').map(([k, u]) => ({
    key: k,
    name: u.name,
    role: u.bio,
    initials: u.initials,
    color: u.color,
    handle: '@' + u.handle,
    type: 'user'
  }))], []);
  const results = useMemo(() => {
    if (!query.trim()) return catalog.slice(0, 8);
    const q = query.toLowerCase();
    return catalog.filter(p => p.name.toLowerCase().includes(q) || (p.role || '').toLowerCase().includes(q) || (p.handle || '').toLowerCase().includes(q)).slice(0, 10);
  }, [query]);
  const alreadyAdded = key => invites.some(i => i.key === key);
  const addInvite = person => {
    if (alreadyAdded(person.key)) return;
    setInvites(prev => [...prev, {
      ...person,
      status: 'invited'
    }]);
    setQuery('');
    toast(`Invitación enviada a ${person.name.split(' ')[0]}`);
  };
  const removeInvite = key => setInvites(prev => prev.filter(i => i.key !== key));
  return /*#__PURE__*/React.createElement("div", null, invites.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, invites.map(inv => /*#__PURE__*/React.createElement("div", {
    key: inv.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px',
      background: 'var(--bg3)',
      borderRadius: 10,
      marginBottom: 6,
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    user: {
      ...inv,
      initials: inv.initials,
      color: inv.color
    },
    size: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text)'
    }
  }, inv.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text2)',
      marginTop: 1
    }
  }, inv.role || inv.handle)), /*#__PURE__*/React.createElement("div", {
    className: `vip-status ${inv.status}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: inv.status === 'confirmed' ? 'check' : 'clock',
    size: 12
  }), inv.status === 'confirmed' ? 'Confirmado' : 'Invitado'), /*#__PURE__*/React.createElement("button", {
    onClick: () => removeInvite(inv.key),
    style: {
      color: 'var(--text3)',
      marginLeft: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "search-bar",
    style: {
      margin: 0,
      borderColor: open ? 'var(--accent)' : 'var(--border)'
    },
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    color: "var(--text3)"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Buscar personalidades o cuentas verificadas...",
    value: query,
    onChange: e => {
      setQuery(e.target.value);
      setOpen(true);
    },
    onFocus: () => setOpen(true)
  }), query && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setQuery('');
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16,
    color: "var(--text3)"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface)',
      border: '1.5px solid var(--border)',
      borderRadius: 10,
      marginTop: 4,
      overflow: 'hidden',
      boxShadow: 'var(--shadow)'
    }
  }, results.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px',
      textAlign: 'center',
      color: 'var(--text3)',
      fontSize: 13
    }
  }, "Sin resultados") : results.map(person => {
    const added = alreadyAdded(person.key);
    return /*#__PURE__*/React.createElement("div", {
      key: person.key,
      className: "row-item",
      style: {
        opacity: added ? 0.5 : 1
      },
      onClick: () => !added && addInvite(person)
    }, /*#__PURE__*/React.createElement(Avatar, {
      user: {
        initials: person.initials,
        color: person.color,
        photoURL: USERS[person.key]?.photoURL
      },
      size: 38
    }), /*#__PURE__*/React.createElement("div", {
      className: "row-item-info"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "row-item-name"
    }, person.name), person.type === 'vip' && /*#__PURE__*/React.createElement(Icon, {
      name: "shield",
      size: 13,
      color: "var(--yellow)"
    }), person.type === 'user' && /*#__PURE__*/React.createElement(VerifiedBadge, null)), /*#__PURE__*/React.createElement("div", {
      className: "row-item-sub"
    }, person.role || person.handle)), /*#__PURE__*/React.createElement("div", {
      style: {
        flexShrink: 0
      }
    }, added ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16,
      color: "var(--accent)"
    }) : /*#__PURE__*/React.createElement("div", {
      className: "btn btn-sm",
      style: {
        background: 'var(--accent-dim)',
        color: 'var(--accent)',
        padding: '5px 12px',
        fontSize: 12
      }
    }, "Invitar")));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 16px',
      textAlign: 'center',
      fontSize: 12,
      color: 'var(--text3)',
      borderTop: '1px solid var(--border)',
      cursor: 'pointer'
    },
    onClick: () => setOpen(false)
  }, "Cerrar")));
}

// ─── Create Activity screen ────────────────────────────────
function CreateScreen({
  app
}) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('caravana');
  const [routeId, setRouteId] = useState('centro');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [desc, setDesc] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [vipInvites, setVipInvites] = useState([]);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
    setTime('10:00');
  }, []);
  const canProceed1 = title.trim().length >= 3;
  const canSave = title && date && time;
  const handleCreate = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    const newActivity = {
      id: 'act_' + Date.now(),
      title: title.trim(),
      type,
      routeId,
      date,
      time,
      organizer: 'me',
      attendees: ['me'],
      vips: vipInvites.map(v => v.key),
      description: desc.trim(),
      visibility,
      status: 'upcoming',
      createdAt: Date.now()
    };
    app.createActivity(newActivity);
    toast('Caravana creada', 'success');
    setTimeout(() => app.replace('detail', {
      id: newActivity.id
    }), 300);
  };
  return /*#__PURE__*/React.createElement(Screen, null, /*#__PURE__*/React.createElement(TopBar, {
    title: step === 1 ? 'Nueva actividad' : step === 2 ? 'Ruta y detalles' : 'Invitados VIP',
    onBack: () => step > 1 ? setStep(s => s - 1) : app.pop(),
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text3)'
      }
    }, step, "/3")
  }), /*#__PURE__*/React.createElement("div", {
    className: "screen-scroll",
    style: {
      padding: '8px 0 24px'
    }
  }, step === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: '16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-label"
  }, "Tipo de actividad"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, [{
    id: 'caravana',
    label: '🚶 Caravana',
    sub: 'Marcha en movimiento'
  }, {
    id: 'static',
    label: '📍 Estática',
    sub: 'Concentración fija'
  }].map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setType(t.id),
    style: {
      flex: 1,
      padding: '14px 12px',
      borderRadius: 12,
      background: type === t.id ? 'var(--accent-dim)' : 'var(--bg3)',
      border: `1.5px solid ${type === t.id ? 'var(--accent)' : 'var(--border)'}`,
      color: type === t.id ? 'var(--accent)' : 'var(--text2)',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      marginTop: 3,
      opacity: 0.8
    }
  }, t.sub))))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-label"
  }, "Nombre del evento *"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    placeholder: "Ej: Marcha por la Paz · Bogotá",
    value: title,
    onChange: e => setTitle(e.target.value),
    maxLength: 80
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text3)',
      textAlign: 'right'
    }
  }, title.length, "/80")), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-label"
  }, "Descripción"), /*#__PURE__*/React.createElement("textarea", {
    className: "input",
    placeholder: "Describe el propósito de la actividad...",
    value: desc,
    onChange: e => setDesc(e.target.value),
    rows: 3,
    maxLength: 280
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-label"
  }, "Fecha *"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "date",
    value: date,
    onChange: e => setDate(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-label"
  }, "Hora *"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "time",
    value: time,
    onChange: e => setTime(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-label"
  }, "Visibilidad"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, [{
    id: 'public',
    label: '🌍 Pública'
  }, {
    id: 'private',
    label: '🔒 Privada'
  }].map(v => /*#__PURE__*/React.createElement("button", {
    key: v.id,
    onClick: () => setVisibility(v.id),
    style: {
      flex: 1,
      padding: '11px 12px',
      borderRadius: 10,
      background: visibility === v.id ? 'var(--accent-dim)' : 'var(--bg3)',
      border: `1.5px solid ${visibility === v.id ? 'var(--accent)' : 'var(--border)'}`,
      color: visibility === v.id ? 'var(--accent)' : 'var(--text)',
      fontWeight: 600,
      fontSize: 14
    }
  }, v.label)))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-full",
    onClick: () => setStep(2),
    disabled: !canProceed1,
    style: {
      opacity: canProceed1 ? 1 : 0.4
    }
  }, "Siguiente")), step === 2 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Selecciona la ruta"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, Object.values(ROUTES).map(route => /*#__PURE__*/React.createElement("div", {
    key: route.id,
    className: `route-option ${routeId === route.id ? 'selected' : ''}`,
    onClick: () => setRouteId(route.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "route-thumb"
  }, /*#__PURE__*/React.createElement(RouteThumbnail, {
    routeId: route.id,
    width: 64,
    height: 44
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--text)'
    }
  }, route.emoji, " ", route.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text2)',
      marginTop: 3
    }
  }, route.startName, " → ", route.endName), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text3)'
    }
  }, "📏 ", route.distanceStr), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text3)'
    }
  }, "⏱ ", route.durationStr))), routeId === route.id && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20,
    color: "var(--accent)"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 16px 16px',
      height: 180,
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(RouteCardMap, {
    routeId: routeId,
    height: 180
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-full",
    onClick: () => setStep(3)
  }, "Continuar"))), step === 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16,
      color: 'var(--text2)',
      fontSize: 14,
      lineHeight: 1.5
    }
  }, "Invita a personalidades públicas o cuentas verificadas que confirmarán asistencia."), /*#__PURE__*/React.createElement(VipInviteSection, {
    invites: vipInvites,
    setInvites: setVipInvites
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-full",
    onClick: handleCreate,
    disabled: !canSave || saving,
    style: {
      opacity: canSave ? 1 : 0.5
    }
  }, saving ? 'Creando...' : vipInvites.length > 0 ? `Publicar y enviar ${vipInvites.length} invitación${vipInvites.length > 1 ? 'es' : ''}` : 'Publicar caravana'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-full",
    style: {
      marginTop: 10
    },
    onClick: handleCreate,
    disabled: !canSave || saving
  }, "Publicar sin invitados")))));
}

/* === screens-detail.jsx === */
// ─── Activity detail screen ───────────────────────────────
function DetailScreen({
  app,
  activityId
}) {
  const activity = app.activities.find(a => a.id === activityId);
  const [attending, setAttending] = useState(false);
  const [showShare, setShowShare] = useState(false);
  useEffect(() => {
    if (activity) setAttending(activity.attendees.includes('me'));
  }, [activityId]);
  if (!activity) {
    return /*#__PURE__*/React.createElement(Screen, null, /*#__PURE__*/React.createElement(TopBar, {
      title: "Actividad",
      onBack: () => app.pop()
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 40,
        textAlign: 'center',
        color: 'var(--text3)'
      }
    }, "No encontrada"));
  }
  const route = ROUTES[activity.routeId];
  const organizer = USERS[activity.organizer];
  const isOrganizer = activity.organizer === 'me';
  const isLive = activity.status === 'live';
  const toggleAttend = () => {
    const newState = !attending;
    setAttending(newState);
    app.updateActivity(activity.id, a => ({
      ...a,
      attendees: newState ? [...a.attendees.filter(x => x !== 'me'), 'me'] : a.attendees.filter(x => x !== 'me')
    }));
    toast(newState ? '¡Te has unido!' : 'Saliste del evento', newState ? 'success' : 'default');
  };
  const startLive = () => {
    app.updateActivity(activity.id, a => ({
      ...a,
      status: 'live'
    }));
    app.push('live-track', {
      activityId: activity.id
    });
  };
  const shareActivity = async () => {
    const text = `${activity.title} - ${activity.date} a las ${activity.time}\n${route?.startName || ''} → ${route?.endName || ''}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: activity.title,
          text
        });
      } catch (e) {
        if (e.name !== 'AbortError') toast('No se pudo compartir');
      }
    } else {
      navigator.clipboard?.writeText(text);
      toast('Copiado al portapapeles');
    }
  };
  return /*#__PURE__*/React.createElement(Screen, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-map"
  }, /*#__PURE__*/React.createElement(LeafletMap, {
    id: `map-detail-${activity.id}`,
    routes: route ? [route] : [],
    zoom: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      padding: 'calc(var(--safe-top) + 8px) 8px 8px',
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "topbar-back",
    style: {
      background: 'rgba(11,19,14,.8)',
      backdropFilter: 'blur(8px)'
    },
    onClick: () => app.pop()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_left",
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "topbar-action",
    style: {
      background: 'rgba(11,19,14,.8)',
      backdropFilter: 'blur(8px)'
    },
    onClick: shareActivity
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share",
    size: 20
  }))), isLive && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 12,
      right: 12,
      background: 'var(--red)',
      color: '#fff',
      fontSize: 11,
      fontWeight: 800,
      padding: '4px 10px',
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: '#fff',
      animation: 'blink 1s infinite'
    }
  }), "EN VIVO")), /*#__PURE__*/React.createElement("div", {
    className: "screen-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: `detail-type-badge ${activity.type === 'caravana' ? 'tag-caravana' : 'tag-static'}`
  }, activity.type === 'caravana' ? '🚶 Caravana' : '📍 Estática'), /*#__PURE__*/React.createElement("div", {
    className: "detail-title"
  }, activity.title), /*#__PURE__*/React.createElement("div", {
    className: "detail-sub"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 14
  }), activity.date, " · ", activity.time, route && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--border)'
    }
  }, "·"), /*#__PURE__*/React.createElement(Icon, {
    name: "route",
    size: 14
  }), route.distanceStr))), /*#__PURE__*/React.createElement("div", {
    className: "detail-organizer"
  }, /*#__PURE__*/React.createElement(Avatar, {
    user: organizer,
    size: 38,
    ring: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text2)'
    }
  }, "Organizador"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, organizer?.name, organizer?.verified && /*#__PURE__*/React.createElement(VerifiedBadge, null))), isLive ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm",
    style: {
      background: 'var(--red)',
      color: '#fff'
    },
    onClick: () => app.push('live-track', {
      activityId: activity.id
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "navigation",
    size: 14
  }), "Ver en vivo") : (isOrganizer || attending) && activity.status === 'upcoming' ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm",
    style: {
      background: 'var(--accent)',
      color: '#0b130e'
    },
    onClick: startLive
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 14
  }), "Iniciar") : null), activity.description && /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Descripción"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text)',
      lineHeight: 1.6
    }
  }, activity.description)), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), route && /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Ruta · ", route.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: 'var(--bg3)',
      borderRadius: 10,
      padding: '12px',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text3)',
      marginBottom: 4
    }
  }, "INICIO"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, route.startName)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: 'var(--bg3)',
      borderRadius: 10,
      padding: '12px',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text3)',
      marginBottom: 4
    }
  }, "FIN"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, route.endName))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `https://www.google.com/maps/dir/?api=1&destination=${route.points[0][0]},${route.points[0][1]}&travelmode=walking`,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-secondary btn-sm",
    style: {
      flex: 1,
      textDecoration: 'none',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mappin",
    size: 14
  }), "Google Maps"), /*#__PURE__*/React.createElement("a", {
    href: `https://ul.waze.com/ul?ll=${route.points[0][0]},${route.points[0][1]}&navigate=yes`,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-secondary btn-sm",
    style: {
      flex: 1,
      textDecoration: 'none',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "navigation",
    size: 14
  }), "Waze"))), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), activity.vips && activity.vips.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Personalidades invitadas"), activity.vips.map(vipKey => {
    const vip = VIPS[vipKey];
    if (!vip) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: vipKey,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      user: vip,
      size: 40,
      ring: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, vip.name, /*#__PURE__*/React.createElement(Icon, {
      name: "shield",
      size: 13,
      color: "var(--yellow)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text2)',
        marginTop: 2
      }
    }, vip.role)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--accent)',
        fontWeight: 700,
        background: 'var(--accent-dim)',
        padding: '3px 8px',
        borderRadius: 6
      }
    }, "Invitado"));
  })), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, activity.attendees.length, " Asistentes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, activity.attendees.map(userId => {
    const user = USERS[userId];
    if (!user) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: userId,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      user: user,
      size: 34
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600
      }
    }, user.name.split(' ')[0]), userId === activity.organizer && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: 'var(--accent)'
      }
    }, "Org.")));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 100
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "attend-bar"
  }, isLive ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-full",
    onClick: () => app.push('live-track', {
      activityId: activity.id
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "navigation",
    size: 18
  }), "Unirse al tracking en vivo") : /*#__PURE__*/React.createElement("button", {
    className: `btn btn-full ${attending ? 'btn-secondary' : 'btn-primary'}`,
    onClick: toggleAttend
  }, /*#__PURE__*/React.createElement(AttendFist, {
    size: 24,
    attending: attending
  }), attending ? 'Salir de la caravana' : 'Unirse a la caravana')));
}

// ─── Profile screen ────────────────────────────────────────
function ProfileScreen({
  app
}) {
  const [me, setMe] = useState(() => DB.get('me', USERS.me));
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef(null);
  const myActivities = app.activities.filter(a => a.organizer === 'me');
  const attendedActivities = app.activities.filter(a => a.attendees.includes('me') && a.organizer !== 'me');
  const handlePhotoChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast('Solo se admiten imágenes', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      const photoURL = ev.target.result;
      const updated = {
        ...me,
        photoURL
      };
      setMe(updated);
      DB.set('me', updated);
      USERS.me = {
        ...USERS.me,
        photoURL
      };
      app.updateMe(updated);
      toast('Foto actualizada', 'success');
    };
    reader.readAsDataURL(file);
  };
  return /*#__PURE__*/React.createElement(Screen, null, /*#__PURE__*/React.createElement(TopBar, {
    title: "Mi perfil",
    actions: /*#__PURE__*/React.createElement("button", {
      className: "topbar-action",
      onClick: () => setShowSettings(true)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "settings",
      size: 22
    }))
  }), /*#__PURE__*/React.createElement("div", {
    className: "screen-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-avatar-wrap"
  }, /*#__PURE__*/React.createElement(Avatar, {
    user: me,
    size: 88,
    ring: true
  }), /*#__PURE__*/React.createElement("label", {
    className: "profile-avatar-edit",
    title: "Cambiar foto"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 14,
    color: "#0b130e"
  }), /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: "image/*",
    capture: "user",
    style: {
      display: 'none'
    },
    onChange: handlePhotoChange
  }))), /*#__PURE__*/React.createElement("div", {
    className: "profile-name"
  }, me.name), /*#__PURE__*/React.createElement("div", {
    className: "profile-handle",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, "@", me.handle, me.verified && /*#__PURE__*/React.createElement(VerifiedBadge, null)), me.bio && /*#__PURE__*/React.createElement("div", {
    className: "profile-bio"
  }, me.bio), /*#__PURE__*/React.createElement("div", {
    className: "profile-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "profile-stat-val"
  }, myActivities.length), /*#__PURE__*/React.createElement("span", {
    className: "profile-stat-lbl"
  }, "Organizadas")), /*#__PURE__*/React.createElement("div", {
    className: "profile-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "profile-stat-val"
  }, attendedActivities.length + myActivities.length), /*#__PURE__*/React.createElement("span", {
    className: "profile-stat-lbl"
  }, "Asistidas")), /*#__PURE__*/React.createElement("div", {
    className: "profile-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "profile-stat-val"
  }, me.followers || '0'), /*#__PURE__*/React.createElement("span", {
    className: "profile-stat-lbl"
  }, "Seguidores")))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 16px 16px',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "btn btn-secondary btn-sm",
    style: {
      flex: 1,
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 14
  }), "Tomar foto", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    capture: "user",
    style: {
      display: 'none'
    },
    onChange: handlePhotoChange
  })), /*#__PURE__*/React.createElement("label", {
    className: "btn btn-secondary btn-sm",
    style: {
      flex: 1,
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 14
  }), "Subir imagen", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: handlePhotoChange
  }))), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), myActivities.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Mis caravanas organizadas")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: '0 16px'
    }
  }, myActivities.map(a => /*#__PURE__*/React.createElement(ActivityCard, {
    key: a.id,
    activity: a,
    onPress: () => app.push('detail', {
      id: a.id
    })
  })))), attendedActivities.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Eventos asistidos")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: '0 16px'
    }
  }, attendedActivities.map(a => /*#__PURE__*/React.createElement(ActivityCard, {
    key: a.id,
    activity: a,
    onPress: () => app.push('detail', {
      id: a.id
    })
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 80
    }
  })), showSettings && /*#__PURE__*/React.createElement(Sheet, {
    title: "Configuración",
    onClose: () => setShowSettings(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Tema"), [{
    id: 'noche',
    label: 'Noche',
    sub: 'Oscuro por defecto',
    bg: '#0b130e'
  }, {
    id: 'dia',
    label: 'Día',
    sub: 'Claro',
    bg: '#f0f4f1'
  }, {
    id: 'voltaje',
    label: 'Voltaje',
    sub: 'Eléctrico oscuro',
    bg: '#080b0f'
  }].map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: `theme-option ${app.theme === t.id ? 'active' : ''}`,
    onClick: () => app.setTheme(t.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "theme-swatch",
    style: {
      background: t.bg,
      borderColor: app.theme === t.id ? 'var(--accent)' : 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text2)'
    }
  }, t.sub)), app.theme === t.id && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    color: "var(--accent)",
    style: {
      marginLeft: 'auto'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "divider",
    style: {
      margin: '16px 0'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-full",
    onClick: () => {
      DB.clear();
      window.location.reload();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log_out",
    size: 16
  }), "Limpiar datos locales"))));
}

// ─── Settings screen (standalone) ─────────────────────────
function SettingsScreen({
  app
}) {
  return /*#__PURE__*/React.createElement(Screen, null, /*#__PURE__*/React.createElement(TopBar, {
    title: "Configuración",
    onBack: () => app.pop()
  }), /*#__PURE__*/React.createElement("div", {
    className: "screen-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Tema visual"), [{
    id: 'noche',
    label: 'Noche',
    sub: 'Oscuro, cómodo',
    bg: '#0b130e'
  }, {
    id: 'dia',
    label: 'Día',
    sub: 'Claro y visible',
    bg: '#f0f4f1'
  }, {
    id: 'voltaje',
    label: 'Voltaje',
    sub: 'Eléctrico · Cian oscuro',
    bg: '#080b0f'
  }].map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: `theme-option ${app.theme === t.id ? 'active' : ''}`,
    onClick: () => app.setTheme(t.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "theme-swatch",
    style: {
      background: t.bg
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text2)'
    }
  }, t.sub)), app.theme === t.id && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    color: "var(--accent)"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Notificaciones"), /*#__PURE__*/React.createElement("div", {
    className: "row-item",
    onClick: async () => {
      if (!('Notification' in window)) {
        toast('No soportado en este dispositivo', 'error');
        return;
      }
      const perm = await Notification.requestPermission();
      toast(perm === 'granted' ? 'Notificaciones activadas' : 'Permisos denegados', perm === 'granted' ? 'success' : 'error');
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 20,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("div", {
    className: "row-item-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row-item-name"
  }, "Permitir notificaciones"), /*#__PURE__*/React.createElement("div", {
    className: "row-item-sub"
  }, "Estado: ", Notification?.permission || 'no soportado')), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 16,
    color: "var(--text3)"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-full",
    onClick: () => {
      if (confirm('¿Limpiar todos los datos guardados?')) {
        DB.clear();
        window.location.reload();
      }
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log_out",
    size: 16
  }), "Limpiar datos locales")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 80
    }
  })));
}

/* === screens-live.jsx === */
// ─── Live GPS Tracking screen ─────────────────────────────
function LiveTrackScreen({
  app,
  activityId
}) {
  const activity = app.activities.find(a => a.id === activityId);
  const route = activity ? ROUTES[activity.routeId] : null;
  const [gpsPos, setGpsPos] = useState(null);
  const [gpsError, setGpsError] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [distanceCovered, setDistanceCovered] = useState(0);
  const [speedMs, setSpeedMs] = useState(0);
  const [trail, setTrail] = useState([]);
  const [showWatch, setShowWatch] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const watchIdRef = useRef(null);
  const timerRef = useRef(null);
  const lastPosRef = useRef(null);
  const startTimeRef = useRef(null);

  // Request GPS and start tracking
  const startTracking = () => {
    if (!navigator.geolocation) {
      setGpsError('GPS no disponible en este dispositivo');
      return;
    }
    setTracking(true);
    setPaused(false);
    startTimeRef.current = Date.now() - elapsed * 1000;

    // Timer
    timerRef.current = setInterval(() => {
      if (!paused) setElapsed(Math.round((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    // GPS watch
    watchIdRef.current = navigator.geolocation.watchPosition(position => {
      const {
        latitude,
        longitude,
        speed
      } = position.coords;
      const newPos = [latitude, longitude];
      setGpsPos(newPos);
      setGpsError(null);
      if (speed !== null && speed !== undefined) setSpeedMs(speed);
      if (lastPosRef.current) {
        const dist = haversine(lastPosRef.current[0], lastPosRef.current[1], latitude, longitude);
        if (dist > 0.002) {
          // Only count if moved > 2m
          setDistanceCovered(prev => prev + dist);
          setTrail(prev => [...prev, newPos]);
        }
      } else {
        setTrail([newPos]);
      }
      lastPosRef.current = newPos;
    }, err => {
      setGpsError(err.message || 'Error de GPS');
      setTracking(false);
    }, {
      enableHighAccuracy: true,
      maximumAge: 2000,
      timeout: 15000
    });
  };
  const pauseTracking = () => {
    setPaused(p => {
      const nowPaused = !p;
      if (nowPaused) {
        clearInterval(timerRef.current);
      } else {
        startTimeRef.current = Date.now() - elapsed * 1000;
        timerRef.current = setInterval(() => {
          setElapsed(Math.round((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
      }
      return nowPaused;
    });
  };
  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    clearInterval(timerRef.current);
    setTracking(false);
    setPaused(false);
    setShowFinish(true);

    // Update activity status to finished
    app.updateActivity(activityId, a => ({
      ...a,
      status: 'finished'
    }));

    // Show notification if available
    if (Notification?.permission === 'granted') {
      new Notification('Caravaneo · Actividad finalizada', {
        body: `Recorriste ${distanceCovered.toFixed(2)} km en ${formatElapsed(elapsed)}`,
        icon: '/assets/icon-192.png'
      });
    }
  };
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
      clearInterval(timerRef.current);
    };
  }, []);
  const formatElapsed = secs => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor(secs % 3600 / 60);
    const s = secs % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };
  const speedKmh = (speedMs * 3.6).toFixed(1);
  const totalKm = route?.distanceKm || 1;
  const progress = Math.min(distanceCovered / totalKm, 1);
  const remainingKm = Math.max(totalKm - distanceCovered, 0);

  // GPX export
  const exportGPX = () => {
    const points = trail.map((p, i) => `  <trkpt lat="${p[0]}" lon="${p[1]}"><ele>2600</ele></trkpt>`).join('\n');
    const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Caravaneo">
  <metadata><name>${activity?.title || 'Caravana'}</name></metadata>
  <trk><name>${activity?.title || 'Caravana'}</name><trkseg>
${points}
  </trkseg></trk>
</gpx>`;
    const blob = new Blob([gpx], {
      type: 'application/gpx+xml'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `caravaneo-${activityId}.gpx`;
    a.click();
    URL.revokeObjectURL(url);
    toast('GPX descargado', 'success');
  };

  // Finish summary
  if (showFinish) {
    return /*#__PURE__*/React.createElement(Screen, null, /*#__PURE__*/React.createElement(TopBar, {
      title: "Resumen",
      onBack: () => app.pop()
    }), /*#__PURE__*/React.createElement("div", {
      className: "screen-scroll"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '24px 16px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 48
      }
    }, "🏁"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 24,
        fontWeight: 800,
        marginTop: 12,
        color: 'var(--accent)'
      }
    }, "¡Caravana completada!"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: 'var(--text2)',
        marginTop: 6
      }
    }, activity?.title)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        padding: '0 16px 16px'
      }
    }, [{
      label: 'Distancia',
      val: distanceCovered.toFixed(2),
      unit: 'km'
    }, {
      label: 'Tiempo',
      val: formatElapsed(elapsed),
      unit: ''
    }, {
      label: 'Vel. máx.',
      val: speedKmh,
      unit: 'km/h'
    }, {
      label: 'Puntos GPS',
      val: trail.length,
      unit: ''
    }].map(s => /*#__PURE__*/React.createElement("div", {
      key: s.label,
      style: {
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '16px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        fontWeight: 800,
        color: 'var(--accent)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, s.val), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--accent)',
        marginTop: 2
      }
    }, s.unit), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--text3)',
        marginTop: 4,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }
    }, s.label)))), trail.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        margin: '0 16px 16px',
        height: 180,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement(LeafletMap, {
      id: "map-finish",
      routes: [...(route ? [route] : []), {
        points: trail,
        color: '#f87171',
        id: 'trail'
      }]
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, trail.length > 0 && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary btn-full",
      onClick: exportGPX
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 16
    }), "Exportar GPX (smartwatch / Strava)"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-full",
      onClick: () => app.pop()
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16
    }), "Finalizar")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 40
      }
    })));
  }

  // Smartwatch sheet
  const WatchSheet = () => /*#__PURE__*/React.createElement(Sheet, {
    title: "Smartwatch",
    onClose: () => setShowWatch(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 12px',
      fontSize: 13,
      color: 'var(--text2)',
      lineHeight: 1.5
    }
  }, "Abre la URL de seguimiento en tu reloj o importa el GPX cuando termines."), [{
    icon: '⌚',
    brand: 'Wear OS',
    sub: 'Galaxy Watch · Pixel Watch',
    tip: 'Abre Chrome en el reloj y pega la URL'
  }, {
    icon: '🍎',
    brand: 'Apple Watch',
    sub: 'iPhone requerido',
    tip: 'Usa la app Workouts o importa el GPX en Apple Health'
  }, {
    icon: '🎽',
    brand: 'Garmin / Suunto',
    sub: 'Todos los modelos',
    tip: 'Importa el archivo .gpx via Garmin Connect o Suunto App'
  }].map(w => /*#__PURE__*/React.createElement("div", {
    key: w.brand,
    className: "watch-option"
  }, /*#__PURE__*/React.createElement("div", {
    className: "watch-icon",
    style: {
      fontSize: 22
    }
  }, w.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, w.brand), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text2)',
      marginTop: 1
    }
  }, w.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text3)',
      marginTop: 3
    }
  }, w.tip)))), /*#__PURE__*/React.createElement("div", {
    className: "divider",
    style: {
      margin: '8px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title",
    style: {
      marginBottom: 10
    }
  }, "Exportar recorrido"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-full",
    onClick: exportGPX,
    disabled: trail.length === 0,
    style: {
      opacity: trail.length === 0 ? 0.4 : 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 16
  }), "Descargar archivo GPX", trail.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--text3)',
      marginLeft: 4
    }
  }, "(", trail.length, " puntos)")), trail.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text3)',
      textAlign: 'center',
      marginTop: 8
    }
  }, "Inicia el tracking para registrar el recorrido"))));
  return /*#__PURE__*/React.createElement("div", {
    className: "live-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "live-map"
  }, /*#__PURE__*/React.createElement(LeafletMap, {
    id: "map-live",
    routes: [...(route ? [route] : []), trail.length > 1 ? {
      points: trail,
      color: '#fbbf24',
      id: 'trail'
    } : null].filter(Boolean),
    puck: gpsPos,
    zoom: 16
  }), /*#__PURE__*/React.createElement("div", {
    className: "live-header"
  }, /*#__PURE__*/React.createElement("button", {
    className: "topbar-back",
    style: {
      background: 'rgba(11,19,14,.85)',
      backdropFilter: 'blur(8px)'
    },
    onClick: () => app.pop()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_left",
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    className: "live-badge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "live-badge-dot"
  }), paused ? 'PAUSADO' : tracking ? 'EN VIVO' : 'LISTO'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "topbar-action",
    style: {
      background: 'rgba(11,19,14,.85)',
      backdropFilter: 'blur(8px)'
    },
    onClick: () => setShowWatch(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "watch",
    size: 20
  }))), gpsPos && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 12,
      left: 12,
      zIndex: 5,
      background: 'rgba(11,19,14,.85)',
      backdropFilter: 'blur(8px)',
      borderRadius: 20,
      padding: '5px 12px',
      fontSize: 11,
      color: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--accent)'
    }
  }), "GPS activo")), /*#__PURE__*/React.createElement("div", {
    className: "live-overlay"
  }, gpsError && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--red-dim)',
      border: '1px solid var(--red)',
      borderRadius: 10,
      padding: '10px 14px',
      marginBottom: 12,
      fontSize: 13,
      color: 'var(--red)'
    }
  }, "⚠️ ", gpsError), /*#__PURE__*/React.createElement("div", {
    className: "live-metrics"
  }, /*#__PURE__*/React.createElement("div", {
    className: "live-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "live-metric-val"
  }, formatElapsed(elapsed)), /*#__PURE__*/React.createElement("div", {
    className: "live-metric-lbl"
  }, "Tiempo")), /*#__PURE__*/React.createElement("div", {
    className: "live-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "live-metric-val"
  }, distanceCovered.toFixed(2)), /*#__PURE__*/React.createElement("div", {
    className: "live-metric-unit"
  }, "km"), /*#__PURE__*/React.createElement("div", {
    className: "live-metric-lbl"
  }, "Recorrido")), /*#__PURE__*/React.createElement("div", {
    className: "live-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "live-metric-val"
  }, speedKmh), /*#__PURE__*/React.createElement("div", {
    className: "live-metric-unit"
  }, "km/h"), /*#__PURE__*/React.createElement("div", {
    className: "live-metric-lbl"
  }, "Velocidad"))), route && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11,
      color: 'var(--text3)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, route.startName), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontWeight: 700
    }
  }, Math.round(progress * 100), "%"), /*#__PURE__*/React.createElement("span", null, route.endName)), /*#__PURE__*/React.createElement("div", {
    className: "progress-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill",
    style: {
      width: progress * 100 + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text2)',
      marginTop: 5,
      textAlign: 'center'
    }
  }, "Faltan ", remainingKm.toFixed(2), " km · aprox ", Math.round(remainingKm / 4.5 * 60), " min")), /*#__PURE__*/React.createElement("div", {
    className: "live-actions"
  }, !tracking ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 1,
      fontSize: 17,
      padding: '16px'
    },
    onClick: startTracking
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "navigation",
    size: 20
  }), "Iniciar tracking GPS") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary live-pause",
    onClick: pauseTracking
  }, /*#__PURE__*/React.createElement(Icon, {
    name: paused ? 'play' : 'pause',
    size: 18
  }), paused ? 'Continuar' : 'Pausar'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: stopTracking,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "stop",
    size: 18
  }), "Finalizar"))), gpsPos && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--text3)',
      textAlign: 'center',
      marginTop: 8
    }
  }, gpsPos[0].toFixed(5), ", ", gpsPos[1].toFixed(5))), showWatch && /*#__PURE__*/React.createElement(WatchSheet, null));
}

/* === app.jsx === */
// ─── Main App ─────────────────────────────────────────────
function App() {
  // Theme
  const [theme, setThemeState] = useState(() => DB.get('theme', 'noche'));
  const setTheme = t => {
    setThemeState(t);
    DB.set('theme', t);
    document.documentElement.setAttribute('data-theme', t);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dia' ? '#f0f4f1' : t === 'voltaje' ? '#080b0f' : '#0b130e');
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Activities (load from DB, fallback to defaults)
  const [activities, setActivities] = useState(() => DB.get('activities', buildDefaultActivities()));
  const createActivity = act => {
    setActivities(prev => {
      const updated = [act, ...prev];
      DB.set('activities', updated);
      return updated;
    });
  };
  const updateActivity = (id, fn) => {
    setActivities(prev => {
      const updated = prev.map(a => a.id === id ? fn(a) : a);
      DB.set('activities', updated);
      return updated;
    });
  };

  // Current user
  const [me, setMe] = useState(() => {
    const saved = DB.get('me', null);
    if (saved) USERS.me = saved;
    return saved || USERS.me;
  });
  const updateMe = updated => {
    setMe(updated);
    USERS.me = updated;
    DB.set('me', updated);
  };

  // Navigation (stack-based)
  const [stack, setStack] = useState([{
    screen: 'main',
    tab: 'home'
  }]);
  const current = stack[stack.length - 1];
  const push = (screen, params = {}) => setStack(s => [...s, {
    screen,
    params
  }]);
  const pop = () => setStack(s => s.length > 1 ? s.slice(0, -1) : s);
  const replace = (screen, params = {}) => setStack(s => [...s.slice(0, -1), {
    screen,
    params
  }]);

  // Unread notifications count
  const notifCount = DB.get('notifs', DEFAULT_NOTIFICATIONS).filter(n => !n.read).length;
  const appCtx = {
    activities,
    createActivity,
    updateActivity,
    me,
    updateMe,
    theme,
    setTheme,
    push,
    pop,
    replace
  };

  // Tab routing (main screen tabs)
  const [tab, setTab] = useState('home');
  const renderTab = () => {
    switch (tab) {
      case 'home':
        return /*#__PURE__*/React.createElement(HomeScreen, {
          app: appCtx
        });
      case 'explore':
        return /*#__PURE__*/React.createElement(ExploreScreen, {
          app: appCtx
        });
      case 'notifs':
        return /*#__PURE__*/React.createElement(NotificationsScreen, {
          app: appCtx
        });
      case 'profile':
        return /*#__PURE__*/React.createElement(ProfileScreen, {
          app: appCtx
        });
      default:
        return /*#__PURE__*/React.createElement(HomeScreen, {
          app: appCtx
        });
    }
  };
  const renderScreen = () => {
    const {
      screen,
      params = {}
    } = current;
    switch (screen) {
      case 'main':
        return /*#__PURE__*/React.createElement(Screen, null, renderTab(), /*#__PURE__*/React.createElement(BottomNav, {
          tab: tab,
          setTab: setTab,
          notifCount: notifCount
        }));
      case 'detail':
        return /*#__PURE__*/React.createElement(DetailScreen, {
          app: appCtx,
          activityId: params.id
        });
      case 'create':
        return /*#__PURE__*/React.createElement(CreateScreen, {
          app: appCtx
        });
      case 'live-track':
        return /*#__PURE__*/React.createElement(LiveTrackScreen, {
          app: appCtx,
          activityId: params.activityId
        });
      case 'settings':
        return /*#__PURE__*/React.createElement(SettingsScreen, {
          app: appCtx
        });
      default:
        return /*#__PURE__*/React.createElement(HomeScreen, {
          app: appCtx
        });
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, renderScreen(), /*#__PURE__*/React.createElement(ToastContainer, null));
}

// ─── Boot ─────────────────────────────────────────────────
// Hide loading screen when app mounts
const rootEl = document.getElementById('root');
const loadingEl = document.getElementById('loading');
ReactDOM.createRoot(rootEl).render(React.createElement(App));
if (loadingEl) {
  setTimeout(() => {
    loadingEl.classList.add('hidden');
    setTimeout(() => loadingEl.remove(), 400);
  }, 600);
}

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        nw?.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            toast('Actualización disponible. Recarga para aplicar.', 'default', 8000);
          }
        });
      });
    }).catch(() => {});
  });
}

