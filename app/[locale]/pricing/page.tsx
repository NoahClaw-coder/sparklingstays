import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {siteConfig, getCanonical} from '@/lib/seo';
import {CTAButton} from '@/components/ui/CTAButton';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {FAQAccordion} from '@/components/ui/FAQAccordion';

type Locale = 'en' | 'fr';
type Segment = 'residential' | 'commercial';

type Params = Promise<{locale: string}>;
type SearchParams = Promise<{segment?: string}>;

type PricingPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  metaTitle: string;
  metaDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  segmentLabel: string;
  segmentIntro: string;
  segmentSwitchLabel: string;
  switchOptions: {residential: string; commercial: string};
  introTitle: string;
  introBody: string;
  tiersTitle: string;
  tiers: {
    name: string;
    price: string;
    summary: string;
    bullets: string[];
  }[];
  factorsTitle: string;
  factorsIntro: string;
  factors: string[];
  processTitle: string;
  processSteps: string[];
  reassuranceTitle: string;
  reassuranceBody: string;
  reassurancePoints: string[];
  faqTitle: string;
  faqs: {question: string; answer: string}[];
  finalCtaTitle: string;
  finalCtaBody: string;
  finalPrimaryCta: string;
  finalSecondaryCta: string;
};

const pricingPageContent = {
  en: {
    residential: {
      eyebrow: 'Residential cleaning pricing in Greater Montreal',
      title: 'Residential Cleaning Pricing in Montreal',
      description:
        'Get practical residential cleaning price guidance for Montreal, Laval, the West Island, and the South Shore. Sparkling Stays shares common starting ranges, what changes the quote, and how to book the right type of home cleaning.',
      lastUpdated: 'Last updated: April 2026',
      metaTitle: 'Residential Cleaning Pricing in Montreal | Sparkling Stays',
      metaDescription:
        'Residential cleaning pricing guidance for Montreal, Laval, West Island, and the South Shore. See common home-cleaning starting ranges and what affects your quote.',
      heroPrimaryCta: 'Get my quote',
      heroSecondaryCta: 'Book now',
      segmentLabel: 'Residential pricing',
      segmentIntro:
        'Looking for office, retail, clinic, or building-cleaning pricing instead? Switch to the commercial pricing view for quote guidance built around business spaces.',
      segmentSwitchLabel: 'Choose your pricing view',
      switchOptions: {residential: 'Residential', commercial: 'Commercial'},
      introTitle: 'Clear price guidance before you request an exact quote',
      introBody:
        'Residential cleaning prices depend on the size of the home, how often service is booked, the current condition of the space, and whether the visit is routine maintenance or a more detailed reset. Instead of forcing fake flat rates onto every home, Sparkling Stays gives you realistic starting points so you can understand the range before we confirm the final scope.',
      tiersTitle: 'Common residential pricing starting points',
      tiers: [
        {
          name: 'Recurring home cleaning',
          price: 'From $120+',
          summary: 'Best for weekly, biweekly, or monthly upkeep in homes that are already maintained reasonably well.',
          bullets: [
            'Usually the best per-visit value for ongoing service',
            'Ideal for condos, apartments, and family homes that want a cleaner baseline all year',
            'Final quote depends on home size, visit frequency, and service priorities'
          ]
        },
        {
          name: 'One-time standard cleaning',
          price: 'From $160+',
          summary: 'A practical option when you need a refresh without committing to an ongoing schedule right away.',
          bullets: [
            'Useful before guests, after a busy stretch, or when regular upkeep has fallen behind slightly',
            'Often priced above recurring visits because there is no ongoing maintenance rhythm',
            'Scope is adjusted to the layout and current condition of the home'
          ]
        },
        {
          name: 'Deep cleaning',
          price: 'From $220+',
          summary: 'For first-time visits, seasonal resets, move-related cleaning, or homes with heavier buildup and more detail work.',
          bullets: [
            'Higher range because the visit usually takes longer and covers more detail',
            'Common starting point before beginning recurring service',
            'Best when kitchens, bathrooms, trim, floors, and neglected areas need more attention'
          ]
        }
      ],
      factorsTitle: 'What changes the final quote',
      factorsIntro:
        'Most pricing changes come from a small number of practical factors. We use these to scope the visit properly and avoid underpricing or overpromising.',
      factors: [
        'The size of the home and how many rooms need active cleaning',
        'Whether the service is recurring, one-time, or a deep-clean reset',
        'Current condition, including visible buildup in kitchens, bathrooms, and floors',
        'Access details such as parking, elevator use, entry instructions, or tight timing windows',
        'Optional focus areas or extra detail requests that expand the visit scope'
      ],
      processTitle: 'How to get the right residential quote',
      processSteps: [
        'Tell us the type of home, approximate size, and whether you want recurring or one-time service.',
        'Let us know if the home needs standard upkeep or a deeper reset so we can recommend the right starting scope.',
        'We confirm the best-fit service and pricing guidance before you book your visit.'
      ],
      reassuranceTitle: 'Why we use price guidance instead of pretending every home costs the same',
      reassuranceBody:
        'Two homes with the same number of bedrooms can still require very different amounts of work. A smaller condo booked every two weeks is not priced the same way as a larger home that has gone months without professional cleaning. Clear ranges are more honest, easier to understand, and more useful than a low advertised number that changes the moment you ask for real service.',
      reassurancePoints: [
        'Good fit for condos, apartments, townhomes, and family homes',
        'Bilingual support in English and French',
        'Service across Montreal, Laval, the West Island, and the South Shore',
        'Easy path from pricing guidance to quote request or booking'
      ],
      faqTitle: 'Residential pricing FAQs',
      faqs: [
        {
          question: 'How much does residential cleaning usually cost in Montreal?',
          answer:
            'For many homes, recurring service often starts around $120+, one-time standard cleaning around $160+, and deep cleaning around $220+. The final quote depends on the size, condition, and scope of the visit.'
        },
        {
          question: 'Why is recurring cleaning usually priced lower than one-time cleaning?',
          answer:
            'Recurring visits typically take less catch-up work because the home is maintained on an ongoing schedule. One-time visits often involve more buildup and more time to reset the space.'
        },
        {
          question: 'When should I choose deep cleaning instead of standard cleaning?',
          answer:
            'Deep cleaning is the better fit when the home needs more detail, has heavier buildup, or has not had professional cleaning in a while. It is also a common first visit before starting recurring service.'
        },
        {
          question: 'Can I get an exact quote before booking?',
          answer:
            'Yes. Share your home size, location, service type, and general condition, and we can guide you toward the right scope and a more exact quote.'
        },
        {
          question: 'Do you offer residential pricing in both English and French?',
          answer:
            'Yes. Sparkling Stays provides bilingual support so you can request pricing guidance and book service comfortably in either language.'
        }
      ],
      finalCtaTitle: 'Need a real number for your home?',
      finalCtaBody:
        'Tell us a bit about your space and we will guide you to the right residential cleaning scope instead of pushing a generic package that does not fit.',
      finalPrimaryCta: 'Request a quote',
      finalSecondaryCta: 'Contact us'
    },
    commercial: {
      eyebrow: 'Commercial cleaning pricing in Greater Montreal',
      title: 'Commercial Cleaning Pricing in Montreal',
      description:
        'Get practical commercial cleaning quote guidance for offices, clinics, retail spaces, common areas, and other business properties across Montreal, Laval, the West Island, and the South Shore.',
      lastUpdated: 'Last updated: April 2026',
      metaTitle: 'Commercial Cleaning Pricing in Montreal | Sparkling Stays',
      metaDescription:
        'Commercial cleaning pricing guidance for Montreal businesses. Learn what shapes the quote for offices, retail, clinics, and shared building spaces without relying on misleading flat rates.',
      heroPrimaryCta: 'Request a commercial quote',
      heroSecondaryCta: 'Contact us',
      segmentLabel: 'Commercial pricing',
      segmentIntro:
        'Need home-cleaning pricing instead? Switch back to the residential pricing view for recurring, one-time, and deep-clean home service guidance.',
      segmentSwitchLabel: 'Choose your pricing view',
      switchOptions: {residential: 'Residential', commercial: 'Commercial'},
      introTitle: 'Commercial pricing should match the building, schedule, and cleaning standard',
      introBody:
        'Commercial cleaning is usually priced through a scoped quote, not a one-size-fits-all rate. A small office with light weekday traffic, a retail store with frequent customer turnover, and a clinic with stricter sanitizing expectations do not belong in the same pricing bucket. Sparkling Stays uses practical quote framing so businesses understand how pricing is built before we recommend a schedule or service level.',
      tiersTitle: 'How commercial quotes are usually structured',
      tiers: [
        {
          name: 'Small business maintenance',
          price: 'Custom monthly or per-visit quote',
          summary: 'Best for smaller offices, studios, boutiques, and service businesses that need dependable upkeep without overbuilding the scope.',
          bullets: [
            'Often based on square footage, layout, washrooms, and visit frequency',
            'Good fit for evening, early-morning, or low-disruption cleaning windows',
            'Usually scoped around predictable maintenance rather than heavy restoration work'
          ]
        },
        {
          name: 'Shared workspace or office routine',
          price: 'Custom quote after scope review',
          summary: 'For professional offices and shared workspaces that need recurring care for desks, kitchens, floors, washrooms, and common areas.',
          bullets: [
            'Quote depends on headcount, traffic level, number of rooms, and access timing',
            'Can be structured as multiple visits per week or a lower-frequency maintenance plan',
            'Useful when you need a clean professional standard for staff and visitors'
          ]
        },
        {
          name: 'Higher-detail commercial scope',
          price: 'Quoted after walkthrough or detailed intake',
          summary: 'For clinics, larger facilities, post-construction commercial resets, or sites with heavier buildup, compliance needs, or tighter scheduling constraints.',
          bullets: [
            'Typically requires a more detailed review before confirming price',
            'May include specialized sanitizing, extra washroom attention, glass, or common-area detail work',
            'Best approach when accuracy matters more than advertising a number that would change later'
          ]
        }
      ],
      factorsTitle: 'What affects commercial cleaning pricing most',
      factorsIntro:
        'Commercial quotes usually move based on traffic, access, and operational complexity more than on a simple room count. These are the main variables we review before recommending a plan.',
      factors: [
        'Square footage, layout complexity, and how much of the site needs active cleaning',
        'Business type, including office, retail, clinic, mixed-use, or shared common-area service',
        'Visit frequency and the level of presentation or sanitizing expected between visits',
        'After-hours access, alarm procedures, parking, elevators, and building management requirements',
        'Extra scope such as interior glass, break rooms, washroom stocking coordination, or periodic deep detail work'
      ],
      processTitle: 'How to get the right commercial quote',
      processSteps: [
        'Tell us what kind of business you operate, where you are located, and how often you need service.',
        'Share your approximate square footage, cleaning priorities, and any access or scheduling constraints.',
        'We recommend the right service level and prepare a practical quote or next-step walkthrough based on the real scope.'
      ],
      reassuranceTitle: 'Why serious commercial pricing starts with scope, not guesswork',
      reassuranceBody:
        'Low advertised commercial rates often fall apart once access restrictions, washroom count, traffic level, or after-hours requirements come up. A scoped quote is more useful because it reflects the building, the service standard, and the schedule you actually need. That keeps expectations clear for both sides and helps businesses budget realistically.',
      reassurancePoints: [
        'Built for offices, clinics, retail, studios, and shared commercial spaces',
        'Bilingual communication for managers, owners, and onsite teams',
        'Service coverage across Montreal, Laval, the West Island, and the South Shore',
        'Straight path from intake to quote request, walkthrough, or recurring-service planning'
      ],
      faqTitle: 'Commercial pricing FAQs',
      faqs: [
        {
          question: 'Do you publish fixed commercial cleaning prices?',
          answer:
            'Not as a universal flat rate. Commercial spaces vary too much in size, traffic, access, and cleaning expectations. We use quote guidance and scoped recommendations so you get a number that reflects the actual work.'
        },
        {
          question: 'What information do you need for a commercial cleaning quote?',
          answer:
            'The most helpful details are your business type, approximate square footage, desired visit frequency, number of washrooms or key areas, and any access restrictions such as evening entry or alarm procedures.'
        },
        {
          question: 'Can you quote office cleaning and retail cleaning differently?',
          answer:
            'Yes. Offices, retail stores, clinics, and mixed-use commercial sites have different traffic patterns and cleaning standards, so the quote is adjusted to the way the space is used.'
        },
        {
          question: 'Do commercial clients need a walkthrough before getting a price?',
          answer:
            'Not always. Smaller and simpler sites can often be scoped from a strong intake. Larger, higher-detail, or more sensitive spaces may need a walkthrough to confirm the most accurate quote.'
        },
        {
          question: 'Do you offer commercial pricing support in English and French?',
          answer:
            'Yes. Sparkling Stays offers bilingual support for commercial quote requests, scheduling conversations, and ongoing service coordination.'
        }
      ],
      finalCtaTitle: 'Need pricing for your business or building?',
      finalCtaBody:
        'Send us your business type, approximate size, and service frequency goals. We will guide you toward the right commercial cleaning scope and the best next step for a real quote.',
      finalPrimaryCta: 'Get a commercial quote',
      finalSecondaryCta: 'Talk to our team'
    }
  },
  fr: {
    residential: {
      eyebrow: 'Tarifs résidentiels dans le Grand Montréal',
      title: 'Tarifs d’entretien ménager résidentiel à Montréal',
      description:
        'Consultez un guide clair des tarifs résidentiels à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Sparkling Stays partage des prix de départ réalistes, les facteurs qui influencent le coût et la meilleure façon d’obtenir un devis adapté à votre logement.',
      lastUpdated: 'Dernière mise à jour : avril 2026',
      metaTitle: 'Tarifs d’entretien ménager résidentiel à Montréal | Sparkling Stays',
      metaDescription:
        'Guide des tarifs résidentiels à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Consultez des prix de départ réalistes et les facteurs qui influencent votre devis.',
      heroPrimaryCta: 'Obtenir mon devis',
      heroSecondaryCta: 'Réserver maintenant',
      segmentLabel: 'Tarifs résidentiels',
      segmentIntro:
        'Vous cherchez plutôt des tarifs pour un bureau, un commerce, une clinique ou un immeuble? Passez à la vue commerciale pour un encadrement adapté aux espaces d’affaires.',
      segmentSwitchLabel: 'Choisissez votre vue tarifaire',
      switchOptions: {residential: 'Résidentiel', commercial: 'Commercial'},
      introTitle: 'Un guide clair avant de demander un prix exact',
      introBody:
        'Le coût d’un entretien ménager résidentiel dépend surtout de la taille du logement, de la fréquence des visites, de l’état actuel des lieux et du fait qu’il s’agisse d’un entretien standard ou d’une remise à neuf plus détaillée. Au lieu d’afficher de faux tarifs fixes pour tous les logements, Sparkling Stays présente des points de départ réalistes pour vous aider à comprendre la fourchette avant de confirmer la portée exacte du service.',
      tiersTitle: 'Points de départ courants pour le résidentiel',
      tiers: [
        {
          name: 'Entretien ménager récurrent',
          price: 'À partir de 120 $+',
          summary: 'Le meilleur choix pour un entretien hebdomadaire, aux deux semaines ou mensuel dans un logement déjà relativement bien maintenu.',
          bullets: [
            'Souvent la meilleure valeur par visite pour un service continu',
            'Idéal pour condos, appartements et maisons familiales qui veulent garder une bonne base de propreté',
            'Le prix final dépend de la taille du logement, de la fréquence et des priorités du service'
          ]
        },
        {
          name: 'Ménage ponctuel standard',
          price: 'À partir de 160 $+',
          summary: 'Une option pratique quand vous avez besoin d’un rafraîchissement sans vous engager immédiatement dans un horaire récurrent.',
          bullets: [
            'Utile avant des invités, après une période chargée ou quand l’entretien a légèrement pris du retard',
            'Souvent plus élevé qu’une visite récurrente parce qu’il n’y a pas de rythme d’entretien continu',
            'La portée est ajustée selon la configuration et l’état réel du logement'
          ]
        },
        {
          name: 'Grand ménage',
          price: 'À partir de 220 $+',
          summary: 'Pour une première visite, une remise à neuf saisonnière, un ménage lié à un déménagement ou un logement avec plus d’accumulation.',
          bullets: [
            'Fourchette plus élevée parce que la visite demande généralement plus de temps et de détail',
            'Souvent le meilleur point de départ avant un entretien récurrent',
            'Idéal lorsque la cuisine, les salles de bain, les moulures, les planchers et les zones négligées demandent plus d’attention'
          ]
        }
      ],
      factorsTitle: 'Ce qui influence le devis final',
      factorsIntro:
        'La plupart des écarts de prix viennent d’un petit nombre de facteurs très concrets. Nous les utilisons pour établir une portée réaliste et éviter les promesses irréalistes.',
      factors: [
        'La taille du logement et le nombre de pièces à entretenir activement',
        'Le fait qu’il s’agisse d’un service récurrent, ponctuel ou d’un grand ménage',
        'L’état actuel des lieux, surtout dans la cuisine, les salles de bain et les planchers',
        'Les détails d’accès comme le stationnement, l’ascenseur, les instructions d’entrée ou une plage horaire serrée',
        'Les priorités particulières ou demandes additionnelles qui élargissent la portée de la visite'
      ],
      processTitle: 'Comment obtenir le bon devis résidentiel',
      processSteps: [
        'Indiquez-nous le type de logement, sa taille approximative et si vous voulez un service récurrent ou ponctuel.',
        'Précisez si le logement a surtout besoin d’un entretien standard ou d’une remise à neuf plus complète.',
        'Nous confirmons le service le plus approprié et un guide tarifaire clair avant la réservation.'
      ],
      reassuranceTitle: 'Pourquoi nous utilisons des fourchettes plutôt que de prétendre que tous les logements coûtent pareil',
      reassuranceBody:
        'Deux logements avec le même nombre de chambres peuvent exiger des efforts très différents. Un petit condo entretenu aux deux semaines ne se chiffre pas comme une grande maison qui n’a pas reçu de ménage professionnel depuis des mois. Des fourchettes claires sont plus honnêtes, plus faciles à comprendre et plus utiles qu’un prix d’appel trop bas qui change dès qu’on regarde la vraie portée du travail.',
      reassurancePoints: [
        'Convient aux condos, appartements, maisons de ville et maisons familiales',
        'Service bilingue en français et en anglais',
        'Couverture à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud',
        'Passage simple du guide tarifaire vers le devis ou la réservation'
      ],
      faqTitle: 'FAQ sur les tarifs résidentiels',
      faqs: [
        {
          question: 'Combien coûte habituellement l’entretien ménager résidentiel à Montréal?',
          answer:
            'Pour plusieurs logements, l’entretien récurrent commence souvent autour de 120 $+, le ménage ponctuel standard autour de 160 $+ et le grand ménage autour de 220 $+. Le devis final dépend de la taille, de l’état et de la portée du service.'
        },
        {
          question: 'Pourquoi un service récurrent coûte-t-il souvent moins qu’un ménage ponctuel?',
          answer:
            'Les visites récurrentes demandent généralement moins de rattrapage parce que le logement est entretenu régulièrement. Les visites ponctuelles exigent souvent plus de temps pour remettre l’espace à niveau.'
        },
        {
          question: 'Quand devrais-je choisir un grand ménage plutôt qu’un ménage standard?',
          answer:
            'Le grand ménage est préférable quand le logement demande plus de détail, présente davantage d’accumulation ou n’a pas été nettoyé professionnellement depuis un certain temps. C’est aussi un excellent premier rendez-vous avant un service récurrent.'
        },
        {
          question: 'Puis-je obtenir un prix exact avant de réserver?',
          answer:
            'Oui. Indiquez la taille du logement, l’emplacement, le type de service et l’état général, et nous pourrons vous orienter vers la bonne portée ainsi qu’un devis plus précis.'
        },
        {
          question: 'Puis-je obtenir l’information tarifaire en français ou en anglais?',
          answer:
            'Oui. Sparkling Stays offre un accompagnement bilingue afin que vous puissiez demander des informations tarifaires et réserver dans la langue de votre choix.'
        }
      ],
      finalCtaTitle: 'Besoin d’un vrai prix pour votre logement?',
      finalCtaBody:
        'Parlez-nous un peu de votre espace et nous vous guiderons vers la bonne portée de service résidentiel au lieu de vous pousser vers un forfait générique mal adapté.',
      finalPrimaryCta: 'Demander un devis',
      finalSecondaryCta: 'Nous contacter'
    },
    commercial: {
      eyebrow: 'Tarifs d’entretien commercial dans le Grand Montréal',
      title: 'Tarifs d’entretien ménager commercial à Montréal',
      description:
        'Obtenez un guide concret pour les devis d’entretien commercial de bureaux, commerces, cliniques, aires communes et autres espaces professionnels à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud.',
      lastUpdated: 'Dernière mise à jour : avril 2026',
      metaTitle: 'Tarifs d’entretien ménager commercial à Montréal | Sparkling Stays',
      metaDescription:
        'Guide des tarifs commerciaux pour les entreprises de Montréal. Découvrez les facteurs qui influencent le devis pour les bureaux, commerces, cliniques et espaces partagés sans vous fier à de faux tarifs fixes.',
      heroPrimaryCta: 'Demander un devis commercial',
      heroSecondaryCta: 'Nous contacter',
      segmentLabel: 'Tarifs commerciaux',
      segmentIntro:
        'Vous cherchez plutôt des tarifs résidentiels? Revenez à la vue résidentielle pour l’entretien récurrent, le ménage ponctuel et les grands ménages à domicile.',
      segmentSwitchLabel: 'Choisissez votre vue tarifaire',
      switchOptions: {residential: 'Résidentiel', commercial: 'Commercial'},
      introTitle: 'Les tarifs commerciaux doivent refléter le bâtiment, l’horaire et le niveau d’entretien demandé',
      introBody:
        'L’entretien commercial se chiffre généralement par devis, pas avec un prix unique pour tous. Un petit bureau avec peu de circulation, un commerce avec un fort roulement de clients et une clinique avec des exigences plus strictes en matière d’assainissement ne relèvent pas de la même structure tarifaire. Sparkling Stays utilise un cadre de devis clair afin que les entreprises comprennent comment le prix se construit avant que nous recommandions une fréquence ou un niveau de service.',
      tiersTitle: 'Comment les devis commerciaux sont généralement structurés',
      tiers: [
        {
          name: 'Entretien pour petite entreprise',
          price: 'Devis personnalisé mensuel ou par visite',
          summary: 'Idéal pour petits bureaux, studios, boutiques et entreprises de services qui veulent un entretien fiable sans gonfler inutilement la portée.',
          bullets: [
            'Souvent basé sur la superficie, la configuration, les salles de bain et la fréquence des visites',
            'Convient bien aux fenêtres d’entretien en soirée, tôt le matin ou à faible interruption',
            'Portée généralement axée sur l’entretien prévisible plutôt que sur une remise en état lourde'
          ]
        },
        {
          name: 'Routine pour bureaux ou espaces partagés',
          price: 'Devis personnalisé après revue de la portée',
          summary: 'Pour bureaux professionnels et espaces de travail partagés qui ont besoin d’un entretien récurrent des postes, cuisines, planchers, salles de bain et aires communes.',
          bullets: [
            'Le devis dépend du nombre d’employés, du niveau de circulation, du nombre de pièces et des contraintes d’accès',
            'Peut être structuré en plusieurs visites par semaine ou en entretien moins fréquent',
            'Utile quand vous voulez un standard propre et professionnel pour le personnel et les visiteurs'
          ]
        },
        {
          name: 'Portée commerciale plus détaillée',
          price: 'Prix confirmé après visite ou prise d’informations détaillée',
          summary: 'Pour cliniques, plus grands locaux, remises à neuf commerciales après travaux ou sites avec plus d’accumulation, d’exigences ou de contraintes d’horaire.',
          bullets: [
            'Demande habituellement une revue plus détaillée avant de confirmer le prix',
            'Peut inclure assainissement plus poussé, attention accrue aux salles de bain, vitres intérieures ou aires communes',
            'Meilleure approche lorsque la précision compte plus qu’un prix d’appel qui changerait ensuite'
          ]
        }
      ],
      factorsTitle: 'Ce qui influence le plus les tarifs commerciaux',
      factorsIntro:
        'Les devis commerciaux évoluent surtout selon l’achalandage, l’accès et la complexité opérationnelle, plus que selon un simple nombre de pièces. Voici les variables principales que nous examinons avant de recommander un plan.',
      factors: [
        'La superficie, la complexité de la configuration et la part du site qui doit être nettoyée activement',
        'Le type d’entreprise : bureau, commerce, clinique, immeuble mixte ou entretien d’aires communes',
        'La fréquence des visites et le niveau de présentation ou d’assainissement attendu',
        'L’accès après les heures, les alarmes, le stationnement, les ascenseurs et les exigences de gestion immobilière',
        'Les éléments supplémentaires comme les vitres intérieures, les cuisinettes, la coordination de consommables ou les détails périodiques plus poussés'
      ],
      processTitle: 'Comment obtenir le bon devis commercial',
      processSteps: [
        'Indiquez le type d’entreprise, l’emplacement et la fréquence de service souhaitée.',
        'Partagez la superficie approximative, les priorités de nettoyage et les contraintes d’accès ou d’horaire.',
        'Nous recommandons le bon niveau de service et préparons un devis concret ou la prochaine étape, selon la portée réelle.'
      ],
      reassuranceTitle: 'Pourquoi un vrai tarif commercial commence par la portée, pas par l’improvisation',
      reassuranceBody:
        'Les tarifs commerciaux trop bas affichés en ligne changent souvent dès qu’on tient compte des accès, du nombre de salles de bain, du niveau d’achalandage ou des horaires hors ouverture. Un devis fondé sur la portée est plus utile parce qu’il reflète le bâtiment, le niveau d’entretien et l’horaire réellement nécessaires. Cela clarifie les attentes des deux côtés et aide les entreprises à planifier correctement.',
      reassurancePoints: [
        'Pensé pour bureaux, cliniques, commerces, studios et espaces commerciaux partagés',
        'Communication bilingue pour gestionnaires, propriétaires et équipes sur place',
        'Service offert à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud',
        'Passage simple de la demande initiale au devis, à la visite ou à la planification récurrente'
      ],
      faqTitle: 'FAQ sur les tarifs commerciaux',
      faqs: [
        {
          question: 'Publiez-vous des tarifs fixes pour l’entretien commercial?',
          answer:
            'Pas sous forme d’un prix universel. Les espaces commerciaux varient trop selon la taille, la circulation, l’accès et le niveau d’entretien attendu. Nous utilisons donc un encadrement clair et des devis adaptés à la réalité du site.'
        },
        {
          question: 'Quelles informations faut-il fournir pour un devis commercial?',
          answer:
            'Les détails les plus utiles sont le type d’entreprise, la superficie approximative, la fréquence souhaitée, le nombre de salles de bain ou de zones clés, ainsi que toute contrainte d’accès comme l’entrée en soirée ou un système d’alarme.'
        },
        {
          question: 'Pouvez-vous chiffrer différemment un bureau et un commerce?',
          answer:
            'Oui. Les bureaux, commerces, cliniques et espaces mixtes n’ont pas les mêmes habitudes d’utilisation ni les mêmes standards de propreté. Le devis est donc ajusté à la réalité du lieu.'
        },
        {
          question: 'Faut-il toujours une visite avant d’obtenir un prix commercial?',
          answer:
            'Pas nécessairement. Les sites plus petits et plus simples peuvent souvent être estimés à partir d’une bonne prise d’informations. Les espaces plus grands, plus sensibles ou plus détaillés peuvent exiger une visite pour confirmer un prix précis.'
        },
        {
          question: 'Offrez-vous le soutien commercial en français et en anglais?',
          answer:
            'Oui. Sparkling Stays offre un accompagnement bilingue pour les demandes de devis commerciaux, la coordination d’horaire et le suivi de service.'
        }
      ],
      finalCtaTitle: 'Besoin d’un prix pour votre entreprise ou votre immeuble?',
      finalCtaBody:
        'Envoyez-nous votre type d’entreprise, la taille approximative et la fréquence souhaitée. Nous vous guiderons vers la bonne portée de service commercial et la meilleure prochaine étape pour un vrai devis.',
      finalPrimaryCta: 'Obtenir un devis commercial',
      finalSecondaryCta: 'Parler à notre équipe'
    }
  }
} as const satisfies Record<Locale, Record<Segment, PricingPageContent>>;

function getSegment(segment?: string): Segment {
  return segment === 'commercial' ? 'commercial' : 'residential';
}

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> {
  const {locale} = await params;
  const resolvedSearchParams = await searchParams;
  const segment = getSegment(resolvedSearchParams.segment);
  const content = pricingPageContent[locale as Locale]?.[segment] ?? pricingPageContent.en.residential;
  const canonical = getCanonical(locale, '/pricing');
  const canonicalWithSegment = segment === 'commercial' ? `${canonical}?segment=commercial` : canonical;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: canonicalWithSegment,
      languages: {
        'en-CA': `${siteConfig.url}/en/pricing${segment === 'commercial' ? '?segment=commercial' : ''}`,
        'fr-CA': `${siteConfig.url}/fr/pricing${segment === 'commercial' ? '?segment=commercial' : ''}`
      }
    }
  };
}

export default async function PricingPage({
  params,
  searchParams
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const {locale} = await params;
  const resolvedSearchParams = await searchParams;
  const segment = getSegment(resolvedSearchParams.segment);
  setRequestLocale(locale);
  const content = pricingPageContent[locale as Locale]?.[segment] ?? pricingPageContent.en.residential;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const offerCatalogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: content.title,
    itemListElement: content.tiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      description: `${tier.price} — ${tier.summary}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(offerCatalogJsonLd)}} />

      <section className="bg-[#1a1a2e] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <Breadcrumbs
            items={[
              {label: locale === 'fr' ? 'Accueil' : 'Home', href: '/'},
              {label: locale === 'fr' ? 'Tarifs' : 'Pricing'}
            ]}
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#f4d58d]">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{content.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="/book-now" locale={locale}>{content.heroSecondaryCta}</CTAButton>
            <CTAButton href="/contact" locale={locale} variant="secondary">
              {content.heroPrimaryCta}
            </CTAButton>
          </div>
          <p className="mt-6 text-sm text-slate-300">{content.lastUpdated}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{content.segmentLabel}</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">{content.segmentSwitchLabel}</h2>
              <p className="mt-3 text-base leading-7 text-slate-700">{content.segmentIntro}</p>
            </div>
            <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-slate-200">
              <a
                href={locale === 'fr' ? '/fr/pricing' : '/en/pricing'}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  segment === 'residential' ? 'bg-[#1a1a2e] text-white' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {content.switchOptions.residential}
              </a>
              <a
                href={locale === 'fr' ? '/fr/pricing?segment=commercial' : '/en/pricing?segment=commercial'}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  segment === 'commercial' ? 'bg-[#1a1a2e] text-white' : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {content.switchOptions.commercial}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.introTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.introBody}</p>
            </div>
            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.factorsTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.factorsIntro}</p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                {content.factors.map((factor) => (
                  <li key={factor} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-950">{content.reassuranceTitle}</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{content.reassuranceBody}</p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
              {content.reassurancePoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#1a1a2e]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-950">{content.tiersTitle}</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {content.tiers.map((tier) => (
              <article key={tier.name} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">{tier.name}</p>
                <p className="mt-4 text-3xl font-bold text-slate-950">{tier.price}</p>
                <p className="mt-4 text-sm leading-7 text-slate-700">{tier.summary}</p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                  {tier.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-bold text-slate-950">{content.processTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {content.processSteps.map((step, index) => (
              <div key={step} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-950">{content.faqTitle}</h2>
        </div>
        <div className="mt-10">
          <FAQAccordion items={content.faqs} />
        </div>
      </section>

      <section className="bg-[#1a1a2e] py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{content.finalCtaTitle}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200">{content.finalCtaBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact" locale={locale}>{content.finalPrimaryCta}</CTAButton>
            <CTAButton href="/book-now" locale={locale} variant="secondary">
              {content.finalSecondaryCta}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
