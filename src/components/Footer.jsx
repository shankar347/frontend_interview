import { conference } from "../data/siteContent"
import ceradaLogo from "../assets/ceradalogo.webp"
import "./Footer.css"

function IcoHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

function IcoAbout() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IcoSession() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function IcoPaper() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function IcoReg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M3 21v-1a6 6 0 016-6M16 11h6M19 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IcoPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.9v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.86.3 1.7.54 2.5a2 2 0 01-.45 2.11L8.09 10a16 16 0 006 6l1.67-1.11a2 2 0 012.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0122 16.9z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IcoMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IcoFB() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

function IcoYT() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75v.5a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25v-.5a29 29 0 00-.46-5.33zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  )
}

function IcoIG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  )
}

function IcoX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IcoLI() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IcoWA() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const navLinks = [
  { href: "#hero", label: "Home", Icon: IcoHome },
  { href: "#welcome", label: "About", Icon: IcoAbout },
  { href: "#tracks", label: "Session", Icon: IcoSession },
  { href: "#deadlines", label: "Paper Submission", Icon: IcoPaper },
  { href: "#registration", label: "Registration", Icon: IcoReg },
]

const socialLinks = [
  { href: "#footer", label: "Facebook", Icon: IcoFB },
  { href: "#footer", label: "Youtube", Icon: IcoYT },
  { href: "#footer", label: "Instagram", Icon: IcoIG },
  { href: "#footer", label: "Twitter", Icon: IcoX },
  { href: "#footer", label: "LinkedIn", Icon: IcoLI },
  { href: "#footer", label: "Whatsapp", Icon: IcoWA },
]

export default function Footer() {
  return (
    <footer id="footer" className="ft">
      <div className="ft__inner">
        <div>
          <img src={ceradaLogo} alt="CERADA" className="ft__brand-logo" width={88} height={88} />
          <p className="ft__title">{conference.fullTitle}</p>
          <p className="ft__theme">
            Theme: <span style={{ fontStyle: "italic" }}>“{conference.theme}”</span>
          </p>
          <p className="ft__org">
            <strong style={{ color: "#cbd5e1" }}>Organized by:</strong> {conference.organizer}
          </p>
        </div>

        <div>
          <p className="ft__col-title">Explore</p>
          <ul className="ft__links">
            {navLinks.map(({ href, label, Icon }) => (
              <li key={href + label}>
                <a className="ft__link" href={href}>
                  <Icon />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="ft__col-title">Social</p>
          <ul className="ft__links ft__social">
            {socialLinks.map(({ href, label, Icon }) => (
              <li key={label}>
                <a className="ft__link" href={href}>
                  <Icon />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="ft__col-title">Contact</p>
          <div className="ft__contact">
            <a href={`tel:${conference.phone.replace(/\s/g, "")}`}>
              <IcoPhone />
              {conference.phone}
            </a>
            <a href={`mailto:${conference.email}`}>
              <IcoMail />
              {conference.email}
            </a>
          </div>
          <hr className="ft__hr" />
          <p className="ft__addr-label">Organizer Address</p>
          <p className="ft__addr">{conference.organizerAddress}</p>
        </div>
      </div>

      <p className="ft__bottom">© {new Date().getFullYear()} CERADA. All Rights Reserved.</p>
    </footer>
  )
}
