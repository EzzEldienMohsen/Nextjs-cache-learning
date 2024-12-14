import Messages from '@/components/messages';
// this fn is another way to avoid data cache if needed
import { unstable_noStore } from 'next/cache';
// you can set the revalidate as a special constant and the next js will take
// care of it instead of putting it in each header provided that you name it revalidate
// and export it
export const revalidate = 15; // it does the same functionality as being putted in the header.
// there is another special constant named dynamic that needs to be exported and named
// dynamic like this
// export const dynamic = "force-dynamic"
// and this has the same effect of the cache set up in the header with the value of no store.
// If you change the value to force-static the app will never fetch any new data

export default async function MessagesPage() {
  // unstable_noStore(); it is used as dynamic constant with force-dynamic value but it is just for this component
  const response = await fetch(
    'http://localhost:8080/messages'
    // , {
    //   // cache: 'no-store',
    //   next: {
    //     revalidate: 5, //number of second to use the data then revalidate
    //   },
    // }
  );
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}