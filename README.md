# Ultra Renova — site vitrine

One-page company website with the design approved by Walter, updated on 13 October 2026. The temporary review URL is https://a-karch.github.io/ultra-renova-demo/.

## Files and behavior

- `index.html`: French content, business information, service descriptions, one actual project, contacts and the message form.
- `styles.css`: the approved navy, orange and warm white design, including mobile layouts.
- `app.js`: mobile navigation, service accordions, gallery/lightbox, social profile rendering and email preparation.
- `site-config.js`: the company's social profile URLs. All three values are empty until Walter supplies the exact URLs.
- `assets/`: the original client logo, optimized real project photos and self-hosted fonts with their licenses.

No build step, database, administration panel or paid service is needed to serve this version. All paths are relative, so the site works both at the temporary repository URL and at the root of a future company domain.

The nine project photos show one pergola/barbecue project. Generated house/interior illustrations from Canva are not used as completed company projects.

## Accepted client changes

- Heading: “Construction & rénovation de maisons individuelles.”
- Intro includes “gros et second œuvre” and both interior and exterior work.
- First service title: “Gros œuvre et second œuvre”.
- Primary number: 07 65 29 04 27, with an international `tel:` link.
- Address, email, RCS Bobigny, APE 41.20A, SIRET and TVA copied from Walter's latest message.
- Removed presentation-validation banners and prototype text from the visible page.
- Facebook, Instagram and TikTok are ready to be added when the profile URLs are supplied. No empty or invented social links appear on the site.

## Contact behavior

Telephone and email links open the visitor's calling/email application. The project form validates the required name, city and description, then opens a message preview. The visitor can open their email application or copy the message. The site never reports that an email has been sent.

The form does not send from a server or store visitor data. It stays hidden without JavaScript; a normal email link replaces it, avoiding a default form submission that would put personal data in the URL. Direct delivery from the site, if wanted, is a separate hosting integration to configure and verify once hosting is selected.

Without JavaScript, the mobile navigation is displayed as ordinary links and the gallery provides links to all nine full photographs. Service descriptions retain the browser's native expand/collapse behavior.

## Verification

Checked in the browser at 390px and 320px: no horizontal page overflow, mobile menu navigation, service expansion, project filtering, enlarged photos and Escape closing. The form rejects empty or whitespace-only required values and preserves accented characters and ampersands in the prepared email. No test emails were sent. A sandboxed page with scripts disabled exposes normal navigation, all photo links and an email contact fallback. JavaScript syntax and local asset/anchor references were also checked.

These checks cover the static site experience. They do not establish email delivery, hosting/domain configuration or validation of company identifiers.

## Adding social links

Set the appropriate value in `site-config.js` to the exact HTTPS company profile URL. Empty values are omitted. Only the matching Facebook, Instagram or TikTok domain is accepted. The links open in a new tab; no third-party widgets or tracking scripts are added.

## Before the company-domain launch

Walter owns ultrarenova.fr and ultrarenova.com at IONOS and says he purchased only the domains. No domain records, mail settings or IONOS account settings have been changed.

Choose hosting with the owner, upload the site files, connect the agreed domain and configure HTTPS while preserving existing mail records. The review version has `noindex, nofollow`; replace this with the agreed indexing setting only at the company-domain launch, and then add the actual canonical URL.

The supplied TVA value is **FR 9301.106123813**. It has been preserved exactly, not silently corrected. Its compact format differs from the French format described by the Ministry of Economy (FR + two-character key + nine-digit SIREN). Ask Walter to confirm the number from his official company document before the final launch. Do not derive a replacement number from this text.

The footer is labeled “Informations de l’entreprise”, not a claim of complete legal notices. Full notices still need confirmed company details and the selected host's details; do not invent these. References: [French TVA format](https://www.economie.gouv.fr/cedef/numero-tva-intracommunautaire), [company website information](https://entreprendre.service-public.gouv.fr/vosdroits/F37351).
