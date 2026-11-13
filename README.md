# Next.js and Tailwind Résumé

This résumé is built on the Next.js and Tailwind CSS framework, originally forked from the [Next.js Resume Template](https://github.com/colinhemphill/nextjs-resume). The template provides a fast and beautifully designed résumé website, with the ability to generate a PDF for email and print.

[See an example](https://nextjs-resume-generator.vercel.app/)

Your résumé can also generate a secure URL that will display information not accessible on the public URL. The secure version includes private information such as email, phone number, and mailing address, and can be shared with potential employers or used to generate a more comprehensive PDF.

## Features

- Update your résumé with simple Markdown files
  - Type safe content management using [Contentlayer2](https://github.com/timlrx/contentlayer2)
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

### Supabase Integration

The OpenAI feature logs the attempts of users to a supabase database.

## Development

Requires Node.js 20.9+ and [Bun](https://bun.sh) (1.2+ recommended).

```sh
bun install
bun run dev            # generates content, then starts Next.js on http://localhost:3001
bun run content:watch  # (optional, second terminal) regenerate content when Markdown changes
bun run lint && bun run types && bun test
bun run build
```

### Environment variables

| Variable                                                           | Purpose                                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `PRIVATE_KEY`                                                      | Unlocks `/private/<key>` and contact details in the PDF                        |
| `RESET_LIMIT_CODE`                                                 | Unlocks the admin dashboard (`/private/<code>/dashboard`) and admin API routes |
| `GITHUB_ACCESS_TOKEN`                                              | Reads private contact info from the secret gist                                |
| `OPENAI_API_KEY`, `OPENAI_MODEL` (optional)                        | Job-offer keyword extraction                                                   |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_*`) | Upstash Redis for access links and rate limits                                 |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`        | Usage logs                                                                     |
| `G_ANALYTICS_MEASUREMENT_ID`                                       | Google Analytics (only on Vercel deployments)                                  |
| `NEXT_PUBLIC_SITE_URL` (optional)                                  | Canonical URL; defaults to Vercel's production domain                          |
