import { Reveal, Section } from "../lib/ui";
import { FoldHead } from "./compare/parts";
import MatrixTable, {
  type MatrixGroup,
  type MatrixRival,
} from "./compare/MatrixTable";

/* Head to head: TestMu AI against exactly one other product.
   One fold: the standard section head (heading left, description
   right), then the table.

   With two products the columns are wide, so cells can hold a value and
   a grey condition under it ("$15/mo", "per parallel session") instead
   of bare ticks. Each group can name the two products being compared in
   that part ("Live testing" against "BrowserStack Live"). */

type Props = {
  lead: string;
  title: string;
  body: string;
  cta?: string;
  rival: MatrixRival;
  groups: MatrixGroup[];
};

export default function CompareDuel({
  lead,
  title,
  body,
  cta = "Get started free",
  rival,
  groups,
}: Props) {
  return (
    <Section>
      <FoldHead lead={lead} title={title} body={body} />
      <Reveal delay={0.08} className="-mx-8">
        <MatrixTable
          label={`${lead} ${title}`}
          rivals={[rival]}
          groups={groups}
          cta={cta}
        />
      </Reveal>
    </Section>
  );
}
