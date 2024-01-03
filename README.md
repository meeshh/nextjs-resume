# Next.js and Tailwind Résumé

This résumé is built on the Next.js and Tailwind CSS framework, originally forked from the [Next.js Resume Template](https://github.com/colinhemphill/nextjs-resume). The template provides a fast and beautifully designed résumé website, with the ability to generate a PDF for email and print.

[See an example](https://nextjs-resume-generator.vercel.app/)

Your résumé can also generate a secure URL that will display information not accessible on the public URL. The secure version includes private information such as email, phone number, and mailing address, and can be shared with potential employers or used to generate a more comprehensive PDF.

## Features

- Update your résumé with simple Markdown files
  - Type safe content management using [Contentlayer](https://www.contentlayer.dev/)
  - Integration with external CMS systems will be possible in the future
- Beautiful and accessible web app to view your résumé, link on social media, and send to potential employers
- **Private Data Fetching:** Fetch personal data from a private gist
- **Private Route with OpenAI Integration:** Utilize a private route to post a job offer in a text box, and OpenAI will analyze the offer and highlight keywords in the résumé page
- Use a secret link to generate the résumé with additional private information
- Generate a PDF on demand to view, download, or print
- Easily customizable
  - 19 accent color palettes out-of-the-box
  - 6 neutral color palettes out-of-the-box
  - Automatic light and dark modes for each palette
  - Tailwind classes to modify app and generated images
- Dynamic OG share images in light or dark mode

...

## Private Link

Your project can be configured to provide a secret URL that will display more information than the public URL. This is helpful if you want to send a complete résumé to a potential employer, or if you want to generate a PDF for your own use. In this version, you can include personal information such as email, phone number, and address that you don't want visible to the general public.

### OpenAI Integration

The private route includes a unique OpenAI integration. Recruiters can post a job offer in a text box, and OpenAI will analyze the offer and dynamically highlight relevant keywords in the résumé page. To ensure fair usage, the OpenAI API has a rate limiter using Redis, allowing access to the feature three times per day for each user.
