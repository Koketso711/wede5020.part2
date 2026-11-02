# Lulu's Pet Store — Website Project

## Student Information
- **Name:** [Matsekga Motaung]
- **Student Number:** [ST10530388]
- **Subject:** WEDE5020
- **Group:** [5]

## Live Website
[Paste your deployed website link here]

## Project Overview
This repository contains a website for Lulu's Pet Store, a small business in Johannesburg offering pet food, accessories, grooming and general pet care advice. Part 1 covered planning and HTML structure, Part 2 covered CSS styling and responsive design, and Part 3 adds JavaScript functionality, SEO, form validation and deployment.

## Website Goals and Objectives
- Establish a professional online presence for Lulu's Pet Store
- Provide clear navigation and information for visitors
- Generate leads through validated enquiry and contact forms
- Ensure the site is responsive across desktop, tablet and mobile devices
- Rank for local searches such as "pet store Johannesburg"

## Key Features and Functionality
- Five pages: Home, About Us, Services, Enquiries, Contact
- Responsive pink, light pink and cream design using Flexbox and CSS Grid
- Accordion FAQ, opening-hours modal, image gallery with lightbox, scroll animations
- Interactive Leaflet map showing both branches
- Product list loaded dynamically with search, category filter and sorting
- Enquiry form with validation and an instant cost and availability response
- Contact form with validation that compiles an email to the recipient

## Part 2 Summary — CSS Styling and Responsive Design
External stylesheet (css_assets/style.css) linked to all pages, CSS reset, typography scale, Flexbox header and locations, CSS Grid services layout, hover/focus/active states, and breakpoints at 768px and 480px. Layout was tested manually with browser developer tools at desktop, tablet and mobile widths.

## Part 3 Details — Functionality and SEO

### 2. JavaScript Enhancements (js/script.js)
**Interactive elements**
- Accordion FAQ on about.html
- Modal for opening hours on index.html
- Gallery with lightbox (next, previous, keyboard and click-to-close) on index.html
- Interactive map using Leaflet and OpenStreetMap on contact.html, with buttons that fly to each branch
- Animations and transitions using CSS transitions combined with JavaScript (scroll reveal via IntersectionObserver, back-to-top button)
- DOM manipulation: elements such as product cards, the lightbox and the back-to-top button are created and updated by JavaScript

**Dynamic content**
- Products and services are loaded with fetch() from js/products.json
- services.html includes search, category filter and sort for the product list
- The service/product dropdown on enquiries.html is populated dynamically from the same data

### 3. Search Engine Optimisation
**On-page SEO**
- Keyword research targeted local, intent-based phrases (see table below)
- Unique title tag and meta description on every page
- One H1 per page with logical H2/H3 structure
- Descriptive alt text on all images, with lazy loading for page speed
- Clean, descriptive page names (index, about, services, enquiries, contact)
- Internal links between related pages in page content and navigation
- Mobile-friendly: viewport meta tag and responsive layout

| Page | Target keywords |
|---|---|
| Home | pet store Johannesburg, pet shop Rosebank |
| About | about Lulu's Pet Store, pet grooming FAQ |
| Services | pet food Johannesburg, dog grooming Rosebank, pet accessories |
| Enquiries | book dog grooming Johannesburg, pet product prices |
| Contact | pet store Sandton, pet shop near me |

**Off-page SEO (plan)**
- Backlinks: list the business on local directories and ask suppliers to link to the site
- Social media: share the website link on business social media profiles
- Local SEO: city and suburb names in titles and content, consistent address and phone details, and a Google Business Profile for both branches

**Additional**
- robots.txt tells crawlers which pages to index and points to the sitemap
- sitemap.xml lists all five pages
- Page speed: lazy-loaded images, deferred JavaScript, no large libraries except Leaflet on the contact page only
- Security: HTTPS provided by the hosting platform, user input is only ever written with textContent (never innerHTML), and all input is validated before use

### 4. Form Functionality and Validation
- **enquiries.html**: collects name, email, phone, enquiry type, product or service, quantity, date and details. After validation the data is sent with fetch() (AJAX) and the page responds with an estimated cost and availability.
- **contact.html**: collects name, email, phone, message type and message. After validation the details are compiled into an email addressed to the recipient set in the code (info@lulupetstore.co.za).
- Client-side validation in JavaScript covers name format, email format, 10-digit South African phone numbers, quantity range, dates not in the past, and message length of 10 to 500 characters.
- Error messages appear under each field and update as the user corrects them.

## Deployment
The site is deployed on [Netlify / GitHub Pages]. Live link: [paste link here].

## Sitemap
- Home (index.html)
  - About Us (about.html)
  - Services (services.html)
  - Enquiries (enquiries.html)
  - Contact (contact.html)

## Timeline and Milestones
| Milestone | Date |
|---|---|
| Part 1 HTML structure submitted | [14-Aug-2026] |
| Part 2 CSS and responsive design submitted | [18-Sep-2026] |
| Part 3 JavaScript, SEO and forms completed | [02-Nov-2026] |
| Website deployed | [02-Nov-2026] |

## Changelog
| Date | Change | Reason |
|---|---|---|
| [10-Aug-2026] | Initial HTML structure created for Lulu's Pet Store | Part 1 submission |
| [14-Sep-2026] | External stylesheet, typography scale, Grid/Flexbox layout and breakpoints added | Part 2 task |
| [14-Aug-2026] | Colour palette updated to pink, light pink and cream | Part 2 task |
| [18-Sep-2026] | Replaced corrupted logo file and corrected stylesheet file path | Bug fix |
| [14-Oct-2026] |  | Part 2 feedback |
| [01-Nov-2026] | Created js/script.js with accordion, modal, lightbox, animations and back-to-top button | Part 3 task |
| [01-Nov-2026] | Added products.json and dynamic product list with search, filter and sort | Part 3 task |
| [01-Nov-2026] | Replaced Google Maps iframe with interactive Leaflet map showing both branches | Part 3 task |
| [01-Nov-2026] | Added JavaScript validation and AJAX submission to the enquiry form | Part 3 task |
| [02-Nov-2026] | Added validated contact form that compiles an email | Part 3 task |
| [02-Nov-2026] | Added meta descriptions, keywords, Open Graph tags, robots.txt and sitemap.xml | Part 3 SEO |
| [02-Nov-2026] | Deployed website and added live link | Part 3 task |

## References
Google Search Central (n.d.) *SEO Starter Guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide [Accessed [01-Nov-2026]].

JSONPlaceholder (n.d.) *Free fake API for testing and prototyping*. Available at: https://jsonplaceholder.typicode.com/ [Accessed [01-Nov-2026]].

Leaflet (n.d.) *Leaflet: an open-source JavaScript library for interactive maps*. Available at: https://leafletjs.com/ [Accessed [01-Nov-2026]].

Mozilla Developer Network (n.d.) *Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API [Accessed [01-Nov-2026]].

Mozilla Developer Network (n.d.) *Intersection Observer API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API [Accessed [01-Nov-2026]].

OpenStreetMap (n.d.) *Copyright and licence*. Available at: https://www.openstreetmap.org/copyright [Accessed [01-Nov-2026]].