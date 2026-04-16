import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { conference } from "../data/siteContent"
import GOOGLE_TRANSLATE_LANGUAGE_OPTIONS from "../data/googleTranslateLanguageOptions.json"
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

const royalBlue = "#003399"
const loginOrange = "#d35400"
const stripBrown = "#9a4a12"

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

function UtilityLink({ href, children, iconSrc, target, rel, onMouseEnter, onMouseLeave }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: "#0f2744",
        textDecoration: "none",
        fontSize: 13,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={iconSrc} alt="" width={32} height={32} style={{ display: "block", flexShrink: 0, objectFit: "contain" }} loading="lazy" />
      <span>{children}</span>
    </a>
  )
}

const mobileActionStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "11px 8px",
  color: "#f1f5f9",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 14,
  borderBottom: "1px solid rgba(255,255,255,0.1)",
}

function MobileUtilityAction({ href, children, iconSrc, target, rel, onClick }) {
  return (
    <a href={href} target={target} rel={rel} style={mobileActionStyle} onClick={onClick}>
      <img src={iconSrc} alt="" width={28} height={28} style={{ display: "block", flexShrink: 0, objectFit: "contain" }} loading="lazy" />
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

const langRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  flexShrink: 0,
  minWidth: 0,
}

const langIconBoxStyle = {
  width: 40,
  height: 40,
  borderRadius: 8,
  background: "#2563eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
}

const langSelectStyle = {
  fontWeight: 700,
  fontSize: 14,
  color: "#000",
  border: "1px solid #c5ccd8",
  borderRadius: 8,
  padding: "8px 36px 8px 12px",
  minWidth: 200,
  maxWidth: "min(280px, 100%)",
  background: "#fff",
  cursor: "pointer",
  appearance: "auto",
  WebkitAppearance: "menulist",
  fontFamily: "inherit",
  lineHeight: 1.25,
}

function LanguagePicker({ id, "aria-label": ariaLabel, options, value, onChange, selectExtraStyle, rowExtraStyle }) {
  const selectStyle = selectExtraStyle ? { ...langSelectStyle, ...selectExtraStyle } : langSelectStyle
  const rowStyle = rowExtraStyle ? { ...langRowStyle, ...rowExtraStyle } : langRowStyle
  return (
    <div style={rowStyle}>
      <div style={langIconBoxStyle} aria-hidden>
        <img src={imgTranslate} alt="" width={28} height={28} style={{ display: "block", objectFit: "contain" }} />
      </div>
      <select
        id={id}
        className="goog-te-combo icaebms-lang-select"
        aria-label={ariaLabel}
        style={selectStyle}
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

  const linkDefault = "#0f2744"
  const linkHover = royalBlue

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

  const logoShadow = "0 2px 10px rgba(0, 51, 153, 0.12)"

  const s = {
    fixedWrap: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      fontFamily: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      boxShadow: "0 4px 20px rgba(0, 40, 90, 0.2)",
    },
    strip: {
      background: `linear-gradient(180deg, ${stripBrown} 0%, #b85714 50%, #c45c12 100%)`,
      color: "#fff",
      fontSize: 12,
      fontWeight: 700,
      lineHeight: 1.5,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      overflow: "hidden",
      borderBottom: "1px solid rgba(0,0,0,0.12)",
    },
    utility: {
      backgroundColor: "#f5f5f0",
      borderBottom: "1px solid #dcdcd4",
    },
    utilityRow: {
      maxWidth: 1320,
      margin: "0 auto",
      padding: "11px 20px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 14,
    },
    translateCluster: { display: "flex", alignItems: "center", gap: 10, minWidth: 0 },
    utilityLinks: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "11px 20px",
    },
    navMain: {
      position: "relative",
      backgroundColor: royalBlue,
      color: "#fff",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
    },
    navRow: {
      maxWidth: 1320,
      margin: "0 auto",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    logoBox: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      backgroundColor: "#fff",
      borderRadius: 2,
      padding: "6px 12px",
      textDecoration: "none",
      boxShadow: logoShadow,
      border: `1px solid ${royalBlue}`,
      flexShrink: 0,
    },
    logoImg: {
      height: 54,
      width: "auto",
      maxWidth: 200,
      objectFit: "contain",
      display: "block",
      flexShrink: 0,
    },
    navList: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "stretch",
      justifyContent: "center",
      gap: 0,
    },
    navLinkSimple: {
      display: "inline-flex",
      alignItems: "center",
      color: "#e8eef7",
      textDecoration: "none",
      fontSize: 13,
      fontWeight: 600,
      padding: "10px 12px",
      whiteSpace: "nowrap",
      borderRadius: 2,
      transition: "background 0.15s ease, color 0.15s ease",
    },
    loginBtn: {
      backgroundColor: loginOrange,
      color: "#fff",
      fontWeight: 700,
      fontSize: 14,
      padding: "10px 22px",
      borderRadius: 6,
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      flexShrink: 0,
    },
    menuBtn: {
      background: "rgba(255,255,255,0.12)",
      border: "1px solid rgba(255,255,255,0.28)",
      color: "#fff",
      padding: 8,
      cursor: "pointer",
      borderRadius: 6,
    },
    mobilePanel: {
      borderTop: "1px solid rgba(255,255,255,0.15)",
      padding: "10px 20px 16px",
      backgroundColor: royalBlue,
    },
    mobileLink: {
      display: "block",
      color: "#fff",
      textDecoration: "none",
      padding: "10px 8px",
      fontWeight: 600,
      fontSize: 14,
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    },
    mobileSub: {
      display: "block",
      color: "#cbd5e1",
      textDecoration: "none",
      padding: "8px 8px 8px 20px",
      fontSize: 13,
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
  }

  return (
    <>
      <style>{`
        @keyframes icaebmsMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .icaebms-marquee-wrap { overflow: hidden; width: 100%; }
        .icaebms-marquee-track {
          display: flex;
          width: max-content;
          white-space: nowrap;
          animation: icaebmsMarquee 40s linear infinite;
        }
        .icaebms-marquee-track:hover { animation-play-state: paused; }
        .icaebms-lang-select:focus {
          outline: 2px solid ${royalBlue};
          outline-offset: 2px;
        }
        .icaebms-nav-dd {
          position: relative;
          list-style: none;
        }
        .icaebms-nav-dd-trigger {
          display: inline-flex;
          align-items: center;
          color: #e8eef7;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 12px;
          white-space: nowrap;
          cursor: pointer;
          border: none;
          background: transparent;
          font-family: inherit;
          border-radius: 2px;
        }
        .icaebms-nav-dd-trigger:hover,
        .icaebms-nav-dd:hover .icaebms-nav-dd-trigger {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }
        .icaebms-nav-dd-panel {
          position: absolute;
          left: 0;
          top: 100%;
          padding-top: 6px;
          min-width: 240px;
          z-index: 10020;
          opacity: 0;
          visibility: hidden;
          transform: translateY(6px);
          transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
          pointer-events: none;
        }
        .icaebms-nav-dd-panel-inner {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 16px 48px rgba(15, 23, 42, 0.18);
          padding: 6px 0;
          overflow: hidden;
        }
        .icaebms-nav-dd-link {
          display: block;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #0f2744;
          text-decoration: none;
          border-bottom: 1px solid #f1f5f9;
        }
        .icaebms-nav-dd-link:last-child { border-bottom: none; }
        .icaebms-nav-dd-link:hover {
          background: #f0f7ff;
          color: ${royalBlue};
        }
        .icaebms-nav-dd-link--accent {
          color: ${loginOrange} !important;
          font-weight: 800 !important;
        }
        .icaebms-nav-dd-link--accent:hover {
          background: #fff7ed !important;
          color: #b84300 !important;
        }
        .icaebms-nav-dd:hover .icaebms-nav-dd-panel,
        .icaebms-nav-dd:focus-within .icaebms-nav-dd-panel {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }
        @media (max-width: 1100px) {
          .icaebms-desktop-nav { display: none !important; }
          .icaebms-menu-btn { display: block !important; }
          .icaebms-login-desktop { display: none !important; }
        }
        @media (min-width: 1101px) {
          .icaebms-desktop-nav {
            display: flex !important;
            flex: 1;
            justify-content: center;
            min-width: 0;
            padding: 0 4px;
          }
          .icaebms-menu-btn { display: none !important; }
          .icaebms-login-desktop { display: inline-flex !important; }
          .icaebms-mobile-panel { display: none !important; }
        }
        @media (max-width: 1100px) {
          .icaebms-utility-links-row { display: none !important; }
          .icaebms-utility-bar-row {
            justify-content: flex-start !important;
          }
        }
        @media (min-width: 1101px) {
          .icaebms-mobile-only-util { display: none !important; }
        }
        @media (max-width: 1100px) {
          .icaebms-translate-cluster-desktop { display: none !important; }
        }
      `}</style>

      <div ref={navWrapRef} style={s.fixedWrap}>
        <div style={s.strip} role="note">
          <div className="icaebms-marquee-wrap">
            <div className="icaebms-marquee-track" aria-live="polite">
              <span style={{ padding: "9px 56px 9px 0" }}>{HYBRID_COPY}</span>
              <span style={{ padding: "9px 56px 9px 0" }} aria-hidden>
                {HYBRID_COPY}
              </span>
            </div>
          </div>
        </div>

        <div style={s.utility}>
          <div className="icaebms-utility-bar-row" style={s.utilityRow}>
            <div className="icaebms-translate-cluster-desktop" style={s.translateCluster}>
              <LanguagePicker
                id="icaebms-lang-desktop"
                aria-label="Language Translate Widget"
                options={GOOGLE_TRANSLATE_LANGUAGE_OPTIONS}
                value={selectedLang}
                onChange={applyLanguage}
              />
            </div>
            <div className="icaebms-utility-links-row" style={s.utilityLinks}>
              <UtilityLink
                href="#deadlines"
                iconSrc={imgRegister}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = linkHover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = linkDefault
                }}
              >
                Register Now
              </UtilityLink>
              <UtilityLink
                href={`mailto:${conference.email}`}
                iconSrc={imgMail}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = linkHover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = linkDefault
                }}
              >
                {conference.email}
              </UtilityLink>
              <UtilityLink
                href={`https://wa.me/${conference.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                iconSrc={imgCall}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0d9488"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = linkDefault
                }}
              >
                {conference.phone}
              </UtilityLink>
              <UtilityLink
                href="#footer"
                iconSrc={imgPartner}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = linkHover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = linkDefault
                }}
              >
                Apply for Academic Partner
              </UtilityLink>
            </div>
          </div>
        </div>

        <nav style={s.navMain} aria-label="Main">
          <div style={s.navRow}>
            <a href="#hero" style={s.logoBox}>
              <img src={logoImg} alt="ICAEBMS" style={s.logoImg} />
            </a>

            <button
              type="button"
              className="icaebms-menu-btn"
              style={s.menuBtn}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>

            <div className="icaebms-desktop-nav">
              <ul style={s.navList}>
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
                      <a
                        href={item.href}
                        style={s.navLinkSimple}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"
                          e.currentTarget.style.color = "#fff"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent"
                          e.currentTarget.style.color = "#e8eef7"
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <a
              href="#deadlines"
              className="icaebms-login-desktop"
              style={{ ...s.loginBtn, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "none"
              }}
            >
              Login
            </a>
          </div>

          {menuOpen ? (
            <div style={s.mobilePanel} className="icaebms-mobile-panel">
              <div
                style={{
                  padding: "12px 8px 14px",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  marginBottom: 4,
                }}
              >
                <LanguagePicker
                  id="icaebms-lang-mobile"
                  aria-label="Language Translate Widget"
                  options={GOOGLE_TRANSLATE_LANGUAGE_OPTIONS}
                  value={selectedLang}
                  rowExtraStyle={{ width: "100%", alignSelf: "stretch" }}
                  selectExtraStyle={{ width: "100%", maxWidth: "100%", minWidth: 0, flex: 1 }}
                  onChange={(code) => {
                    applyLanguage(code)
                    setMenuOpen(false)
                  }}
                />
              </div>
              {navItems.map((item) => (
                <div key={item.label}>
                  <a href={item.href} style={s.mobileLink} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                  {item.children
                    ? item.children.map((c) => (
                        <a key={c.label} href={c.href} style={s.mobileSub} onClick={() => setMenuOpen(false)}>
                          {c.label}
                        </a>
                      ))
                    : null}
                </div>
              ))}
              <p
                className="icaebms-mobile-only-util"
                style={{
                  margin: "14px 8px 6px",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(226,232,240,0.65)",
                }}
              >
                Register &amp; contact
              </p>
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
              <a
                href="#deadlines"
                style={{ ...s.loginBtn, display: "block", textAlign: "center", marginTop: 12 }}
                onClick={() => setMenuOpen(false)}
              >
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
