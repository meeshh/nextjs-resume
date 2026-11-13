import { MetadataRoute } from 'next';
import { siteURL } from 'src/helpers/env';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteURL, lastModified: new Date() }];
}
