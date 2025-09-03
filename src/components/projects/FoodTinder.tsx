import Image from "next/image";

export default function FoodTinder() {
  return (
    <>
      <section className="paragraph">
        <p>
          By 2025, machine learning has become deeply integrated into everyday
          applications, with generative AI and personalization reshaping how
          people interact with digital services. Even without programming
          expertise, users can now leverage AI-driven tools to enhance their
          daily lives. Food Tinder is a recipe recommendation app designed for
          young people living alone. Like a dating app, it “matches” users with
          dishes that fit their preferences, moods, and lifestyles.
        </p>
      </section>
      <section className="paragraph">
        <div className="flex flex-col lg:flex-wrap gap-4 items-center">
          <div className="flex-1 flex flex-col gap-4">
            <h2>Data Collection</h2>
            <p className="flex-1">
              We built a lightweight app to collect initial user data, forming
              the foundation of the recommendation system. The data includes
              demographics, dietary restrictions, moods, short-term needs (e.g.,
              quick meals, comfort food), general food preferences, and
              ingredient-level likes and dislikes. In our pilot study, eight
              participants used the app for one week, generating 388
              high-quality entries that served as the training set for our
              models.
            </p>
          </div>

          <Image
            src="/projects/foodtinder/collection.png"
            alt="Data Collection"
            width={600}
            height={600}
            className="flex-none lg:w-2/5 object-contain rounded"
          />
        </div>
      </section>
      <section className="paragraph">
        <div className="flex flex-col  lg:flex-wrap-reverse gap-4 items-center">
          <div className="flex-1 flex flex-col gap-4">
            <h2>Predicting User Preferences with Machine Learning</h2>
            <p>
              From the collected dataset, we experimented with several models,
              including regression, decision trees, and k-nearest neighbors.
              After tuning parameters and testing user experience, the
              regression model delivered the best results. It achieved over 75%
              accuracy in predicting simple "like/dislike" choices, while also
              producing a probability score that indicates how much a user might
              enjoy a dish.
            </p>
            <p>
              This probability is visualized as a dish score in the app,
              offering users a transparent and interpretable metric. Although
              newer approaches like transformer-based recommendation systems are
              emerging in 2025, we prioritized a lightweight regression model to
              balance accuracy, interpretability, and computational
              efficiency—ideal for mobile use.
            </p>
          </div>
          <Image
            src="/projects/foodtinder/learning.png"
            alt="Data Collection"
            width={600}
            height={600}
            className="flex-none lg:w-2/5 object-cover rounded"
          />
        </div>
      </section>
      <section className="paragraph">
        <div className="flex flex-col  lg:flex-wrap gap-4 items-center">
          <div className="flex-1 flex flex-col gap-4">
            <h2>Integrating AI into the User Experience</h2>

            <p>
              Once embedded in the app, the algorithm directly shaped recipe
              recommendations. Dishes with higher predicted scores were
              prioritized (50–75% chance of being shown), while low-score dishes
              appeared less frequently (10–20%), maintaining diversity without
              overwhelming users with irrelevant suggestions.
            </p>
            <p>
              To support AI transparency and trust, Food Tinder displays both
              the model’s categorical judgment ("like," "fair," or "dislike")
              using emojis and the numerical prediction score. This dual-layer
              feedback helps users understand why certain dishes are
              recommended, aligning with today’s emphasis on explainable AI.
            </p>
          </div>{" "}
          <Image
            src="/projects/foodtinder/ui.png"
            alt="Data Collection"
            width={600}
            height={600}
            className="flex-none lg:w-2/5 object-cover rounded"
          />
        </div>
      </section>
      <section className="paragraph  ">
        <Image
          src="/projects/foodtinder/mockup.png"
          alt="Data Collection"
          width={1200}
          height={1200}
          className="flex-1 w-full object-cover rounded"
        />
      </section>
    </>
  );
}
