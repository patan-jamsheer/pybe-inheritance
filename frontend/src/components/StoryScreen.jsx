import { BirdParent, EagleChild, SparrowChild, PenguinChild, OwlChild } from "./BirdIllustration.jsx";

export default function StoryScreen({ onNext }) {
  return (
    <div className="card">
      <h1 className="card-title">The Bird Family</h1>
      <div className="story-illustration-row">
        <BirdParent />
        <EagleChild size={78} />
        <SparrowChild size={78} />
        <PenguinChild size={78} />
        <OwlChild size={78} />
      </div>
      <p>
        Every bird in the forest is born a <strong>Bird</strong> first. A Bird knows how to{" "}
        <em>eat</em>, <em>sleep</em>, and <em>lay eggs</em> — every single one of them, no
        exceptions.
      </p>
      <p>
        The eagle chick grew up watching her mother glide over the mountains. When it was her
        turn, she simply <em>did what a Bird does</em> — she flew, just like every Bird before
        her.
      </p>
      <p>
        The penguin chick grew up too. He also had wings, but the sea was his sky. So when it was
        his turn to "fly," he kept the Bird's other habits — eating, sleeping, laying eggs — but{" "}
        <em>changed the flying part</em> to suit his own life: he dove and swam instead.
      </p>
      <p>Same family. Same starting habits. One bird changed one thing to fit her own world.</p>
      <p>
        The sparrow chick kept every one of the Bird habits too — but she didn't stop there. She
        picked up a skill of her own that Bird never had: weaving twigs into a nest.
      </p>
      <p>
        The owl chick was the curious one. When it came to sleeping, he didn't throw away what
        Bird already did — he rested on a branch just like every Bird does, and <em>then</em>{" "}
        added his own habit on top: staying alert to hunt through the night.
      </p>
      <button className="btn btn-primary" onClick={onNext}>
        I understood the story
      </button>
    </div>
  );
}
