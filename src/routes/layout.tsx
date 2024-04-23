import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

// Skew Protection
export const onRequest: RequestHandler = async (resEv) => {
  if (process.env.VERCEL_SKEW_PROTECTION_ENABLED) {
    // document request
    if (resEv.request.headers.has("Sec-Fetch-Dest")) {
      const VERCEL_DEPLOYMENT_ID = process.env.VERCEL_DEPLOYMENT_ID || "";
      console.log("VERCEL_DEPLOYMENT_ID", VERCEL_DEPLOYMENT_ID);
      // defined in latest vercel plugin
      // resEv.cookie.set("__vdpl", VERCEL_DEPLOYMENT_ID, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: true,
      // });
    }
  }
};

export default component$(() => {
  return (
    <>
      <Slot />;
    </>
  );
});
