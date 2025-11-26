import { linksConfig } from '@/config';
import type { APIRoute } from 'astro';

const blacklist = ['Astro'];
const friends = linksConfig.items
  .flatMap((item) => item.groupItems)
  .filter((item) => !(item.name in blacklist))
  .map((item) => [item.name, item.url, item.avatar]);

export const GET: APIRoute = async function (_) {
  return new Response(
    JSON.stringify({
      friends,
    })
  );
};
