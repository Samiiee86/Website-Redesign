import { gartnerFaq, mountAlternativePage, type Review } from "./alternatives/AlternativePage";
import type { SpecRow } from "./pieces/SpecTable";
import type { MatrixGroup } from "./pieces/compare/MatrixTable";

/* BrowserStack alternative page (browserstack-alternative.html).

   - Shared folds, the same as on the home page: header, logo wall,
     customer stories, FAQ (with this page's questions), the closing
     enterprise call and the footer.
   - The two comparison tables from the pieces library, as they are.
   - Kit folds where the site has nothing for the job: the hero
     (hero-media, with the cross browser testing hero fold's video), the
     reviews (reviews-plain) and the three steps (feature-steps), plus a
     methodology block of joined boxes (tm-join).

   Copy is trimmed from the live page: its 9 product tables (44 rows)
   become one head to head of the rows that differ most, the "other device
   clouds" cards become links on the alternatives' names, and the Gartner
   notice moves into the Gartner FAQ answer. */

/* ---------- head to head: one row group per product pair ---------- */

const duel: MatrixGroup[] = [
  {
    label: "Live testing",
    rows: [
      { name: "Free plan", values: [true, "30-minute trial"] },
      { name: "Idle timeout", values: ["Up to 60 minutes", "10 minutes"] },
      { name: "Desktop price", values: ["$15/mo per session", "$29/mo per user"] },
    ],
  },
  {
    label: "Automation",
    rows: [
      { name: "Load testing", values: [true, "Separate product"] },
      { name: "Selenium grid queue", values: ["Parallels plus 150", "5, or equal to parallels"] },
      { name: "Desktop price, per parallel", values: ["$79", "$99"] },
    ],
  },
  {
    label: "Real devices",
    rows: [
      { name: "Desktop browsers included", values: [true, "Sold separately"] },
      { name: "Apple Pay, SIM, biometrics", values: [true, "Team Pro and up"] },
      { name: "Price, 5 parallel sessions", values: ["$195/mo", "$249/mo for 5 users"] },
    ],
  },
  {
    label: "App automation",
    rows: [
      { name: "AI self-healing", values: [true, "$249 Pro plan only"] },
      { name: "Price per parallel", values: ["$199, web and app", "$199, apps only"] },
    ],
  },
  {
    label: "Visual testing",
    rows: [
      { name: "Accessibility checks", values: [true, false] },
      { name: "25,000 screenshots a month", values: ["$299/mo", "$449/mo"] },
    ],
  },
  {
    label: "Also in the platform",
    rows: [
      { name: "AI test authoring", values: ["From $17 per agent", "Quote only"] },
      { name: "Accessibility site scans", values: ["$159/mo", "Quote only"] },
      { name: "Real devices on-premise", values: [true, false] },
    ],
  },
];

/* ---------- the wider market ---------- */

const altColumns = ["Alternative", "Plans", "Real devices", "Best for", "One limitation"];

const alts: SpecRow[] = [
  {
    name: "TestMu AI",
    logo: "/testmu-logo-dark.svg",
    highlight: true,
    cells: [
      "Free plan, then $15/mo per session",
      "50,000+",
      "Web and app teams who want AI test authoring",
      "Dedicated and on-premise devices need Enterprise",
    ],
  },
  {
    name: "Sauce Labs",
    href: "https://www.testmuai.com/saucelabs-alternative/",
    cells: [
      "28-day trial, then $39/mo per test",
      "10,000+",
      "Web and mobile testing with crash reporting",
      "AI agents need an Enterprise plan",
    ],
  },
  {
    name: "TestingBot",
    href: "https://www.testmuai.com/testingbot-alternative/",
    cells: [
      "14-day trial, then €20/mo per user",
      "41",
      "Small teams on euro plans",
      "All devices sit in one Belgian datacenter",
    ],
  },
  {
    name: "TestGrid",
    href: "https://www.testmuai.com/testgrid-alternative/",
    cells: [
      "No self-serve trial; $249/mo per seat",
      "Count not published",
      "On-premise device labs in your network",
      "On-premise AI needs outbound access",
    ],
  },
  {
    name: "AWS Device Farm",
    href: "https://www.testmuai.com/aws-device-farm-alternative/",
    cells: [
      "$0.17 per device minute",
      "2,500+",
      "AWS teams paying per device minute",
      "Runs stop at 150 minutes",
    ],
  },
  {
    name: "Selenium Grid or Playwright",
    cells: [
      "Free and open source",
      "None; bring your own",
      "Full control of browsers, tests and data",
      "You run, scale and patch it yourself",
    ],
  },
];

/* ---------- this page's questions, in the site's FAQ ---------- */


const faq = [
  {
    q: "What is the best BrowserStack alternative?",
    a: (
      <>
        The one that covers the BrowserStack products your team uses, for
        less. TestMu AI has a counterpart for Live, Automate, App Live, App
        Automate, Percy, Accessibility, Low Code Automation and Test
        Management. It prices live testing per parallel session instead of
        per user, and adds KaneAI for writing tests and{" "}
        HyperExecute,
        which runs suites up to 70% faster than traditional grids.
      </>
    ),
  },
  {
    q: "Is there a free BrowserStack alternative?",
    a: "Yes. Most TestMu AI products have a free plan, with no credit card. Automation Free includes 100 lifetime minutes on 2 parallel sessions, HyperExecute Free 300 minutes a month, and SmartUI Free 2,000 screenshots. BrowserStack's core products offer one-time trials of 30 to 100 minutes instead.",
  },
  {
    q: "Is TestMu AI cheaper than BrowserStack?",
    a: (
      <>
        On several products, at{" "}
        annual list prices.
        Desktop live testing is $15 a month per parallel session against $29
        per user. Desktop automation is $79 per parallel against $99. SmartUI
        is $299 a month for 25,000 screenshots against $449 on Percy.
        Real-device app automation is $199 per parallel on both, and TestMu
        AI includes AI self-healing at that price.
      </>
    ),
  },
  {
    q: "Can I test local and private URLs, like with BrowserStack Local?",
    a: "Yes. TestMu AI reaches localhost, staging and firewalled apps through the LT Tunnel CLI or the Underpass desktop app, in live sessions and in automated tests, where you turn it on with the tunnel capability inside LT:Options.",
  },
  {
    q: "Can I run it on-premise, behind my firewall?",
    a: (
      <>
        Yes. TestMu AI offers SaaS, private cloud and on-premise, including a{" "}
        Private Real Device Cloud{" "}
        that hosts real devices in your own infrastructure. BrowserStack's
        docs list no on-premise option for its browser and device clouds.
      </>
    ),
  },
  {
    q: "Which security certifications does TestMu AI hold?",
    a: (
      <>
        SOC 2 Type II, ISO 27001:2022, ISO 27017:2015 and ISO 27701:2019,
        listed in the{" "}
        Trust Center.
        Data is encrypted at rest with AES-256 and in transit with TLS 1.2
        and above.
      </>
    ),
  },
  gartnerFaq,
];

/* ---------- reviews: the seven the live page shows, word for word ---------- */

const IMG = "https://assets.testmuai.com/resources/images";

const reviews: Review[] = [
  {
    name: "Matthew Bryson",
    by: "@mbrysonuk",
    quote: "Second day using @lambdatesting [now TestMu AI] and it's already proven itself a lot faster than Cross Browser Testing and BrowserStack, at half the price!",
    img: `${IMG}/matthew-bryson-review.jpg`,
    url: "https://twitter.com/mbrysonuk/status/1238148964693803009",
    on: "x",
  },
  {
    name: "Eric G",
    by: "Capterra reviewer",
    quote: "Seems like a good alternative to BrowserStack. The inclusion of a free tier is a definite plus. There were a good mix of real devices.",
    img: `${IMG}/lambdaTestReview/capterra-logo-icon-2.png`,
    url: "https://www.capterra.com/p/170732/LambdaTest/reviews/",
    on: { icon: `${IMG}/lambdaTestReview/Capterra.svg`, label: "Posted on Capterra" },
  },
  {
    name: "Hiroyuki Maruno",
    by: "@hirokyMaruno",
    quote: "For cross browser testing, BrowserStack seems to be the default, but it's too heavy, difficult to use, and expensive. So I'm trying out other testing tools. So far, [LambdaTest, now TestMu AI] seems to be the best.",
    img: `${IMG}/peroyuki_-review.png`,
    url: "https://twitter.com/peroyuki_/status/1269886996693962752",
    on: "x",
  },
  {
    name: "Karine Kirche",
    by: "AWS Marketplace",
    quote: "My experiences with BrowserStack and [LambdaTest, now TestMu AI] include conducting very important tests on both products. I was really surprised by LambdaTest. It was a very good service and for the price, I think it is a very good solution.",
    img: `${IMG}/AWS.svg`,
    url: "https://aws.amazon.com/marketplace/pp/prodview-7k2ipipotz3tk",
    on: { icon: `${IMG}/lambdaTestReview/web-icon.svg`, label: "Posted on AWS Marketplace" },
  },
  {
    name: "Youpi78",
    by: "@youpi78",
    quote: "If you've used BrowserStack, give a try to @lambdatesting [now TestMu AI]. It is much faster and very cost-effective.",
    img: `${IMG}/youpi78.png`,
    url: "https://twitter.com/youpi78130/status/1277628858943115264",
    on: "x",
  },
  {
    name: "James Davis",
    by: "CTO at Roster",
    quote: "I evaluated a lot of AI automation testing tools earlier this year and ended up going with @lambdatesting [now TestMu AI]. We've been using them for a couple months and my QA team loves it. KaneAI is ahead of the competition. We highly recommend.",
    img: `${IMG}/james-davis.png`,
    url: "https://www.linkedin.com/posts/inovacode_hi-fellow-techies-our-dev-qa-teams-are-activity-7311091687005593601-Pu0e/",
    on: { icon: `${IMG}/lambdaTestReview/Linkedin.svg`, label: "Posted on LinkedIn" },
  },
  {
    name: "Ben Pritchard",
    by: "@yesiamben",
    quote: "Super top notch customer support from @lambdatesting [now TestMu AI] - just throwing it out there if you're looking for a decent browser testing platform, they get my full double thumbs up. 👍👍",
    img: `${IMG}/ben.png`,
    url: "https://twitter.com/yesiamben/status/1222937857565822976",
    on: "x",
  },
];

/* background from the "vs" hero fold: the compare pages' own scene */
const HERO = "/kit/hero/browserstack-alternative";

mountAlternativePage({
  rival: "BrowserStack",
  hero: {
    lines: ["BrowserStack alternatives,", "compared product by product"],
    promise:
      "Live and automated tests on 3,000+ browsers and 50,000+ real devices. Start free, then pay from $15 a month per parallel session.",
    scene: `${HERO}/hero-bg.jpg`,
    /* drawn from tokens in art/browserstack-hero.html, rendered at 2x */
    screen: (
      <img
        src={`${HERO}/screen.webp`}
        width={2000}
        height={1104}
        fetchPriority="high"
        alt="Are you migrating from BrowserStack? The same Java test before and after, with four lines changed"
      />
    ),
  },
  duel: {
    lead: "TestMu AI and BrowserStack,",
    title: "product by product",
    body: "TestMu AI prices per parallel session; BrowserStack prices Live and App Live per user. Monthly list prices, billed annually, checked October 2026.",
    groups: duel,
  },
  pricing: {
    lead: "BrowserStack prices per user,",
    title: "TestMu AI per parallel session",
    body: "Monthly list prices, billed annually, checked October 2026.",
    rival: {
      price: "$29",
      note: "/user a month",
      label: "How it is sold",
      items: [
        "Live desktop testing at $29 per user a month",
        "Automate at $99 per parallel",
        "App Automate at $199 per parallel, apps only",
        "Percy, 25,000 screenshots at $449 a month",
        "One-time trials of 30 to 100 minutes",
      ],
    },
    ours: {
      price: "$15",
      note: "/session a month",
      flag: "Listed prices",
      label: "What you get",
      items: [
        "Live testing at $15 per session a month",
        "Automation at $79 per parallel",
        "Real devices at $199 per parallel, web and app",
        "SmartUI, 25,000 screenshots at $299 a month",
        "Free plans with no credit card",
      ],
    },
  },
  switchBody:
    "Keep your Selenium tests when you leave BrowserStack. Three steps from your current suite to your first run on TestMu AI.",
  alts: {
    lead: "Six BrowserStack alternatives,",
    title: "side by side",
    body: "Plans, real devices, best fit and one limit for each, from every vendor's own pricing pages and docs, checked 23 October 2026.",
    columns: altColumns,
    rows: alts,
  },
  methodology: {
    body: "Each BrowserStack product against its TestMu AI counterpart, from public pricing, product pages and docs. Prices are monthly list prices in USD, billed yearly.",
    stats: [
      { label: "Product pairs", value: "9" },
      { label: "Rows compared", value: "44" },
      { label: "Alternatives", value: "6" },
      { label: "Prices checked", value: "Oct 2026" },
    ],
    notes: [
      {
        text: "BrowserStack Automate against HyperExecute, one product at a time.",
        link: "Read the comparison",
        href: "https://www.testmuai.com/blog/testmu-vs-browserstack-automate/",
      },
      {
        text: "BrowserStack Live and App Live against TestMu AI, side by side.",
        link: "Read the comparison",
        href: "https://www.testmuai.com/blog/testmu-vs-browserstack-live/",
      },
    ],
  },
  reviews: {
    title: "TestMu AI and BrowserStack",
    body: "Reviews from people who used both, as they posted them.",
    items: reviews,
  },
  faq,
  enterprise: {
    title: "Ready to leave BrowserStack?",
    body: "Talk to our team about plans, parallel sessions and a move that fits your renewal date.",
  },
});
