import { partnerSliderImages } from "../data/partnerSliderImages"
import "./PartnerLogoMarquee.css"

export default function PartnerLogoMarquee() {
  const items = partnerSliderImages

  return (
    <section className="plm" aria-label="Partner and collaborating institutions">
      <div className="plm__fade plm__fade--left" aria-hidden />
      <div className="plm__fade plm__fade--right" aria-hidden />
      <div className="plm__viewport">
        <div className="plm__track">
          {[0, 1].map((dup) => (
            <ul key={dup} className="plm__row" aria-hidden={dup === 1}>
              {items.map((src, i) => (
                <li key={`${dup}-${i}`} className="plm__cell">
                  <img src={src} alt="" className="plm__img" loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
