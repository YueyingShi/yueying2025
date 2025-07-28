export default function Presence() {
  return (
    <>
      <section className="paragraph">
        <h2>1. Introduction: Understanding Presence in Virtual Environments</h2>
        <h3>What is Presence?</h3>
        <p className="">
          Virtual environments (VEs) are transforming how we learn, train, and
          engage with digital content. But what makes these experiences truly
          immersive? The key is <strong>presence</strong>—the psychological
          state where users feel like they are actually “there” inside the
          virtual world, rather than just observing it through a screen.
        </p>
        <h3>Why Does Presence Matter?</h3>
        <p className="">
          Defined as the “illusion of non-mediation,” presence occurs when users
          become unaware of the VR interface itself, feeling as though they’ve
          stepped into another reality. This is essential in VR applications,
          particularly in education and simulation, where a stronger sense of
          presence leads to more effective learning and higher engagement.
        </p>
        <h3>How is Presence Measured Traditionally?</h3>
        <p className="">Traditionally, presence is measured through:</p>
        <ul className="list-disc list-inside  space-y-1">
          <li>
            <strong>Self-reports:</strong> Questionnaires or interviews that
            capture users’ subjective impressions.
          </li>
          <li>
            <strong>Behavioral observations:</strong> Monitoring users’
            reactions and actions to infer immersion.
          </li>
          <li>
            <strong>Physiological data:</strong> Objective signals like EEG and
            heart rate to assess emotional or cognitive engagement.
          </li>
        </ul>
        <h3>Challenges with Traditional Measurement</h3>
        <p className="">
          While each method offers insights, they often produce conflicting
          results. There’s also no widely accepted standard across studies,
          making comparisons difficult. This inconsistency led us to seek a
          better, more unified approach.
        </p>
      </section>
      <section className="paragraph">
        <h2>2. The Rasch Model: Seems A Better Way</h2>
        <h3>What is Rasch Model?</h3>
        <p>
          The Rasch Model is a statistical method in psychometrics that measures
          hidden traits—like ability or attitude—by analyzing how likely a
          person is to answer questions correctly based on both the person’s
          ability and the question’s difficulty.
        </p>
        <p>
          For example, if a student answers a very hard math problem correctly,
          the model concludes that the student has a higher math skill level
          than someone who only answers easy problems correctly. This means that
          even if students are asked different sets of questions, their
          abilities can still be compared fairly.
        </p>
        <h3>The Rasch Model allowed us to:</h3>
        <ul className="list-disc list-inside  space-y-1">
          <li>
            Incorporate various types of indicators (e.q., self-reports,
            behavior, physiology)
          </li>
          <li>Separates Person Ability and Item Difficulty</li>
          <li>Enables Fair Comparisons Across Different Tests</li>
        </ul>
        <p className="">
          This gave us a scalable, quantitative method to assess how immersive a
          VR experience really is.
        </p>
      </section>
      <section className="paragraph">
        <h2>3. This Study: Apply the Rasch Model to Presence Measurement</h2>
        <h3>Primary Goal</h3>
        <p>
          Evaluate the feasibility and validity of using the Rasch Model to
          measure presence — as an alternative or enhancement to traditional
          methods like self-report questionnaires or physiological data.
        </p>
        <h3>Methods</h3>
        <p className="">
          We tested two VR experiences: a high plank scenario ("Pit VE") and a
          nighttime street environment ("Street VE"). And the following three
          types of items was included:
        </p>
        <ul className="list-disc list-inside  space-y-1">
          <li>EEG and physiological monitoring</li>
          <li>Behavioral observations</li>
          <li>
            Post-experience questionnaires on spatial presence, involvement, and
            realism
          </li>
        </ul>
        <p className="">
          Then we applied the Rasch model, individually on each VE and then a
          combined study, to analyze and calibrate the results.
        </p>
      </section>
      <section className="paragraph">
        <h2>4. Key Findings</h2>
        <ul className="list-disc list-inside  space-y-1">
          <li>High reliability in both environments (0.90 & 0.89)</li>
          <li>Several poorly fitting items (like Item 6) were removed</li>
          <li>
            Successful scale equating (systematically combined & compared the
            two VEs results) using shared anchor items
          </li>
          <li>
            No significant difference in presence between the two environments
          </li>
          <li>Moderate correlation with existing IPQ presence instrument</li>
        </ul>

        <p className="">
          This work shows that the Rasch Model can be used to standardize
          presence measurement across VR studies. It helps developers and
          researchers better understand what makes an experience immersive—and
          how to make it even more so.
        </p>
      </section>
      <section className="paragraph">
        <h2>5. Limitations & Future Directions</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Due to the lab limitation, no natural walking was implemented. This
            may have reduced presence
          </li>
          <li>Small item set limited precision</li>
          <li>
            Future work: extend item banks, analyze physiological data more
            deeply, improve item variety
          </li>
        </ul>
      </section>
      <section className="paragraph">
        <h2>6. Conclusion</h2>
        <p className="">
          By combining psychometric modeling (the Rasch Model) with immersive
          tech, this research paves the way for more consistent, meaningful
          measurement of presence in VR. It's a step toward making virtual
          environments more powerful, engaging, and useful across domains.
        </p>
      </section>{" "}
    </>
  );
}
