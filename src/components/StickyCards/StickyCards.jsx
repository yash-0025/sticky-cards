"use client";

import "./StickyCards.css";
import { useRef } from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(ScrollTrigger);



const StickyCards = () => {
  const stickyCardsData = [
    {
      index: "01",
      title: "Modularity",
      image: "/sticky-cards/card_1.jpeg",
      description:
        "Every element is build to snap into place . We design modular systems where clariy , structure and reuse come first no clutter, no excess.",
    },
    {
      index: "02",
      title: "Scalability",
      image: "/sticky-cards/card_2.jpeg",
      description:
        "Systems that grow with you. We craft foundations that scale smoothly as your needs expand — flexible, reliable, and future-ready.",
    },
    {
      index: "03",
      title: "Consistency",
      image: "/sticky-cards/card_3.jpeg",
      description:
        "Unified patterns across every touchpoint. A consistent experience ensures users always understand what to expect and where to go.",
    },
    {
      index: "04",
      title: "Precision",
      image: "/sticky-cards/card_4.jpeg",
      description:
        "Attention to every pixel, every gesture, every interaction. We remove ambiguity and replace it with clarity and intention.",
    },
    {
      index: "05",
      title: "Accessibility",
      image: "/sticky-cards/card_5.jpeg",
      description:
        "Design that works for everyone. Inclusivity isn't a feature — it's the foundation for meaningful and universal experiences.",
    },
  ];

  const container = useRef(null);

  useGSAP(() => {
    const stickyCards = document.querySelectorAll(".sticky-card");

    stickyCards.forEach((card, index) => {
        if(index < stickyCards.length - 1) {
            ScrollTrigger.create({
                trigger: card,
                start: "top top",
                endTrigger: stickyCards[stickyCards.length -1],
                end: "top top",
                pin: true,
                pinSpacing: false,
            })
        }

        if (index < stickyCards.length - 1) {
            ScrollTrigger.create({
                trigger: stickyCards[index + 1],
                start: "top bottom",
                end: "top top",
                onUpdate: (self) => {
                    const progress = self.progress;
                    const scale = 1 - progress * 0.25;
                    const rotation = (index % 2 === 0 ? 6 : -6) * progress;
                    const afterOpacity = progress;

                    gsap.set(card, {
                        scale: scale,
                        rotation: rotation,
                        "--after-opacity": afterOpacity,
                    })
                },
            })
        }
    })
  }, {scope: container});
  

  return( 
    <div className="sticky-cards" ref={container}>
        {stickyCardsData.map((cardData, index) => (
            <div className="sticky-card" key={index}>
                <div className="sticky-card-index">
                    <h1>{cardData.index}</h1>
                </div>
                <div className="sticky-card-content">
                <div className="sticky-card-content-wrapper">
                    <h1 className="sticky-card-header">{cardData.title}</h1>

                    <div className="sticky-card-img">
                        <img src={cardData.image} alt="Card Image" />
                    </div>

                    <div className="sticky-card-copy">
                        <div className="sticky-card-copy-title">
                            <p>(About the state)</p>
                        </div>
                        <div className="sticky-card-copy-description">
                            <p>{cardData.description}</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        ))

        }
    </div>
);
};

export default StickyCards;
