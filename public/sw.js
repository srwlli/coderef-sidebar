if (!self.define) {
  let e,
    c = {};
  const s = (s, a) => (
    (s = new URL(s + '.js', a).href),
    c[s] ||
      new Promise((c) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = s), (e.onload = c), document.head.appendChild(e));
        } else ((e = s), importScripts(s), c());
      }).then(() => {
        let e = c[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, i) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (c[n]) return;
    let t = {};
    const r = (e) => s(e, n),
      f = { module: { uri: n }, exports: t, require: r };
    c[n] = Promise.all(a.map((e) => f[e] || r(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-8e5392e7'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: 'df9d2789350023b8762b8852fdbafdbf',
        },
        {
          url: '/_next/static/Ux2mGj9or5Pv5Fnavx0to/_buildManifest.js',
          revision: '944bff931e3f3f1ca2f5ea18ec48dedd',
        },
        {
          url: '/_next/static/Ux2mGj9or5Pv5Fnavx0to/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/139.7a5a8e93a21948c1.js',
          revision: '7a5a8e93a21948c1',
        },
        {
          url: '/_next/static/chunks/176-dbfe7d379a5d476e.js',
          revision: 'dbfe7d379a5d476e',
        },
        {
          url: '/_next/static/chunks/216-4697dc7206afc745.js',
          revision: '4697dc7206afc745',
        },
        {
          url: '/_next/static/chunks/240-cafae4fb6920b469.js',
          revision: 'cafae4fb6920b469',
        },
        {
          url: '/_next/static/chunks/255-e3bf15caf1f1e0f9.js',
          revision: 'e3bf15caf1f1e0f9',
        },
        {
          url: '/_next/static/chunks/40-cd02ff9b8dc8a29c.js',
          revision: 'cd02ff9b8dc8a29c',
        },
        {
          url: '/_next/static/chunks/4bd1b696-c023c6e3521b1417.js',
          revision: 'c023c6e3521b1417',
        },
        {
          url: '/_next/static/chunks/56-29db2dfde7eed845.js',
          revision: '29db2dfde7eed845',
        },
        {
          url: '/_next/static/chunks/639-2e9481bac8ef9539.js',
          revision: '2e9481bac8ef9539',
        },
        {
          url: '/_next/static/chunks/646.f342b7cffc01feb0.js',
          revision: 'f342b7cffc01feb0',
        },
        {
          url: '/_next/static/chunks/720-8d5292a2a76a19bb.js',
          revision: '8d5292a2a76a19bb',
        },
        {
          url: '/_next/static/chunks/778-4dba391276cfc40e.js',
          revision: '4dba391276cfc40e',
        },
        {
          url: '/_next/static/chunks/779-e85b1bbbb2f4dcf4.js',
          revision: 'e85b1bbbb2f4dcf4',
        },
        {
          url: '/_next/static/chunks/970-3851892cf464aa85.js',
          revision: '3851892cf464aa85',
        },
        {
          url: '/_next/static/chunks/app/(app)/ai-tools/prompts/page-570e72a87750ec8d.js',
          revision: '570e72a87750ec8d',
        },
        {
          url: '/_next/static/chunks/app/(app)/dashboard/page-55cf7216e3e1d971.js',
          revision: '55cf7216e3e1d971',
        },
        {
          url: '/_next/static/chunks/app/(app)/git-commands/page-5413557df823ed04.js',
          revision: '5413557df823ed04',
        },
        {
          url: '/_next/static/chunks/app/(app)/layout-5716c94a832d3ab6.js',
          revision: '5716c94a832d3ab6',
        },
        {
          url: '/_next/static/chunks/app/(app)/loading-a24786655c028bb2.js',
          revision: 'a24786655c028bb2',
        },
        {
          url: '/_next/static/chunks/app/(app)/settings/page-1162040a4dc222e3.js',
          revision: '1162040a4dc222e3',
        },
        {
          url: '/_next/static/chunks/app/(app)/workflows/nextjs-setup/page-05b3ff8c0807cc88.js',
          revision: '05b3ff8c0807cc88',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-9e796363ee8b5d1b.js',
          revision: '9e796363ee8b5d1b',
        },
        {
          url: '/_next/static/chunks/app/auth/page-265e00c2295b9104.js',
          revision: '265e00c2295b9104',
        },
        {
          url: '/_next/static/chunks/app/layout-59cb6634745d57fe.js',
          revision: '59cb6634745d57fe',
        },
        {
          url: '/_next/static/chunks/app/page-dcd5b7bceeae9df7.js',
          revision: 'dcd5b7bceeae9df7',
        },
        {
          url: '/_next/static/chunks/framework-acd67e14855de5a2.js',
          revision: 'acd67e14855de5a2',
        },
        {
          url: '/_next/static/chunks/main-448998c76aaa5a4c.js',
          revision: '448998c76aaa5a4c',
        },
        {
          url: '/_next/static/chunks/main-app-232231cb933c0c57.js',
          revision: '232231cb933c0c57',
        },
        {
          url: '/_next/static/chunks/pages/_app-82835f42865034fa.js',
          revision: '82835f42865034fa',
        },
        {
          url: '/_next/static/chunks/pages/_error-013f4188946cdd04.js',
          revision: '013f4188946cdd04',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-7b5e487e922b0166.js',
          revision: '7b5e487e922b0166',
        },
        {
          url: '/_next/static/css/99de906dda25acb9.css',
          revision: '99de906dda25acb9',
        },
        {
          url: '/_next/static/media/4cf2300e9c8272f7-s.p.woff2',
          revision: '18bae71b1e1b2bb25321090a3b563103',
        },
        {
          url: '/_next/static/media/747892c23ea88013-s.woff2',
          revision: 'a0761690ccf4441ace5cec893b82d4ab',
        },
        {
          url: '/_next/static/media/8d697b304b401681-s.woff2',
          revision: 'cc728f6c0adb04da0dfcb0fc436a8ae5',
        },
        {
          url: '/_next/static/media/93f479601ee12b01-s.p.woff2',
          revision: 'da83d5f06d825c5ae65b7cca706cb312',
        },
        {
          url: '/_next/static/media/9610d9e46709d722-s.woff2',
          revision: '7b7c0ef93df188a852344fc272fc096b',
        },
        {
          url: '/_next/static/media/ba015fad6dcf6784-s.woff2',
          revision: '8ea4f719af3312a055caf09f34c89a77',
        },
        {
          url: '/apple-touch-icon.png',
          revision: '6f50147eab3b91c10d286a87953c84b0',
        },
        {
          url: '/docs/synthesized-spec-kit.md',
          revision: '96847b9ccc3284ea6c70abc41a743dad',
        },
        { url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        {
          url: '/icons/create-placeholder-icons.html',
          revision: '945e8d45ebc279bbd7db83b613623601',
        },
        {
          url: '/icons/favicon-16.png',
          revision: 'bf94c0eddc4341df575ea6853a566fef',
        },
        {
          url: '/icons/favicon-32.png',
          revision: '9cd61348168ea6326e3c76f4ef8d3fe0',
        },
        {
          url: '/icons/favicon-48.png',
          revision: '5e22cf2e3431916a2d3b9769c1c285ea',
        },
        {
          url: '/icons/generate-icons.js',
          revision: 'a79e9efbc650cd9153c5c2c9247a3024',
        },
        {
          url: '/icons/icon-192.png',
          revision: 'cc2c33c98d934857a54e787f16968824',
        },
        {
          url: '/icons/icon-512.png',
          revision: 'db2613180fee43d97e0a8c6cf3e5118b',
        },
        {
          url: '/icons/placeholder.txt',
          revision: 'b5ba0102a8d05d8faee612eda7d35754',
        },
        { url: '/manifest.json', revision: '331c4144cd30bb1fb49ce6c23e1cf23c' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
        { url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: c,
              event: s,
              state: a,
            }) =>
              c && 'opaqueredirect' === c.type
                ? new Response(c.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: c.headers,
                  })
                : c,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/.*\.supabase\.co\/.*$/,
      new e.NetworkFirst({
        cacheName: 'supabase-cache',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ));
});
