//TODOS

HTML structural bugs

Duplicate IDs — <form ... id="search"> and <input type="search" id="search"> share the same id="search". IDs must be unique; this also breaks the <label for="search"> association since it'll bind to the first match (the form), not the input.
Invalid form attribute — <form action="post" ...> uses post as the action (a URL) when it should be the method: <form method="post" action="/search">.
Missing name attribute on the search input — without it, the field won't submit as form data at all.
Search input has no accessible name — the icon-only label wraps an <img alt="">, so screen readers announce nothing meaningful for the field. Add aria-label="Search" or visually-hidden text.
Sidebar nav isn't marked up as navigation — it's a stack of generic <div>s. Wrap it in <nav> and use a <ul><li> list for the links, both semantically and for accessibility.
Heading levels are used for visual sizing, not document structure — e.g. <h4>Hi there,</h4> appears before <h2>Ben T</h2>, and plain usernames like <h3>Morgan Oakly</h3> or <h4>@tegan</h4> are marked up as headings just to get bold/large text. This breaks the outline for screen readers/SEO — use <p>/<span> + CSS classes instead, and reserve headings for actual structure.
Inconsistent text wrapping — most sidebar items wrap their label in <p>, but "Tasks" and "Support" are bare text nodes. Pick one pattern.
Meaningless alt="" on informative images — decorative icons are fine with empty alt, but profile pictures (profilepic/002.png, trending user avatars) convey identity and should have real alt text (e.g. alt="@tegan's profile photo").
Inline styles mixed into markup (style="padding-right: 20px", style="margin-bottom: 5rem;") — move these into the stylesheet as classes so all styling lives in one place.
Typo class name: annoucement-card → should be announcement-card.
Inconsistent markup between repeated components — two of three announcement cards include a .line divider <div>, the third doesn't; all the trending/project cards should follow one consistent template.

CSS issues

Invalid grid value — grid-template: auto / 1fr fr; — fr alone isn't a valid track size (needs a number, e.g. 3fr). This likely isn't doing what you expect.
Redundant/overriding grid rules — .container sets grid-template: auto / 1fr fr (which itself resets rows to auto) and then immediately sets grid-template-rows: auto auto again. Consolidate into one clear declaration.
Fragile attribute selectors coupling CSS to file paths — img[src^="icons"], img[src^="profilepic/"], img[src="icons/pp.svg"] tie styling to asset paths/filenames. If a filename or folder changes, styling silently breaks. Use semantic classes (.icon, .avatar) instead.
!important used to patch specificity — .greet img { height: 70px !important; } overrides img[src^="icons"] { height: 20px } only because of source order/specificity conflicts. Restructure selectors (e.g. more specific class) instead of reaching for !important.
Unused/dead custom properties — --pill-radius and --header-bg-color are declared but never applied anywhere (the .header has no background-color at all).
Overly generic variable name — --text-color: white is used globally for button text and sidebar text; a more literal name (e.g. --on-primary-color) would prevent confusion if a dark-text context is added later.
@import for Google Fonts at the top of the CSS file — this is render-blocking and delays the whole stylesheet from parsing until the font CSS is fetched. Prefer a <link rel="preconnect"> + <link rel="stylesheet"> pair in the HTML <head>, which can be fetched in parallel.
ID selector used for styling (#search) — ties CSS specificity to a unique ID rather than a reusable class, making it harder to reuse that styling elsewhere.
No focus styles — buttons and the search input have no visible :focus-visible state, which is a real accessibility gap for keyboard users.
Generic button element selector hardcodes width: 100px; height: 50px for every button on the page — fine now with only three buttons of matching size, but brittle the moment an icon-only or full-width button is needed; better scoped to a .btn class.