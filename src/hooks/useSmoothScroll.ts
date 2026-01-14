import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Ensure required plugins are registered once
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

export const useSmoothScroll = () => {
  useLayoutEffect(() => {
    // Avoid creating multiple smoothers in strict/dev double render
    const existing = ScrollSmoother.get();
    if (existing) {
      return () => {
        // keep existing smoother; no-op cleanup
      };
    }

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
    });

    return () => {
      smoother.kill();
    };
  }, []);
};
