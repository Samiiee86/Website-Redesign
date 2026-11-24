import type { Review } from "./AlternativePage";

/* Customer posts the alternative pages share when the live page has no
   reviews about that rival (Sauce Labs, Perfecto): the three the live
   Sauce Labs page shows, word for word as far as the live page quotes
   them, with the handles it shows. */

const IMG = "https://assets.testmuai.com/resources/images";
const LINKEDIN = { icon: `${IMG}/lambdaTestReview/Linkedin.svg`, label: "Posted on LinkedIn" };

export const customerPosts: Review[] = [
  {
    name: "Suryateja Goud",
    by: "suryateja-goud",
    quote: "I'm pleased to announce that I've recently gained hands-on experience exploring Kane AI through the Lambda Tool and it's been a fantastic journey of upskilling!",
    img: `${IMG}/suryateja-goud.webp`,
    url: "https://www.linkedin.com/feed/update/urn:li:share:7353106221194752004/",
    on: LINKEDIN,
  },
  {
    name: "Microsoft India",
    by: "@MicrosoftIndia",
    quote: "See how @testmuai is #Futureready to enable blazing-fast test orchestration seamlessly integrated with organizations' existing CI/CD platforms, using #Microsoft Azure.",
    img: `${IMG}/MicrosoftIndia-tweet-review.png`,
    url: "https://x.com/testmuai",
    on: "x",
  },
  {
    name: "Best Egg",
    by: "best-egg",
    quote: "As Best Egg expanded its product offerings and entered new markets, we knew our old testing infrastructure couldn't keep up. With support from Tenny Agustin, our Engineering Operations Lead, we modernized our approach with @testmuai.",
    img: `${IMG}/best-egg.webp`,
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7353518165764513792/",
    on: LINKEDIN,
  },
];

