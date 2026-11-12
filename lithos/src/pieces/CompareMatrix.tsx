import { Reveal, Section } from "../lib/ui";
import { FoldHead } from "./compare/parts";
import MatrixTable, {
  type MatrixGroup,
  type MatrixRival,
} from "./compare/MatrixTable";

/* Comparison matrix: TestMu AI against two to five other options.
   One fold: the standard section head (heading left, description
   right), then the table from edge to edge.

   - TestMu AI is the one white card floating in the table; its foot
     carries the fold's one button.
   - The last row is the total: how many rows each option has built in,
     counted from the rows themselves, so it can never drift from them. */

type Props = {
  lead: string;
  title: string;
  body: string;
  cta?: string;
  /* where TestMu AI stands among the columns: 0 is first */
  oursAt?: number;
  rivals: MatrixRival[];
  groups: MatrixGroup[];
};

export default function CompareMatrix({
  lead,
  title,
  body,
  cta = "Start free",
  oursAt = 0,
  rivals,
  groups,
}: Props) {
  return (
    <Section>
      <FoldHead lead={lead} title={title} body={body} />
      <Reveal delay={0.08} className="-mx-8">
        <MatrixTable
          label={`${lead} ${title}`}
          rivals={rivals}
          groups={groups}
          oursAt={oursAt}
          cta={cta}
          tally
        />
      </Reveal>
    </Section>
  );
}
