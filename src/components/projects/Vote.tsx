import ElectionPage from "@/app/apps/us-election/page";
export default function Vote() {
  return (
    <>
      <section className="paragraph">
        <h2>Goal: A Better Visualization For Voting Results</h2>
        <p>
          This section explores various techniques and tools for enhancing the
          visualization of voting results, making it easier for stakeholders to
          understand and analyze the data.
        </p>
        <p>
          Most current visualizations lack intuitive representation of vote
          totals, focusing primarily on geographical distribution.
        </p>
        <p>
          Additionally, most news reports highlight a single election, failing
          to provide a broader view of historical trends across multiple
          election cycles.
        </p>
        <p>
          Our goal is to empower users with a tool that helps uncover deeper
          insights by enabling them to explore underlying patterns, such as:
          <ul className="list-disc list-inside space-y-1">
            <li>Comparing different election years</li>
            <li>Analyzing neighboring states side by side</li>
            <li>
              Comparing states with similar characteristics (e.g., coastal vs.
              inland regions)
            </li>
            <li>Conducting any user-defined comparative analysis</li>
          </ul>
        </p>

        <h2>Outcome</h2>
        <ElectionPage embed={true} />
        <h3>Multiple Map Types: Choropleth Map vs. Bubble Map</h3>
        <p>
          We provide two map types to visualize voting results:
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Choropleth Map</strong>: Uses color gradients to represent
              the winning party in each state.
            </li>
            <li>
              <strong>Bubble Map</strong>: Uses bubble sizes to represent total
              votes per state, with colors indicating the winning party. This
              allows for a more intuitive understanding of voting volume at a
              glance.
            </li>
          </ul>
        </p>

        <h3>Historical Voting Results Comparison</h3>
        <p>
          For any selected state or county, we display the historical voting
          trend across years. This allows users to identify patterns and make
          more informed observations about shifts in voter behavior over time.
        </p>
      </section>
    </>
  );
}
