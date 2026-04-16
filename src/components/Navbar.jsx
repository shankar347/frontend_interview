import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { conference } from "../data/siteContent"
import GOOGLE_TRANSLATE_LANGUAGE_OPTIONS from "../data/googleTranslateLanguageOptions.json"
import "./Navbar.css"
import logoImg from "../assets/icaebmslogo.png"
import imgTranslate from "../assets/google-translate-DD3XrOIL.webp"
import imgRegister from "../assets/register-now-B2uMY2n7.webp"
import imgMail from "../assets/mail-CEoCDBNb.webp"
import imgCall from "../assets/call-4IqBhOx_.webp"
import imgPartner from "../assets/apply-for-academic-partner-MN3cTTIw.webp"

const HYBRID_COPY = conference.hybridNotice

const navItems = [
  {
    label: "About",
    href: "#welcome",
    dropdown: true,
    children: [
      { label: "Conference overview", href: "#welcome" },
      { label: "Organizing committee", href: "#welcome" },
      { label: "Important dates", href: "#deadlines" },
    ],
  },
  {
    label: "Session Tracks",
    href: "#highlights",
    dropdown: true,
    children: [
      { label: "Applied science", href: "#highlights" },
      { label: "Engineering & technology", href: "#highlights" },
      { label: "Education & pedagogy", href: "#highlights" },
      { label: "Business & management", href: "#highlights" },
    ],
  },
  {
    label: "Paper Submission",
    href: "#deadlines",
    dropdown: true,
    children: [
      { label: "Author guidelines", href: "#deadlines" },
      { label: "Abstract submission", href: "#deadlines" },
      { label: "Full paper submission", href: "#deadlines" },
    ],
  },
  { label: "Publication", href: "#publications", dropdown: false },
  {
    label: "Registration",
    href: "#registration",
    dropdown: true,
    children: [
      { label: "Registration Fee", href: "#registration", highlight: true },
      { label: "Available Payment Methods", href: "#registration" },
      { label: "Registration Instruction", href: "#registration" },
      { label: "Terms and Conditions", href: "#registration" },
    ],
  },
  { label: "Exhibits and Sponsors", href: "#footer", dropdown: false },
  { label: "FAQ", href: "#footer", dropdown: false },
  { label: "Venue", href: "#hero", dropdown: false },
  { label: "Contact Us", href: "#footer", dropdown: false },
]

function IconChevronDown() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden style={{ marginLeft: 5, opacity: 0.95 }}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function UtilityLink({ href, children, iconSrc, target, rel }) {
  return (
    <a href={href} target={target} rel={rel} className="icaebms-util-link">
      <img src={iconSrc} alt="" loading="lazy" />
      <span>{children}</span>
    </a>
  )
}

function MobileUtilityAction({ href, children, iconSrc, target, rel, onClick }) {
  return (
    <a href={href} target={target} rel={rel} className="icaebms-mob-util-link" onClick={onClick}>
      <img src={iconSrc} alt="" loading="lazy" />
      <span>{children}</span>
    </a>
  )
}

function parseGoogtransLang() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/(?:auto|en)\/([^;]+)/)
  return m ? decodeURIComponent(m[1].trim()) : ""
}

function clearGoogtransCookies() {
  const path = "/"
  const expires = "Thu, 01 Jan 1970 00:00:00 GMT"
  document.cookie = `googtrans=;path=${path};expires=${expires}`
  const host = window.location.hostname
  if (host) {
    document.cookie = `googtrans=;path=${path};domain=${host};expires=${expires}`
    document.cookie = `googtrans=;path=${path};domain=.${host};expires=${expires}`
  }
}

function setGoogtransCookie(langCode) {
  const path = "/"
  if (!langCode) {
    clearGoogtransCookies()
    return
  }
  document.cookie = `googtrans=/en/${langCode};path=${path}`
}

function LanguagePicker({ id, "aria-label": ariaLabel, options, value, onChange, selectExtraStyle, rowClassName }) {
  const wide = selectExtraStyle?.width === "100%"
  return (
    <div className={`icaebms-lang-row${rowClassName ? ` ${rowClassName}` : ""}${wide ? " icaebms-lang-row--stretch" : ""}`.trim()}>
      <div className="icaebms-lang-icon" aria-hidden>
        <img src={imgTranslate} alt="" width={24} height={24} />
      </div>
      <select
        id={id}
        className={`goog-te-combo icaebms-lang-select icaebms-lang-select--ui${wide ? " icaebms-lang-select--wide" : ""}`}
        aria-label={ariaLabel}
        style={selectExtraStyle || undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o, i) => (
          <option key={`${i}-${o.value}`} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [spacerH, setSpacerH] = useState(152)
  const [selectedLang, setSelectedLang] = useState("")
  const navWrapRef = useRef(null)
  const translateInitRef = useRef(false)
  const langSelectionSyncedRef = useRef(false)

  useLayoutEffect(() => {
    const el = navWrapRef.current
    if (!el) return
    const update = () => setSpacerH(el.offsetHeight)
    update()
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(update)
      ro.observe(el)
      return () => ro.disconnect()
    }
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [menuOpen])

  useEffect(() => {
    const cookieLang = parseGoogtransLang()
    if (cookieLang) setSelectedLang(cookieLang)
  }, [])

  useEffect(() => {
    const styleId = "navbar-google-translate-styles"
    if (!document.getElementById(styleId)) {
      const st = document.createElement("style")
      st.id = styleId
      st.textContent = `
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0 !important; }
        body.translated-ltr, body.translated-rtl { top: 0 !important; }
        .goog-te-banner-frame { display: none !important; }
        #icaebms_google_translate_host {
          position: absolute !important;
          left: -9999px !important;
          top: 0 !important;
          width: 320px !important;
          height: 48px !important;
          overflow: hidden !important;
          clip: rect(0,0,0,0) !important;
          clip-path: inset(50%) !important;
          white-space: nowrap !important;
          border: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
          pointer-events: none !important;
        }
        #icaebms_google_translate_host .goog-te-gadget,
        #icaebms_google_translate_host .goog-te-gadget-simple {
          font-family: Inter, system-ui, sans-serif !important;
          font-size: 1px !important;
        }
        #icaebms_google_translate_host .goog-te-gadget-simple > span:first-of-type {
          display: none !important;
        }
        #icaebms_google_translate_host .goog-logo-link,
        #icaebms_google_translate_host .goog-te-gadget-icon,
        #icaebms_google_translate_host a.goog-logo-link,
        #icaebms_google_translate_host .goog-te-gadget-simple a[href*="translate.google.com"]:not(.goog-te-combo) {
          display: none !important;
          visibility: hidden !important;
          width: 0 !important;
          height: 0 !important;
          opacity: 0 !important;
          pointer-events: none !important;
          position: absolute !important;
          clip: rect(0,0,0,0) !important;
        }
        #icaebms_google_translate_host .goog-logo-link img {
          display: none !important;
        }
        #icaebms_google_translate_host select.goog-te-combo {
          position: absolute !important;
          left: -9999px !important;
          opacity: 0 !important;
          width: 4px !important;
          height: 4px !important;
          pointer-events: none !important;
        }
      `
      document.head.appendChild(st)
    }
  }, [])

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (translateInitRef.current) return
      if (!window.google?.translate?.TranslateElement) return
      const host = document.getElementById("icaebms_google_translate_host")
      if (!host || host.querySelector(".goog-te-gadget")) return
      translateInitRef.current = true
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
          },
          "icaebms_google_translate_host",
        )
      } catch {
        translateInitRef.current = false
      }
    }

    const t = window.setTimeout(() => {
      const scriptId = "google-translate-script"
      let script = document.getElementById(scriptId)
      if (!script) {
        script = document.createElement("script")
        script.id = scriptId
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        script.async = true
        document.body.appendChild(script)
      } else if (window.google?.translate?.TranslateElement) {
        window.googleTranslateElementInit()
      }
    }, 0)

    return () => window.clearTimeout(t)
  }, [])

  /** Hide Google branding; keep hidden combo for programmatic translate. */
  useEffect(() => {
    const host = document.getElementById("icaebms_google_translate_host")
    if (!host) return undefined

    const stripBranding = () => {
      host.querySelectorAll(".goog-logo-link, .goog-te-gadget-icon").forEach((el) => {
        Object.assign(el.style, {
          display: "none",
          visibility: "hidden",
          width: "0",
          height: "0",
          opacity: "0",
          position: "absolute",
          pointerEvents: "none",
        })
      })
      host.querySelectorAll('a[href*="translate.google.com"]').forEach((el) => {
        if (el.classList.contains("goog-te-combo")) return
        Object.assign(el.style, { display: "none", visibility: "hidden", pointerEvents: "none" })
      })
      host.querySelectorAll(".goog-logo-link img, a.goog-logo-link img").forEach((el) => {
        Object.assign(el.style, { display: "none", visibility: "hidden" })
      })
    }

    const syncHiddenComboFromCookie = () => {
      const combo = host.querySelector("select.goog-te-combo")
      if (!combo) return false
      stripBranding()
      if (!langSelectionSyncedRef.current) {
        langSelectionSyncedRef.current = true
        const fromCookie = parseGoogtransLang()
        const v = fromCookie || combo.value || ""
        setSelectedLang(v)
        if (fromCookie && combo.value !== fromCookie) {
          combo.value = fromCookie
          combo.dispatchEvent(new Event("change", { bubbles: true }))
        }
      }
      return true
    }

    if (syncHiddenComboFromCookie()) {
      stripBranding()
    }
    const ob = new MutationObserver(() => {
      window.requestAnimationFrame(() => {
        stripBranding()
        syncHiddenComboFromCookie()
      })
    })
    ob.observe(host, { childList: true, subtree: true })
    const poll = window.setTimeout(() => {
      stripBranding()
      syncHiddenComboFromCookie()
    }, 100)
    const poll2 = window.setTimeout(() => {
      stripBranding()
      syncHiddenComboFromCookie()
    }, 800)
    return () => {
      ob.disconnect()
      window.clearTimeout(poll)
      window.clearTimeout(poll2)
    }
  }, [])

  const applyLanguage = (code) => {
    const next = code || ""
    setSelectedLang(next)
    const host = document.getElementById("icaebms_google_translate_host")
    const combo = host?.querySelector("select.goog-te-combo")
    if (combo) {
      const inCombo = !next || Array.from(combo.options).some((o) => o.value === next)
      if (inCombo) {
        combo.value = next
        combo.dispatchEvent(new Event("change", { bubbles: true }))
        if (!next) clearGoogtransCookies()
        return
      }
    }
    if (!next) {
      clearGoogtransCookies()
      window.location.reload()
      return
    }
    setGoogtransCookie(next)
    window.location.reload()
  }

  return (
    <>
      <div ref={navWrapRef} className="icaebms-nav-root">
        <div className="icaebms-nav-ticker" role="note">
          <div className="icaebms-marquee-wrap">
            <div className="icaebms-marquee-track" aria-live="polite">
              <span>{HYBRID_COPY}</span>
              <span aria-hidden>{HYBRID_COPY}</span>
            </div>
          </div>
        </div>

        <div className="icaebms-nav-tools">
          <div className="icaebms-nav-tools-inner icaebms-utility-bar-row">
            <div className="icaebms-translate-cluster-desktop icaebms-translate-cluster">
              <LanguagePicker
                id="icaebms-lang-desktop"
                aria-label="Language Translate Widget"
                options={GOOGLE_TRANSLATE_LANGUAGE_OPTIONS}
                value={selectedLang}
                onChange={applyLanguage}
              />
            </div>
            <div className="icaebms-utility-links-row icaebms-util-links">
              <UtilityLink href="#deadlines" iconSrc={imgRegister}>
                Register Now
              </UtilityLink>
              <UtilityLink href={`mailto:${conference.email}`} iconSrc={imgMail}>
                {conference.email}
              </UtilityLink>
              <UtilityLink href={`https://wa.me/${conference.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" iconSrc={imgCall}>
                {conference.phone}
              </UtilityLink>
              <UtilityLink href="#footer" iconSrc={imgPartner}>
                Apply for Academic Partner
              </UtilityLink>
            </div>
          </div>
        </div>

        <nav className="icaebms-nav-bar" aria-label="Main">
          <div className="icaebms-nav-bar-inner">
            <a href="#hero" className="icaebms-logo">
              <img src={logoImg} alt="ICAEBMS" className="icaebms-logo-img" />
            </a>

            <button
              type="button"
              className="icaebms-menu-btn icaebms-nav-burger"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>

            <div className="icaebms-desktop-nav">
              <ul className="icaebms-nav-list">
                {navItems.map((item) =>
                  item.dropdown && item.children ? (
                    <li key={item.label} className="icaebms-nav-dd">
                      <a href={item.href} className="icaebms-nav-dd-trigger">
                        {item.label}
                        <IconChevronDown />
                      </a>
                      <div className="icaebms-nav-dd-panel" role="menu">
                        <div className="icaebms-nav-dd-panel-inner">
                          {item.children.map((c) => (
                            <a
                              key={c.label}
                              href={c.href}
                              className={`icaebms-nav-dd-link${c.highlight ? " icaebms-nav-dd-link--accent" : ""}`}
                              role="menuitem"
                            >
                              {c.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li key={item.label} style={{ listStyle: "none" }}>
                      <a href={item.href} className="icaebms-nav-link">
                        {item.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <a href="#deadlines" className="icaebms-login-desktop icaebms-nav-cta">
              Login
            </a>
          </div>

          {menuOpen ? (
            <div className="icaebms-mobile-panel">
              <div className="icaebms-mobile-lang">
                <LanguagePicker
                  id="icaebms-lang-mobile"
                  aria-label="Language Translate Widget"
                  options={GOOGLE_TRANSLATE_LANGUAGE_OPTIONS}
                  value={selectedLang}
                  selectExtraStyle={{ width: "100%", maxWidth: "100%", minWidth: 0, flex: 1 }}
                  onChange={(code) => {
                    applyLanguage(code)
                    setMenuOpen(false)
                  }}
                />
              </div>
              {navItems.map((item) => (
                <div key={item.label}>
                  <a href={item.href} className="icaebms-mob-link" onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                  {item.children
                    ? item.children.map((c) => (
                        <a key={c.label} href={c.href} className="icaebms-mob-sub" onClick={() => setMenuOpen(false)}>
                          {c.label}
                        </a>
                      ))
                    : null}
                </div>
              ))}
              <p className="icaebms-mobile-only-util icaebms-mobile-util-label">Register &amp; contact</p>
              <MobileUtilityAction
                href="#deadlines"
                iconSrc={imgRegister}
                onClick={() => {
                  setMenuOpen(false)
                }}
              >
                Register Now
              </MobileUtilityAction>
              <MobileUtilityAction
                href={`mailto:${conference.email}`}
                iconSrc={imgMail}
                onClick={() => {
                  setMenuOpen(false)
                }}
              >
                {conference.email}
              </MobileUtilityAction>
              <MobileUtilityAction
                href={`tel:${conference.phone.replace(/\D/g, "")}`}
                iconSrc={imgCall}
                onClick={() => {
                  setMenuOpen(false)
                }}
              >
                {conference.phone}
              </MobileUtilityAction>
              <MobileUtilityAction
                href="#footer"
                iconSrc={imgPartner}
                onClick={() => {
                  setMenuOpen(false)
                }}
              >
                Apply for Academic Partner
              </MobileUtilityAction>
              <a href="#deadlines" className="icaebms-nav-cta icaebms-nav-cta--block" onClick={() => setMenuOpen(false)}>
                Login
              </a>
            </div>
          ) : null}
        </nav>
      </div>

      <div style={{ height: spacerH, flexShrink: 0 }} aria-hidden="true" />
    </>
  )
}
