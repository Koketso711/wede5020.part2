# Lulu's Pet Store — Website Project

## Student Information
- **Name:** [Matsekga Motaung]
- **Student Number:** [ST10530388]
- **Subject:** WEDE5020
- **Group:** [5]

## Project Overview
This repository contains the ongoing development of a website for Lulu's Pet Store, a small business offering pet food, accessories, grooming, and general pet care advice. Part 2 focuses on CSS styling and responsive design, building on the HTML structure completed in Part 1.

## Website Goals and Objectives
- Establish a professional online presence for the chosen organisation
- Provide clear navigation and information for visitors
- Generate leads through an enquiry form
- Ensure the site is responsive across desktop, tablet, and mobile devices

## Key Features and Functionality
- Homepage, About Us, Services, Enquiries, and Contact pages
- Responsive navigation menu
- Enquiry form for customer requests
- Multiple business locations listed on the Contact page, with an embedded map

## Part 2 Details — CSS Styling and Responsive Design

### 2.1 External Stylesheet
Created style.css inside css_assets and linked it to all HTML pages (index, about, services, enquiries, contact).

### 2.2 Base Style
Set default font-family, colour scheme (pink, light pink, cream), and consistent margin/padding using a CSS reset.

### 2.3 Typography
Applied a consistent typography scale (1.25 ratio, "Major Third") across headings and body text using CSS custom properties for visual hierarchy.

### 2.4 Layout Structure
- Flexbox used for the header/navigation bar and the locations section on the Contact page.
- CSS Grid (.services-grid) used to lay out the service cards on the Services page.

### 2.5 Visual Styles
Applied background-color, border-radius, and box-shadow to sections and buttons. Added :hover, :focus, and :active states to navigation links, buttons, and form fields for interactivity.

### 3. Responsive Design
**3.1 Breakpoints:** Tablet (max-width: 768px) and Mobile (max-width: 480px). Services grid switches from 2 columns to 1 column on tablet/mobile. Header and navigation stack vertically on mobile. Location cards stack vertically on mobile via Flexbox flex-direction: column.

**3.2 Relative Units:** Font sizes use rem, spacing uses a mix of rem and %.

**3.4 Testing:** Tested manually using browser developer tools at desktop, tablet (768px), and mobile (480px) widths to confirm the layout responds correctly at each breakpoint.

## Sitemap
Home page links out to four sections: About Us, Services, Enquiries, and Contact, all reachable from the main navigation menu on every page.

## Timeline and Milestones
| Milestone | Date |
|---|---|
| Part 1 HTML structure submitted | [14 aug 2026] |
| CSS styling and colour palette applied | [15 sept 2026] |
| Responsive breakpoints implemented | [15 sept 2026] |
| Google Maps embed added | [18 sept 2026] |
| Final Part 2 submission | [18 sept 206] |

## Changelog
| Date | Change | Reason |
|---|---|---|
| [11 aug 2026] | Initial HTML structure created for Lulu's Pet Store | Part 1 submission |
| [15 sept 2026] | External stylesheet linked, base styles and typography scale added | Part 2 task |
| [15 sept 2026] | CSS Grid applied to Services page, Flexbox applied to header and locations | Part 2 task |
| [15 sept 2026] | Added hover/focus/active states to nav, buttons, and forms | Part 2 task |
| [17 sept 2026] | Added tablet and mobile media query breakpoints | Part 2 task |
| [18 sept 2026] | Updated colour palette to pink, light pink, and cream | Part 2 task |
| [18 sept 2026] | Added Google Maps embed to Contact page | Part 2 task |

## References
[## References]

pet shop logo . [online] Available at: <https://mediamodifier.com/design-template/pet-store-logo-design/26807> [Accessed 15 September 2026].

Google Maps, 2024. *Embed a map*. [online] Available at: <https://maps.app.goo.gl/UTVxpAACbzkDKeM49> [Accessed 15 September 2026].

Visual Studio Developer Network (MDN), 2024. *CSS Grid Layout*. [online] Available at: <https://code.visualstudio.com/> [Accessed 16 September 2026].