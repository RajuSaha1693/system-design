import type { AppRouter } from '../../server/index';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4002/trpc',
    }),
  ],
});

async function main(){
 client.greeting.query();
}

main();