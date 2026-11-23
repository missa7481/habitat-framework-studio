/* Offline viewer for the archived environmental data-availability mask. */
(() => {
  "use strict";

  const scriptBase = new URL(".", document.currentScript?.src || document.baseURI);
  const source = "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/representation_lab/study_records.json#L158-L165";
  const previous = new WeakMap();
  const modes = {
    all: { label: "All input coverage", complete: "#297D70", missing: "#9DAAAF" },
    complete: { label: "Highlight complete inputs", complete: "#297D70", missing: "#D2DCDE" },
    missing: { label: "Highlight missing inputs", complete: "#D2DCDE", missing: "#4A5C72" },
  };
  const levels = [1, 1.5, 2, 3, 4];
  let sequence = 0;

  function addStyles() {
    if (document.getElementById("framework-coverage-style")) return;
    const style = document.createElement("style");
    style.id = "framework-coverage-style";
    style.textContent = `
      .fwcov { color:#243f44; font-family:Arial, sans-serif; min-width:0; margin:0; }
      .fwcov *, .fwcov *::before, .fwcov *::after { box-sizing:border-box; }
      .fwcov .fwcov-tools, .fwcov .fwcov-nav, .fwcov .fwcov-legend, .fwcov .fwcov-facts { display:flex; align-items:center; flex-wrap:wrap; }
      .fwcov .fwcov-tools { justify-content:space-between; gap:8px 14px; margin:0 0 10px; }
      .fwcov .fwcov-tools select, .fwcov .fwcov-tools button { font:600 14px/1.1 Arial,sans-serif; background:#fff; color:#21464b; border:1px solid #bdced0; min-height:36px; border-radius:5px; margin:0; box-shadow:none; cursor:pointer; }
      .fwcov .fwcov-tools select { appearance:none; max-width:100%; padding:5px 34px 5px 10px; position:relative; }
      .fwcov .fwcov-select-shell { display:inline-flex; min-width:0; position:relative; }
      .fwcov .fwcov-select-shell:after { content:""; position:absolute; right:12px; top:44%; width:7px; height:7px; border:solid #48686b; border-width:0 1.6px 1.6px 0; transform:rotate(45deg); pointer-events:none; }
      .fwcov .fwcov-tools button { min-width:35px; padding:4px 9px; }
      .fwcov .fwcov-tools button:not(:disabled):hover,.fwcov .fwcov-tools select:hover { background:#eef6f4; border-color:#668d88; }
      .fwcov .fwcov-tools button:disabled { color:#7c888a; cursor:default; background:#f3f6f5; }
      .fwcov .fwcov-nav { gap:4px; }
      .fwcov .fwcov-zoomtext { min-width:37px; font-size:14px; font-variant-numeric:tabular-nums; font-weight:700; text-align:center; }
      .fwcov .fwcov-tools .fwcov-world { margin-left:5px; font-weight:500; }
      .fwcov .fwcov-view { width:100%; aspect-ratio:36/17; border:1px solid #c1d3d4; position:relative; overflow:hidden; background:#eef4f5; isolation:isolate; border-radius:5px; }
      .fwcov .fwcov-view[data-pannable="true"] { cursor:grab; touch-action:none; }
      .fwcov .fwcov-view[data-dragging="true"] { cursor:grabbing; }
      .fwcov .fwcov-tools :focus-visible,.fwcov .fwcov-view:focus-visible,.fwcov a:focus-visible { outline:3px solid #147c73; outline-offset:2px; }
      .fwcov .fwcov-field { position:absolute; pointer-events:none; user-select:none; margin:0; padding:0; }
      .fwcov .fwcov-raster { width:100%; height:100%; max-width:none; display:block; padding:0; margin:0; border:0; }
      .fwcov .fwcov-graticule { position:absolute; z-index:1; pointer-events:none; }
      .fwcov .fwcov-meridian { top:0; bottom:0; border-left:1px solid rgba(54,84,90,.11); }
      .fwcov .fwcov-parallel { left:0; right:0; border-top:1px solid rgba(54,84,90,.13); }
      .fwcov .fwcov-meridian span, .fwcov .fwcov-parallel span { position:absolute; padding:1px 3px; border-radius:2px; color:#4b6569; background:rgba(238,244,245,.85); font:12px/1 Arial,sans-serif; white-space:nowrap; }
      .fwcov .fwcov-meridian span { left:4px; bottom:3px; }
      .fwcov .fwcov-parallel span { left:3px; top:3px; }
      .fwcov .fwcov-legend { gap:8px 18px; margin:10px 0 0; font-size:14px; line-height:1.4; }
      .fwcov .fwcov-key { display:inline-flex; align-items:center; gap:7px; }
      .fwcov .fwcov-swatch { display:inline-block; width:12px; height:12px; border:1px solid #67838750; flex-shrink:0; }
      .fwcov .fwcov-facts { justify-content:space-between; align-items:baseline; gap:5px 12px; margin-top:8px; font:14px/1.5 Arial,sans-serif; color:#4b6467; }
      .fwcov .fwcov-facts a { color:#17685e; text-underline-offset:.16em; }
      .fwcov .fwcov-error { position:absolute; inset:0; margin:auto; max-width:280px; height:fit-content; padding:8px; color:#6b3f28; font-size:15px; background:white; }
      .fwcov .fwcov-a11y { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); white-space:nowrap; }
      @media(max-width:580px) {
        .fwcov .fwcov-tools { gap:6px; } .fwcov .fwcov-tools select, .fwcov .fwcov-tools button { min-height:38px; }
        .fwcov .fwcov-meridian span, .fwcov .fwcov-parallel span { display:none; }
        .fwcov .fwcov-legend { gap:6px 12px; }
      }
    `;
    document.head.append(style);
  }

  function element(tag, className, label) {
    const el = document.createElement(tag);
    if (className) el.className = "fwcov-" + className;
    if (label != null) el.textContent = label;
    return el;
  }

  function renderCoverage(container, initialMode = "all") {
    if (typeof container === "string") container = document.querySelector(container);
    if (!container) throw new Error("An existing map container is required.");
    previous.get(container)?.destroy();
    addStyles();

    let mode = Object.hasOwn(modes, initialMode) ? initialMode : "all";
    let zoomIndex = 0;
    let cx = 0.5, cy = 0.5, drag = null;
    const mapId = "framework-input-map-" + (++sequence);
    const figure = element("figure");
    figure.className = "fwcov";
    figure.setAttribute("aria-label", "Global environmental input coverage in 2024");
    const tools = element("div", "tools");
    const selectShell = element("span", "select-shell");
    const select = element("select");
    select.setAttribute("aria-label", "Environmental input layer");
    select.setAttribute("aria-controls", mapId);
    for (const [value, config] of Object.entries(modes)) {
      const opt = element("option", "", config.label);
      opt.value = value;
      select.append(opt);
    }
    selectShell.append(select);
    const nav = element("div", "nav");
    const btn = (label, content, cls) => {
      const b = element("button", cls, content);
      b.type = "button";
      b.title = label;
      b.setAttribute("aria-label", label);
      b.setAttribute("aria-controls", mapId);
      return b;
    };
    const less = btn("Zoom out", "−");
    const more = btn("Zoom in", "+");
    const home = btn("Reset map to global extent", "Reset", "world");
    const zoomText = element("span", "zoomtext");
    nav.append(less, zoomText, more, home);
    tools.append(selectShell, nav);

    const view = element("div", "view");
    view.id = mapId;
    view.tabIndex = 0;
    view.setAttribute("role", "group");
    view.setAttribute("aria-label", "Environmental input coverage map");
    view.setAttribute("aria-describedby", mapId + "-instructions");
    const help = element("span", "a11y", "Use plus or minus to change zoom. When zoomed in, use the arrow keys or drag to pan. Home restores the global view.");
    help.id = mapId + "-instructions";
    const field = element("div", "field");
    const raster = element("img", "raster");
    raster.alt = "North-up world grid between 85° south and 85° north. The legend identifies complete inputs, missing inputs and cells outside the climate domain.";
    raster.draggable = false;
    field.append(raster);
    const grid = (degree, isLatitude) => {
      const line = element("div");
      line.className = "fwcov-graticule fwcov-" + (isLatitude ? "parallel" : "meridian");
      line.setAttribute("aria-hidden", "true");
      const offset = isLatitude ? (85 - degree) / 170 : (degree + 180) / 360;
      line.style[isLatitude ? "top" : "left"] = (offset * 100) + "%";
      const cardinal = degree === 0 ? "" : isLatitude ? (degree > 0 ? "N" : "S") : (degree > 0 ? "E" : "W");
      line.append(element("span", "", Math.abs(degree) + "°" + cardinal));
      return line;
    };
    for (const lon of [-120, -60, 0, 60, 120]) field.append(grid(lon, false));
    for (const lat of [-60, 0, 60]) field.append(grid(lat, true));
    const error = element("div", "error", "The offline map image could not be loaded. The coverage counts below remain available.");
    error.setAttribute("role", "status");
    error.hidden = true;
    raster.addEventListener("load", () => { error.hidden = true; });
    raster.addEventListener("error", () => { error.hidden = false; });
    view.append(field, error);
    const legend = element("div", "legend");
    const facts = element("figcaption", "facts");
    const counts = element("span");
    const link = element("a", "", "Archived grid counts");
    link.href = source;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    facts.append(counts, link);
    const status = element("span", "a11y");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    figure.append(tools, help, view, legend, facts, status);
    container.replaceChildren(figure);

    function setMode(next) {
      if (!Object.hasOwn(modes, next)) return;
      mode = next;
      select.value = next;
      const config = modes[mode];
      raster.src = new URL("assets/coverage-" + mode + ".png", scriptBase).href;
      legend.replaceChildren();
      for (const [label, color] of [
        ["Complete inputs", config.complete],
        ["Missing inputs", config.missing],
        ["Outside climate domain", "#EEF4F5"],
      ]) {
        const key = element("span", "key");
        const swatch = element("i", "swatch");
        swatch.setAttribute("aria-hidden", "true");
        swatch.style.backgroundColor = color;
        key.append(swatch, document.createTextNode(label));
        legend.append(key);
      }
      counts.textContent = mode === "missing"
        ? "Missing inputs in 2,812,157 of 7,843,218 climate-domain grid cells (35.9%)."
        : "Complete inputs in 5,031,061 of 7,843,218 climate-domain grid cells (64.1%).";
      status.textContent = config.label + ". " + counts.textContent;
    }
    function draw() {
      const z = levels[zoomIndex], half = 0.5 / z;
      cx = Math.min(1 - half, Math.max(half, cx));
      cy = Math.min(1 - half, Math.max(half, cy));
      field.style.width = field.style.height = (100 * z) + "%";
      field.style.left = (50 - cx * z * 100) + "%";
      field.style.top = (50 - cy * z * 100) + "%";
      view.dataset.pannable = String(zoomIndex > 0);
      zoomText.textContent = z + "×";
      less.disabled = home.disabled = zoomIndex === 0;
      more.disabled = zoomIndex === levels.length - 1;
    }
    function zoom(next) {
      zoomIndex = Math.max(0, Math.min(levels.length - 1, next));
      draw();
      status.textContent = "Map zoom " + levels[zoomIndex] + " times.";
    }
    function reset() { cx = cy = 0.5; zoom(0); }
    select.addEventListener("change", () => setMode(select.value));
    less.addEventListener("click", () => zoom(zoomIndex - 1));
    more.addEventListener("click", () => zoom(zoomIndex + 1));
    home.addEventListener("click", reset);
    view.addEventListener("keydown", event => {
      if (event.ctrlKey || event.altKey || event.metaKey) return;
      const step = 0.12 / levels[zoomIndex];
      if (["+", "="].includes(event.key)) zoom(zoomIndex + 1);
      else if (event.key === "-") zoom(zoomIndex - 1);
      else if (event.key === "Home") reset();
      else if (zoomIndex > 0 && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        if (event.key === "ArrowLeft") cx -= step;
        if (event.key === "ArrowRight") cx += step;
        if (event.key === "ArrowUp") cy -= step;
        if (event.key === "ArrowDown") cy += step;
        draw();
        const lon = Math.round(cx * 360 - 180), lat = Math.round(85 - cy * 170);
        status.textContent = "Map centered at latitude " + lat + "°, longitude " + lon + "°.";
      } else return;
      event.preventDefault();
    });
    view.addEventListener("pointerdown", event => {
      if (!zoomIndex || drag || event.button !== 0) return;
      drag = { id:event.pointerId, x:event.clientX, y:event.clientY, cx, cy };
      view.setPointerCapture(event.pointerId);
      view.dataset.dragging = "true";
    });
    view.addEventListener("pointermove", event => {
      if (!drag || drag.id !== event.pointerId) return;
      const rect = view.getBoundingClientRect();
      cx = drag.cx - (event.clientX - drag.x) / (rect.width * levels[zoomIndex]);
      cy = drag.cy - (event.clientY - drag.y) / (rect.height * levels[zoomIndex]);
      draw();
    });
    const endDrag = () => { drag = null; view.dataset.dragging = "false"; };
    view.addEventListener("pointerup", endDrag);
    view.addEventListener("pointercancel", endDrag);
    view.addEventListener("lostpointercapture", endDrag);
    setMode(mode);
    draw();
    const instance = {
      setMode, reset,
      destroy() {
        figure.remove();
        if (previous.get(container) === instance) previous.delete(container);
      },
    };
    previous.set(container, instance);
    return instance;
  }
  window.renderCoverage = renderCoverage;
})();
