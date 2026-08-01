const checks = [
  ["https://kaikyrogis.github.io/", "PORTFOLIO VERSION 2.1"],
  ["https://kaikyrogis.github.io/en/", "DIGITAL EXPERIENCES DEVELOPER"],
  ["https://kaikyrogis.github.io/robots.txt", "User-agent"],
  ["https://kaikyrogis.github.io/sitemap.xml", "kaikyrogis.github.io/en/"],
];
for (const [url, marker] of checks) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  const body = await response.text();
  if (!response.ok || !body.includes(marker))
    throw new Error(
      `${url} failed: HTTP ${response.status}; marker ${marker} not found`,
    );
  console.log(`OK ${response.status} ${url}`);
}
