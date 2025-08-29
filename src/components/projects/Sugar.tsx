import Image from "next/image";
export default function Sugar() {
  return (
    <section className="paragraph">
      <p>
        This project was developed for the &quot;Data Enabled Design&quot;
        topic, focusing on advancing design through objective data collection
        and analysis. Unlike previous patient-centered approaches, we began with
        the patient&apos;s co-habitants. By observing and analyzing a week in
        the lives of diabetic patients and their partners, we designed an
        interactive lighting device to encourage communication and promote
        healthy eating.
      </p>
      <h3>Data Collection</h3>

      <div className="flex flex-wrap gap-4">
        <p className="flex-1">
          Data collection was divided into two phases, an objective data
          collection phase and a subjective data collection phase. The objective
          data was collected using both the control panel unit and the PCR
          infrared sensor on the bathroom door. Data were collected in the
          following manner. Touchable panel: Users were asked to press a button
          on the manipulation panel once each time they consumed a high sugar
          content food. PCR infrared sensor: used to track the patient's
          toileting pattern to determine the user's water intake and health
          status. Mobile Pedometer: We also track the patient's daily exercise
          through the pedometer function in the patient's cell phone.
        </p>{" "}
        <Image
          src="/projects/sugar/tangiblepanel.jpg"
          alt="sugar"
          width={800}
          height={1200}
          className="flex-1 h-96 object-contain rounded bg-white py-2"
        />
      </div>

      <p className="flex-1">
        Data was collected using a Telegram chatbot, where patients and family
        members reported every food and drink they consumed. The bot sent
        reminders three times a day and stored the data in a database, allowing
        us to estimate sugar intake and lifestyle patterns. Daily questionnaires
        were also sent via the chatbot to assess the support cohabitants felt
        they &quot;gave&quot; and patients felt they &quot;received&quot;. Users
        could input data using components on the tangible panel.
      </p>
      <Image
        src="/projects/sugar/telegrambot.png"
        alt="sugar"
        width={1000}
        height={600}
        className="flex-1 h-64 object-contain rounded"
      />

      <h3>Data Analysis</h3>
      <div className="flex flex-wrap gap-4">
        <p className="flex-1">
          Analysis showed that couples generally agreed on the
          &quot;giving&quot; and &quot;receiving&quot; of daily support, with
          consistently high scores. We hypothesized that couples communicate
          effectively. One participant noted that a dip in the &quot;daily
          support level&quot; graph was due to both partners being busy,
          reducing communication. This suggests that presenting information can
          be more motivating than specific &quot;communication coaching&quot;.
        </p>
        <Image
          src="/projects/sugar/data.png"
          alt="sugar"
          width={1000}
          height={2000}
          className="flex-1 h-64 object-contain rounded"
        />
      </div>
      <h3>Design Interventions and Influences</h3>
      <p>
        Based on our findings, we designed an interactive lighting device made
        from frosted cream-colored glass, divided into two ends. Its
        anthropomorphic knot shape symbolizes &quot;communication
        connection&quot;. Each end contains a variable-height lamp bead,
        controlled by data from the user&apos;s phone. The left bead shows the
        patient&apos;s blood glucose level; the right bead shows insulin intake.
        The bead heights help guide insulin intake and keep family members
        informed about the patient&apos;s health and medication status.
        Communication about health has improved, with family members noting,
        &quot;He will now voluntarily share the data in the blood glucose
        recording app with me.&quot;
      </p>
      <Image
        src="/projects/sugar/installation.png"
        alt="sugar"
        width={1000}
        height={2000}
        className="flex-1 h-64 object-contain rounded"
      />
    </section>
  );
}
