import { Heading, Link, Paragraph } from 'src/shared/design-system';
import { MainSection, TopNavigation } from 'src/shared/navigation';

export function AboutTemplate() {
  return (
    <>
      <TopNavigation />
      <MainSection maxW="30rem">
        <Heading>About Quacker</Heading>
        <Paragraph>
          Our company's mission is to collaboratively manufacture access to
          paradigms without losing sight of our original goal to interactively
          foster advantages for quality and interdependent six sigma programs
          whilst continuing to proactively simplify performance-based and
          inexpensive leadership skills.
        </Paragraph>
        <Heading as="h2">Goal</Heading>
        <Paragraph>
          Our goal is to globally and reliably revolutionize competitive
          products whilst continuing to assertively and quickly initiate
          advantages for effective and world-class six sigma programs.
        </Paragraph>
        <Heading as="h2">Vision</Heading>
        <Paragraph>
          Our vision is to assertively foster access to professional methods of
          empowerment in order to synergistically engineer advantages for
          resources whilst continuing to quickly and globally fashion
          economically sound technology.
        </Paragraph>
        <Paragraph>
          See more at{' '}
          <Link href="https://lotta.se/mission-statement-generator/">
            Mission Statement Generator
          </Link>
          .
        </Paragraph>
      </MainSection>
    </>
  );
}
