/* forms.js — email capture + non-Git suggestion form.
   If an endpoint is configured in AAFS.config it POSTs there; otherwise runs in
   local "demo" mode (stores in localStorage so the UX is real without a backend). */
(function () {
  "use strict";
  var AAFS = window.AAFS;

  function setMsg(el, text, ok) {
    if (!el) return;
    el.textContent = text;
    el.className = "form-msg " + (ok ? "ok" : "err");
  }

  function post(endpoint, payload) {
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r; });
  }

  function rememberLocal(key, value) {
    try {
      var arr = JSON.parse(localStorage.getItem(key) || "[]");
      arr.push({ value: value, at: Date.now() });
      localStorage.setItem(key, JSON.stringify(arr));
    } catch (e) {}
  }

  // ---- Email capture (can appear multiple times) ----
  document.querySelectorAll("form[data-subscribe]").forEach(function (form) {
    var msg = form.querySelector(".form-msg") || form.parentNode.querySelector(".form-msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (form.querySelector('input[type="email"]') || {}).value;
      if (!email) { setMsg(msg, "Please enter your email.", false); return; }
      var done = function () { setMsg(msg, "You're on the list — we'll email you when new tracks ship.", true); form.reset(); };
      if (AAFS.config.subscribeEndpoint) {
        post(AAFS.config.subscribeEndpoint, { email: email, source: "subscribe" }).then(done).catch(function () {
          setMsg(msg, "Something went wrong — please try again later.", false);
        });
      } else {
        rememberLocal("aafs:subscribers", email);
        setMsg(msg, "You're on the list (demo mode — connect an email provider to go live).", true);
        form.reset();
      }
    });
  });

  // ---- Suggestion / correction form ----
  var sform = document.getElementById("suggest-form");
  if (sform) {
    var smsg = sform.querySelector(".form-msg");
    sform.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {
        type: (sform.querySelector('[name="type"]') || {}).value || "",
        subject: (sform.querySelector('[name="subject"]') || {}).value || "",
        message: (sform.querySelector('[name="message"]') || {}).value || "",
        email: (sform.querySelector('[name="email"]') || {}).value || ""
      };
      if (!data.message.trim()) { setMsg(smsg, "Please add a few words describing your suggestion.", false); return; }
      var done = function () { setMsg(smsg, "Thank you — your suggestion was received. It helps keep the content fresh.", true); sform.reset(); };
      if (AAFS.config.suggestEndpoint) {
        post(AAFS.config.suggestEndpoint, data).then(done).catch(function () {
          setMsg(smsg, "Something went wrong — please try again later.", false);
        });
      } else {
        rememberLocal("aafs:suggestions", data);
        setMsg(smsg, "Thank you — received (demo mode — connect a form endpoint to go live).", true);
        sform.reset();
      }
    });
  }
})();
