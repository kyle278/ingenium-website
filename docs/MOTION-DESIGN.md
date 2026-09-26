# Motion enhancement

Inspired by the public [Motion examples](https://motion.dev/examples), [scroll-linked example](https://motion.dev/examples/react-scroll-linked), [in-view animations](https://motion.dev/docs/inview) and [scoped React animation controls](https://motion.dev/docs/react-use-animate). Original implementation using the open-source Motion package; no paid example source copied.

- Hero illustration: browser enters first, followed by the connection and customer record. Headline moves gently without fading out.
- Service choices, package comparisons and process steps: short staggered entrances on first viewport entry.
- Long pages: thin scroll-linked progress line beneath the navigation.
- Enquiry journey: manual stage transitions, moving progress indicator, optional user-started playback and pause. Playback lasts less than four seconds; selecting a stage stops it.
- Buttons and navigation links: small press/arrow feedback with CSS.

The JavaScript layer progressively enhances visible HTML. No entrance-dependent hidden content, autoplay loop, scroll hijacking or required waiting period. Reduced-motion preference skips entrance/scroll effects, cancels them immediately if changed, removes the play control and retains manual stage navigation. Effects and observers clean up on navigation. Browser-native animation via Motion's mini build limits bundle overhead.

Verification: three lifecycle tests cover initial reduced motion, live preference changes and route cleanup. Existing form/project tests remain applicable. Check `scripts/smoke-rebuild.mjs` for production payload measurement.

Final verification: production build and lint pass; all 28 tests pass; 21-page/six-redirect smoke checks pass. Homepage JavaScript: 198,236 gzip bytes (previously 189,383). Desktop playback reaches the final stage; mobile controls fit at 390px; scroll-progress transform changes with scroll; no browser warnings/errors observed. Existing Portal project-feed limitation remains unchanged.
