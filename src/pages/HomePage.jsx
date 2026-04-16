import CountdownTimer from "../components/CountdownTimer"
import PartnerLogoMarquee from "../components/PartnerLogoMarquee"
import {
  conference,
  conferenceStartISO,
  deadlines,
  heroVideoMp4Remote,
  highlights,
  publicationNote,
  themeNarrative,
  themeSeekPillars,
  welcomeParagraphs,
  whyJoin,
  whyJoinIntro,
} from "../data/siteContent"
import { sessionTrackCards } from "../data/sessionTrackMedia"
import heroWebm from "../assets/icaebms-hero-video.webm"
import scopusLogo from "../assets/scopus-logo.webp"
import sjrLogo from "../assets/sjr-logo.webp"
import "./HomePage.css"

const targetDate = new Date(conferenceStartISO)

function ordinalSuffix(n) {
  const j = n % 10
  const k = n % 100
  if (j === 1 && k !== 11) return "st"
  if (j === 2 && k !== 12) return "nd"
  if (j === 3 && k !== 13) return "rd"
  return "th"
}

function parseDeadlineParts(dateStr) {
  const m = /^(\d{1,2})\s+(\w+)\s+(\d{4})$/.exec(dateStr.trim())
  if (!m) return { day: "—", suf: "", monYear: dateStr }
  const d = parseInt(m[1], 10)
  return { day: String(d), suf: ordinalSuffix(d), monYear: `${m[2]} ${m[3]}` }
}

function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function IconSpark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconInfinity() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 12a3.5 3.5 0 107 0 3.5 3.5 0 10-7 0zm7 0h4a3.5 3.5 0 110 7 3.5 3.5 0 110-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconPlus() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Line icons for “Why join” cards — cycles with accent colour. */
function JoinCardIcon({ kind }) {
  const s = "currentColor"
  const w = 2
  switch (kind) {
    case "globe":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke={s} strokeWidth={w} />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={s} strokeWidth={w} />
        </svg>
      )
    case "users":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={s} strokeWidth={w} />
        </svg>
      )
    case "bulb":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 13c.5.8 1 1.5 1 3h6c0-1.5.5-2.2 1-3a7 7 0 00-4-13z" stroke={s} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "trend":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M23 6L13.5 15.5 8.5 10.5 1 18" stroke={s} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 6h6v6" stroke={s} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

const JOIN_CARD_ACCENTS = ["blue", "violet", "orange", "emerald"]
const JOIN_CARD_ICONS = ["globe", "users", "bulb", "trend"]

function SeekPillarIcon({ name }) {
  const stroke = "currentColor"
  const sw = 2
  switch (name) {
    case "users":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" stroke={stroke} strokeWidth={sw} />
        </svg>
      )
    case "building":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v0M9 13v0M9 17v0M13 13v0M13 17v0" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      )
    case "book":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 016.5 22H20v-20H6.5A2.5 2.5 0 004 4.5v15z" stroke={stroke} strokeWidth={sw} />
        </svg>
      )
    case "target":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth={sw} />
          <circle cx="12" cy="12" r="6" stroke={stroke} strokeWidth={sw} />
          <circle cx="12" cy="12" r="2" fill={stroke} />
        </svg>
      )
    case "bulb":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 13c.5.8 1 1.5 1 3h6c0-1.5.5-2.2 1-3a7 7 0 00-4-13z" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

function DeadlineGlyph({ type }) {
  const stroke = "currentColor"
  const sw = 1.75
  switch (type) {
    case "bird":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M16 7h.5M4 20h16M6 16l-2-4 4-2 2 4-4 2zm8-6l2-2 2 2-2 2-2-2z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "abstract":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 20h9M3 20h3M7 4l10 16M9 4h6l-3 16" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      )
    case "paper":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={stroke} strokeWidth={sw} />
          <path d="M14 2v6h6M8 13h8M8 17h6" stroke={stroke} strokeWidth={sw} />
        </svg>
      )
    case "calendar":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="5" width="18" height="16" rx="2" stroke={stroke} strokeWidth={sw} />
          <path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

function HighlightIcon({ name, color }) {
  const c = color
  switch (name) {
    case "users":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" stroke={c} strokeWidth="2" />
        </svg>
      )
    case "globe":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10" stroke={c} strokeWidth="2" />
        </svg>
      )
    case "file":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={c} strokeWidth="2" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={c} strokeWidth="2" />
        </svg>
      )
    case "mic":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6v6a3 3 0 003 3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "panels":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="4" width="7" height="7" rx="1" stroke={c} strokeWidth="2" />
          <rect x="14" y="4" width="7" height="7" rx="1" stroke={c} strokeWidth="2" />
          <rect x="3" y="13" width="18" height="7" rx="1" stroke={c} strokeWidth="2" />
        </svg>
      )
    case "network":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="5" cy="6" r="2" stroke={c} strokeWidth="2" />
          <circle cx="19" cy="6" r="2" stroke={c} strokeWidth="2" />
          <circle cx="12" cy="18" r="2" stroke={c} strokeWidth="2" />
          <path d="M5 8v2a7 7 0 007 7M19 8v2a7 7 0 01-7 7" stroke={c} strokeWidth="2" />
        </svg>
      )
    case "award":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="6" stroke={c} strokeWidth="2" />
          <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case "grad":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M22 10l-10-5L2 10l10 5 10-5zM6 12v5c0 2 3 4 6 4s6-2 6-4v-5" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

export default function HomePage() {
  const welcomeBody = welcomeParagraphs

  return (
    <div className="home">
      <section className="home-hero" id="hero" aria-label="Conference hero">
        <div className="home-hero__bg" aria-hidden>
          <div className="home-hero__veil" />
          <div className="home-hero__noise" />
        </div>

        <div className="home-hero__inner">
          <div>
            <p className="home-hero__kicker">ICAEBMS · 2026</p>
            <h1 className="home-hero__title">
              <strong>{conference.fullTitle}</strong>
            </h1>
            <p className="home-hero__theme">
              Theme: <span style={{ fontStyle: "italic" }}>{conference.theme}</span>
            </p>
            <p className="home-hero__hybrid">{conference.format}</p>
            <p className="home-hero__meta">
              <strong>Organized by:</strong> {conference.organizer}
              <br />
              <strong>ISBN:</strong> {conference.isbn}
            </p>
            <div className="home-hero__badges">
              <span className="home-badge">
                <IconCalendar />
                Date: {conference.dates}
              </span>
              <span className="home-badge">
                <IconPin />
                Location: {conference.location}
              </span>
            </div>
            <div className="home-hero__cd-wrap">
              <CountdownTimer targetDate={targetDate} />
            </div>
          </div>

          <aside className="home-hero-card" aria-label="Conference video">
            <div className="home-hero-card__video-shell">
              <div className="home-hero-card__video-inner">
                <video
                  className="home-hero-card__player"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                >
                  <source src={heroVideoMp4Remote} type="video/mp4" />
                  <source src={heroWebm} type="video/webm" />
                </video>
              </div>
              <div className="home-hero-card__caption">
                <div className="home-hero-card__lines">
                  Conference · In Person + Online
                  <span className="home-hero-card__sub">Date: {conference.dates}</span>
                  <span className="home-hero-card__sub">Location: {conference.location}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <PartnerLogoMarquee />

      <section className="home-section home-section--alt home-welcome" id="welcome">
        <div className="home-wrap home-welcome__grid">
          <div className="home-welcome__main">
            <h2 className="home-h2 home-welcome__title">Welcome to ICAEBMS-2026</h2>
            <p className="home-welcome__lead">
              We warmly welcome you to the{" "}
              <strong className="home-welcome__accent">
                International Conference on Applied Science, Engineering, Education, Business, Management and Social
                Science & Humanities (ICAEBMS-2026).
              </strong>
            </p>
            {welcomeBody.map((p, i) => (
              <p key={i} className="home-p">
                {p}
              </p>
            ))}
          </div>
          <div className="home-welcome__aside">
            <div className="home-feat home-feat--blue">
              <div className="home-feat__icon" aria-hidden>
                <IconGlobe />
              </div>
              <h3 className="home-feat__title">Global platform</h3>
              <p className="home-feat__text">Connecting minds from every corner of the world.</p>
            </div>
            <div className="home-feat home-feat--orange">
              <div className="home-feat__icon" aria-hidden>
                <IconSpark />
              </div>
              <h3 className="home-feat__title">Innovation hub</h3>
              <p className="home-feat__text">Where bold ideas meet research, practice and policy.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-theme" id="theme">
        <div className="home-wrap">
          <div className="home-theme__top">
            <div className="home-theme__copy">
              <h2 className="home-h2">Conference theme</h2>
              <p className="home-theme__quote">“{conference.theme}”</p>
              <p className="home-p">{themeNarrative}</p>
            </div>
            <div className="home-theme__side">
              <div className="home-mini home-mini--blue">
                <IconInfinity />
                <span>Creativity</span>
              </div>
              <div className="home-mini home-mini--orange">
                <IconPlus />
                <span>Collaboration</span>
              </div>
            </div>
          </div>

          <h3 className="home-theme__seek">Through this theme, ICAEBMS-2026 seeks:</h3>
          <div className="home-seek-grid">
            {themeSeekPillars.map((card) => (
              <article
                key={card.id}
                className={`home-seek-card${card.wide ? " home-seek-card--wide" : ""}${card.accent ? " home-seek-card--accent" : ""}`}
              >
                <div className="home-seek-card__icon" aria-hidden>
                  <SeekPillarIcon name={card.icon} />
                </div>
                <div>
                  <h4 className="home-seek-card__title">{card.title}</h4>
                  <p className="home-seek-card__desc">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--alt home-highlights" id="highlights">
        <div className="home-wrap">
          <h2 className="home-h2 home-highlights__title">Key highlights of ICAEBMS</h2>
          <ul className="home-hl-list">
            {highlights.map((h, i) => {
              const n = String(i + 1).padStart(2, "0")
              const warm = i % 2 === 1
              const tone = warm ? "warm" : "cool"
              return (
                <li key={h.title} className={`home-hl home-hl--${tone}`}>
                  <span className="home-hl__water" aria-hidden>
                    {n}
                  </span>
                  <div className="home-hl__rail" aria-hidden />
                  <div className="home-hl__inner">
                    <div className={`home-hl__icon home-hl__icon--${tone}`} aria-hidden>
                      <HighlightIcon name={h.icon} color="currentColor" />
                    </div>
                    <div className="home-hl__copy">
                      <h3 className="home-hl__heading">{h.title}</h3>
                      <p className="home-hl__text">{h.body}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="home-section home-stracks" id="tracks">
        <div className="home-wrap">
          <h2 className="home-h2 home-stracks__title">Session tracks / call for papers</h2>
          <p className="home-stracks__intro">
            We invite researchers, academicians and professionals to submit their papers. Topics of interest include,
            but are not limited to, the following sessions — anchored on{" "}
            <strong className="home-stracks__theme">“{conference.theme}”</strong>.
          </p>
          <p className="home-p home-stracks__sub">Topics of interest include, but are not limited to:</p>
          <div className="home-stracks__grid">
            {sessionTrackCards.map((t) => (
              <article key={t.session} className="home-stcard">
                <div className="home-stcard__media">
                  <img src={t.image} alt="" className="home-stcard__img" loading="lazy" />
                  <div className="home-stcard__media-veil" aria-hidden />
                </div>
                <div className="home-stcard__panel">
                  <p className="home-stcard__label">Session {t.session}</p>
                  <h3 className="home-stcard__name">{t.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--alt home-deadlines" id="deadlines">
        <div className="home-wrap">
          <h2 className="home-h2 home-deadlines__title">Submission deadlines</h2>
          <p className="home-deadlines__tag">Secure your spot — mark your calendar.</p>
          <div className="home-dcal-grid">
            {deadlines.map((d) => {
              const { day, suf, monYear } = parseDeadlineParts(d.date)
              const accent = Boolean(d.accentDate)
              return (
                <article key={d.label} className="home-dcal">
                  <div className="home-dcal__rings" aria-hidden>
                    <span />
                    <span />
                  </div>
                  <div className="home-dcal__head">
                    <span className="home-dcal__glyph" aria-hidden>
                      <DeadlineGlyph type={d.icon} />
                    </span>
                    <h3 className="home-dcal__label">{d.label}</h3>
                  </div>
                  <div className={`home-dcal__body${accent ? " home-dcal__body--accent" : ""}`}>
                    <div className="home-dcal__dayblock">
                      <span className="home-dcal__day">{day}</span>
                      <span className="home-dcal__suf">{suf}</span>
                    </div>
                    <p className="home-dcal__my">{monYear}</p>
                  </div>
                </article>
              )
            })}
          </div>
          <p className="home-p home-deadlines__foot">
            For detailed submission guidelines, please visit the submission page when published.
          </p>
        </div>
      </section>

      <section className="home-section home-join" id="why-join">
        <div className="home-wrap home-join__wrap">
          <h2 className="home-join__title">Why join us at ICAEBMS?</h2>
          <p className="home-join__intro">{whyJoinIntro}</p>
          <p className="home-join__sub">Benefits of joining ICAEBMS</p>
          <ul className="home-join__grid">
            {whyJoin.map((line, i) => {
              const parts = line.split(" — ")
              const head = parts[0]
              const detail = parts.length > 1 ? parts.slice(1).join(" — ") : ""
              const n = String(i + 1).padStart(2, "0")
              const accent = JOIN_CARD_ACCENTS[i % JOIN_CARD_ACCENTS.length]
              const iconKind = JOIN_CARD_ICONS[i % JOIN_CARD_ICONS.length]
              const lead = i === 0
              return (
                <li
                  key={line}
                  className={`home-join-card home-join-card--${accent}${lead ? " home-join-card--lead" : ""}`}
                >
                  <span className="home-join-card__num">{n}</span>
                  <div className="home-join-card__icon" aria-hidden>
                    <JoinCardIcon kind={iconKind} />
                  </div>
                  <p className="home-join-card__head">{head}</p>
                  {detail ? <p className="home-join-card__detail">{detail}</p> : null}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      <section className="home-section" id="publications">
        <div className="home-wrap">
          <div className="home-pub2">
            <h2 className="home-pub2__title">Proceedings &amp; Publications</h2>
            <div className="home-pub2__rule" aria-hidden />
            <div className="home-pub2__badges">
              <div className="home-pub2__badge">
                <img src={scopusLogo} alt="Scopus" width={120} height={40} />
              </div>
              <div className="home-pub2__badge home-pub2__badge--sjr">
                <img src={sjrLogo} alt="SCImago Journal Rank (SJR)" width={100} height={48} />
              </div>
            </div>
            <div className="home-pub2__note">
              <p>
                <strong>Note:</strong> {publicationNote}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
