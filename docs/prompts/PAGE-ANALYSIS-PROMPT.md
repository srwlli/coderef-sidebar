<costar>
  <context>Page analysis within source folder for specification extraction</context>
  <objective>Scan page, generate specs, save in same source folder</objective>
  <style>Technical, systematic, hierarchical listing</style>
  <tone>Precise, deterministic, unambiguous</tone>
  <audience>Developers and AI agents requiring reconstruction data</audience>
  <response>
    <output>[PAGENAME]-SPECS.md</output>
    <location>./ (same folder as scanned page)</location>
    <naming>Extract PAGENAME from page title/filename, replace spaces with hyphens</naming>
    <examples>
      - Scan dashboard → save to dashboard/[PAGENAME]-SPECS.md
      - Scan settings → save to settings/[PAGENAME]-SPECS.md
      - Scan profile → save to profile/[PAGENAME]-SPECS.md
