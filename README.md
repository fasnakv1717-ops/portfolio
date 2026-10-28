# Premium Portfolio — Local Setup

A responsive, dark-first portfolio starter built with HTML5, CSS3, Tailwind CSS v4 browser CDN, vanilla JavaScript, Google Fonts, and Lucide icons. No React or backend is used. There is **no contact form**.

## Run locally

1. Extract the `portfolio` folder.
2. Open `index.html` in a modern browser. For the most reliable local behavior, use a local static server:
   - VS Code: install/use Live Server, then choose **Open with Live Server**.
   - Or run `python -m http.server 8000` from the `portfolio` directory and visit `http://localhost:8000`.
3. Internet access is needed for Google Fonts, the Tailwind browser CDN, and Lucide icons.

## Customize

Open `js/script.js` and edit the `PORTFOLIO` object at the top:
- `name` and `location`
- `contacts.email`, `phone`, `whatsapp`, `linkedin`, `github`, `instagram`
- `projectLinks` for the demo/source links
- `resumePath` for your résumé PDF

Leave unavailable contact details and project URLs as empty strings; the corresponding cards/buttons remain hidden. For WhatsApp, use digits with the country code and no plus sign or spaces, for example `919876543210`. Replace the sample project copy, skills, and education in `index.html` with accurate information before publishing.

To add a résumé, place your PDF at `assets/resume.pdf`. To use a real profile image, replace the decorative avatar in the hero with an `<img>` element, give it meaningful alt text, and use a compressed image.

## Design choices

- Space Grotesk headings and Inter body text from Google Fonts.
- Dark default theme with a persistent light/dark toggle.
- Mobile navigation with Escape/outside-click closing.
- Intersection Observer for active navigation and reveal effects.
- JavaScript project filters and current-year footer.
- Reduced-motion support and visible keyboard focus states.

## Tailwind note

This starter uses the **Tailwind CSS v4 browser CDN** for a zero-build prototype. The browser CDN is convenient for experimentation, but Tailwind recommends a build step for production. If you deploy this publicly, switch to the official Tailwind CLI workflow and compile the Tailwind CSS instead of relying on the browser CDN. Do not mix this setup with Tailwind v3 configuration instructions.

## Before publishing

- Verify all contact information and URLs.
- Replace or remove any sample content that does not describe you accurately.
- Add genuine project screenshots, demo links, source repositories, and résumé if available.
- Test the site on a phone, tablet, and desktop.
- Check browser console and links after customization.
