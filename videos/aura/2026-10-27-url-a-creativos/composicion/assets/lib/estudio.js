/* estudio.js — Helpers compartidos por todas las escenas de la biblioteca.
 * Se carga una vez en el index.html del reel (antes de las escenas).
 * Todo es determinístico: nada depende del reloj ni de Math.random().
 */
(function () {
  "use strict";

  var rootStyle = function () {
    return getComputedStyle(document.documentElement);
  };

  /** mulberry32: PRNG con semilla. prng(seed)() devuelve [0, 1). */
  function prng(seed) {
    var a = (seed >>> 0) || 1;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** Valor crudo de un token CSS de la marca (sin comillas). */
  function token(name, fallback) {
    var v = rootStyle().getPropertyValue(name).trim().replace(/^["']|["']$/g, "");
    return v === "" ? (fallback === undefined ? "" : fallback) : v;
  }

  /** Token numérico (duraciones, stagger, blur). */
  function num(name, fallback) {
    var v = parseFloat(token(name));
    return isNaN(v) ? (fallback === undefined ? 0 : fallback) : v;
  }

  /** Easing de la marca: kind = enter | exit | move | spring. */
  function ease(kind, fallback) {
    return token("--ease-" + kind, fallback || "power3.out");
  }

  /* Al montar una escena, el runtime de HyperFrames:
   *  - renombra data-composition-src → data-composition-file en el host;
   *  - le quita id y data-composition-id al root interno y lo marca con data-hf-inner-root.
   * Por eso se busca el host por cualquiera de los dos atributos, y el root interno dentro de él. */
  function host(compositionId) {
    var sel = '[data-composition-id="' + compositionId + '"]';
    return document.querySelector(sel + "[data-composition-file]") || document.querySelector(sel + "[data-composition-src]");
  }

  function rootInterno(compositionId) {
    var h = host(compositionId);
    return (
      (h && (h.querySelector("[data-hf-inner-root]") || h.querySelector("[data-composition-variables]"))) ||
      document.querySelector('[data-composition-id="' + compositionId + '"][data-composition-variables]')
    );
  }

  function parseJSON(s, fb) {
    try {
      return s ? JSON.parse(s) : fb;
    } catch (e) {
      return fb;
    }
  }

  /** Variables del montaje de la escena: defaults declarados en su root
   *  (data-composition-variables) + valores del host (data-variable-values).
   *  No depende de getVariables(), que solo está acotado mientras corre el script. */
  function vars(compositionId) {
    var out = {};
    var root = rootInterno(compositionId);
    parseJSON(root && root.getAttribute("data-composition-variables"), []).forEach(function (d) {
      if (d && d.id !== undefined) out[d.id] = d["default"];
    });
    var h = host(compositionId);
    var valores = parseJSON(h && h.getAttribute("data-variable-values"), {});
    for (var k in valores) out[k] = valores[k];
    return out;
  }

  /** Duración del slot (data-duration del host) de una escena; fallback si no hay host. */
  function slot(compositionId, fallback) {
    var h = host(compositionId);
    var d = h ? parseFloat(h.getAttribute("data-duration")) : NaN;
    return isNaN(d) ? fallback : d;
  }

  /** Inicio absoluto del host en el reel (data-start numérico). */
  function inicio(compositionId) {
    var h = host(compositionId);
    var s = h ? parseFloat(h.getAttribute("data-start")) : NaN;
    return isNaN(s) ? 0 : s;
  }

  /** hf-seek entrega el tiempo GLOBAL del reel: esto lo pasa a tiempo local de la escena.
   *  Requiere que el host tenga un data-start numérico (no expresiones "a + 0.5"). */
  function tiempoLocal(compositionId, tGlobal) {
    return Math.max(0, tGlobal - inicio(compositionId));
  }

  function normalizar(s) {
    return String(s)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9%+]/g, "");
  }

  /**
   * Parte el texto de un elemento en <span class="palabra"> (inline-block) y marca con
   * la clase "clave" las palabras que coinciden con `claves` (string separado por comas).
   * Devuelve el array de spans. Llamarlo después de document.fonts.ready si se mide.
   */
  function palabras(el, claves) {
    var lista = String(claves || "")
      .split(",")
      .map(normalizar)
      .filter(Boolean);
    var texto = el.textContent.trim().replace(/\s+/g, " ");
    el.textContent = "";
    var spans = [];
    texto.split(" ").forEach(function (w, i, arr) {
      var s = document.createElement("span");
      s.className = "palabra" + (lista.indexOf(normalizar(w)) >= 0 ? " clave" : "");
      s.textContent = w;
      el.appendChild(s);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
      spans.push(s);
    });
    return spans;
  }

  /** Lista desde un string separado por `sep` (por defecto ";"), sin vacíos. */
  function lista(s, sep) {
    return String(s || "")
      .split(sep || ";")
      .map(function (x) {
        return x.trim();
      })
      .filter(Boolean);
  }

  /** Formatea un número con separador de miles rioplatense (6.000) y decimales con coma. */
  function formato(n, decimales) {
    var d = decimales || 0;
    var partes = Math.abs(n).toFixed(d).split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (n < 0 ? "-" : "") + partes.join(",");
  }

  /** true si la variable es "verdadera" (acepta booleanos y strings). */
  function si(v) {
    return v === true || v === "true" || v === "si" || v === "sí" || v === 1 || v === "1";
  }

  window.Estudio = {
    prng: prng,
    token: token,
    num: num,
    ease: ease,
    vars: vars,
    slot: slot,
    inicio: inicio,
    tiempoLocal: tiempoLocal,
    palabras: palabras,
    lista: lista,
    formato: formato,
    si: si,
  };
})();
