import { Main } from "~/components";
import StyledGoBack from "~/components/styled-go-back";

const MathML = () => (
  <Main class="px-6 py-8 w-full">
    <StyledGoBack class="mb-4" href="/#projects" />

    <h1>MathML Core example</h1>
    <p>An example of MathML core supported in Chrome from v109+</p>

    <div class="container mx-auto">
      This mathematical formula with a big summation and the number pi
      {/* <math display="block" style="border: 1px dotted black;">
        <mrow>
          <munderover>
            <mo>∑</mo>
            <mrow>
              <mi>n</mi>
              <mo>=</mo>
              <mn>1</mn>
            </mrow>
            <mrow>
              <mo>+</mo>
              <mn>∞</mn>
            </mrow>
          </munderover>
          <mfrac>
            <mn>1</mn>
            <msup>
              <mi>n</mi>
              <mn>2</mn>
            </msup>
          </mfrac>
        </mrow>
        <mo>=</mo>
        <mfrac>
          <msup>
            <mi>π</mi>
            <mn>2</mn>
          </msup>
          <mn>6</mn>
        </mfrac>
      </math> */}
      is easy to prove.
    </div>
  </Main>
);

export default MathML;
