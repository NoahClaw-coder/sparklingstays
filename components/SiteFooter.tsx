import Image from 'next/image';
import Link from 'next/link';
import services from '@/content/services.json';
import neighborhoods from '@/content/neighborhoods.json';

function SocialIcon({kind}: {kind: 'instagram' | 'facebook' | 'yelp' | 'pinterest'}) {
  const cls = 'h-4 w-4';
  if (kind === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="currentColor"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6H16V4.8c-.4-.1-1.4-.2-2.4-.2-2.4 0-4 1.4-4 4.2V11H7v3h2.2v7h4.3Z" /></svg>;
  if (kind === 'yelp') return <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="currentColor"><path d="M11.7 2.2c.7.1 1.3.6 1.5 1.3l1 5.5c.2 1-.7 1.8-1.7 1.6L8 9.7c-.8-.1-1.4-.8-1.5-1.6-.1-.8.3-1.6 1-2l2.8-1.6c.4-.2.9-.4 1.4-.3Zm6 4.7c.7.3 1.1 1 1.1 1.8 0 .6-.3 1.1-.8 1.5l-3.7 2.8c-.8.6-1.9.1-2-1l-.4-4.4c-.1-.8.3-1.5 1-1.9.5-.3 1.2-.3 1.8 0l3 1.2Zm1 7.3c.8.1 1.5.7 1.6 1.5.1.8-.3 1.6-1.1 2l-4.6 2c-1 .4-2-.5-1.7-1.6l1.1-4.2c.2-.8.9-1.3 1.7-1.3h3Zm-7.2 1.2c.9.3 1.3 1.3.8 2.2l-2.2 4.1c-.4.7-1.2 1-2 .8-.8-.3-1.3-1.1-1.2-1.9l.5-5c.1-1 1.1-1.7 2.1-1.4l2 .7Zm-4.4-3.8c.6.7.5 1.8-.3 2.3l-3.7 2.4c-.7.5-1.7.4-2.3-.2-.5-.6-.6-1.4-.2-2.1l2.2-4.1c.5-.9 1.7-1.1 2.4-.3l1.9 2Z" /></svg>;
  if (kind === 'pinterest') return <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="currentColor"><path d="M12 3C7 3 4 6.5 4 10.4c0 2.4 1.3 4.6 3.3 5.4.3.1.5.1.6-.2l.6-2.2c.1-.2 0-.4-.1-.6-.4-.5-.8-1.4-.8-2.5 0-3.2 2.4-6 6.5-6 3.5 0 5.5 2.1 5.5 4.9 0 3.7-1.7 6.9-4.1 6.9-1.4 0-2.4-1.1-2-2.5.4-1.7 1.2-3.5 1.2-4.7 0-1.1-.6-2-1.8-2-1.4 0-2.5 1.5-2.5 3.4 0 1.2.4 2 .4 2l-1.6 6.7c-.5 2 .1 4.3.1 4.5.1.1.2.1.3 0 .1-.2 1.6-2 2.1-3.8l.8-3c.4.7 1.5 1.2 2.7 1.2 3.5 0 5.9-3.2 5.9-7.4C20 6.1 16.8 3 12 3Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="currentColor"><path d="M7.8 2h8.4C19 2 22 5 22 7.8v8.4c0 2.9-3 5.8-5.8 5.8H7.8C5 22 2 19 2 16.2V7.8C2 5 5 2 7.8 2Zm-.2 2.3c-1.8 0-3.3 1.5-3.3 3.3v8.8c0 1.8 1.5 3.3 3.3 3.3h8.8c1.8 0 3.3-1.5 3.3-3.3V7.6c0-1.8-1.5-3.3-3.3-3.3H7.6Zm9.5 1.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10.1A5 5 0 0 1 12 7Zm0 2.2a2.8 2.8 0 1 0 0 5.7 2.8 2.8 0 0 0 0-5.7Z" /></svg>;
}

const footerAreas = neighborhoods.slice(0, 9);

export function SiteFooter({locale}: {locale: string}) {
  const isFr = locale === 'fr';
  return (
    <footer className="bg-[#1d2432] text-white">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.4fr_0.85fr_0.85fr_1fr]">
        <div>
          <h3 className="text-[22px] font-semibold tracking-[-0.03em]">{isFr ? 'Nous trouver' : 'Find Us'}</h3>
          <div className="mt-5 overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d359482.6604771872!2d-73.667792!3d45.906748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84f8ecad890955f%3A0x62f40adb38d71543!2sSparkling%20Stays%20-%20Montreal%20Cleaning%20Service!5e0!3m2!1sen!2sca!4v1"
              width="100%"
              height="300"
              style={{border: 0}}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sparkling Stays Montreal Location"
              className="w-full"
            />
          </div>
          <a
            href="https://www.google.com/maps/place/Sparkling+Stays+-+Montreal+Cleaning+Service/@45.906748,-73.667792,10z/data=!4m6!3m5!1s0x84f8ecad890955f:0x62f40adb38d71543!8m2!3d45.5591827!4d-73.7118733!16s%2Fg%2F11sjkdw5_m"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-[14px] text-white/70 transition hover:text-[#f2cb58]"
          >
            {isFr ? 'Ouvrir dans Maps →' : 'Open in Maps →'}
          </a>
        </div>

        <div>
          <h3 className="text-[22px] font-semibold tracking-[-0.03em]">Services</h3>
          <ul className="mt-5 space-y-3 text-[15px] text-white/70">
            {services.slice(0, 9).map((svc) => (
              <li key={svc.slug}>
                <Link href={`/${locale}/services/${svc.slug}`} className="transition hover:text-[#f2cb58]">
                  {isFr ? svc.titleFr : svc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[22px] font-semibold tracking-[-0.03em]">{isFr ? 'Secteurs' : 'Service Areas'}</h3>
          <ul className="mt-5 space-y-3 text-[15px] text-white/70">
            {footerAreas.map((area) => (
              <li key={area.slug}>
                <Link href={`/${locale}/areas/${area.slug}`} className="transition hover:text-[#f2cb58]">{area.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Image src="/media/logo.png" alt="Sparkling Stays" width={180} height={58} className="h-11 w-auto brightness-[1.2] saturate-0 invert" />
          <p className="mt-4 text-[14px] leading-6 text-white/70">
            {isFr
              ? 'Services de nettoyage résidentiel et commercial à Montréal, Laval, West Island et Rive-Sud.'
              : 'Residential and commercial cleaning services across Montreal, Laval, West Island, and South Shore.'}
          </p>
          <h3 className="mt-6 text-[22px] font-semibold tracking-[-0.03em]">{isFr ? 'Contactez-nous' : 'Contact Us'}</h3>
          <ul className="mt-5 space-y-4 text-[15px] text-white/70">
            <li><a href="tel:438-867-8770" className="transition hover:text-[#f2cb58]">{isFr ? 'Appel' : 'Call'}: 438-867-8770</a></li>
            <li><a href="mailto:info@sparklingstays.com" className="transition hover:text-[#f2cb58]">Email: info@sparklingstays.com</a></li>
          </ul>

          <div className="mt-6 flex items-center gap-4 text-white/75">
            <a href="https://www.instagram.com/sparklingstays/" aria-label="Instagram" className="transition hover:text-[#f2cb58]"><SocialIcon kind="instagram" /></a>
            <a href="https://www.facebook.com/SparklingStays" aria-label="Facebook" className="transition hover:text-[#f2cb58]"><SocialIcon kind="facebook" /></a>
            <a href="https://www.yelp.ca/biz/sparkling-stays-montr%C3%A9al-2" aria-label="Yelp" className="transition hover:text-[#f2cb58]"><SocialIcon kind="yelp" /></a>
            <a href="https://www.pinterest.ca/sparklingstays" aria-label="Pinterest" className="transition hover:text-[#f2cb58]"><SocialIcon kind="pinterest" /></a>
          </div>

          <div className="mt-7 space-y-3 text-[15px] text-white/70">
            <Link href={`/${locale}/privacy-policy`} className="block hover:text-[#f2cb58]">{isFr ? 'Politique de confidentialité' : 'Privacy Policy'}</Link>
            <Link href={`/${locale}/terms`} className="block hover:text-[#f2cb58]">{isFr ? 'Conditions d\'utilisation' : 'Terms & Conditions'}</Link>
            <Link href={`/${locale}/book-now`} className="block hover:text-[#f2cb58]">{isFr ? 'Réserver' : 'Book Now'}</Link>
          </div>


        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-white/65 md:px-6">
        Copyright © {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  );
}
