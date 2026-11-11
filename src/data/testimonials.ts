export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  project: string;
  rating: number;
  tag: string;
  initials: string;
  highlight: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'ms-aremu',
    quote:
      'Her creativity is superb, and she has excellent skills. This is top-notch video editing skill... You did a great job on the project. I appreciate working with you.',
    clientName: 'Ms. Aremu',
    clientRole: 'Executive Client & Creative Lead',
    project: 'Commercial Video Editing & Post-Production',
    rating: 5,
    tag: 'Video Editing & Creative Direction',
    initials: 'MA',
    highlight: 'Top-Notch Editing & Superb Creativity',
  },
  {
    id: 'david-vance',
    quote:
      'The cinematic teaser trailer Morrow Visuals delivered exceeded every expectation our production team had. The mood, the sound design, and the seamless continuity between shots felt like an A24 theatrical preview. Remarkable pacing and emotional weight.',
    clientName: 'David Vance',
    clientRole: 'Indie Film Director & Producer',
    project: 'The Lost Sonata Teaser Trailer',
    rating: 5,
    tag: 'Cinematic Movie Trailer',
    initials: 'DV',
    highlight: 'Theatrical Quality & Sound Design',
  },
  {
    id: 'sophia-chen',
    quote:
      'Our conversion rate on paid video ads doubled within the first week of launching the commercial. The luxury tabletop lighting, fluid simulation, and crisp product motion looked like a multimillion-dollar studio spot. Hands down our best creative investment this year.',
    clientName: 'Sophia Chen',
    clientRole: 'Head of Growth & Brand Marketing',
    project: 'Lumina Commercial Product Campaign',
    rating: 5,
    tag: 'Commercial Product Ads',
    initials: 'SC',
    highlight: '2x Ad Conversion & Luxury Lighting',
  },
  {
    id: 'marcus-holloway',
    quote:
      'Working with Morrow Visuals on our corporate campaign was effortless. They took complex financial messaging and transformed it into a compelling narrative film that held the audience spellbound from the opening shot to the final frame.',
    clientName: 'Marcus Holloway',
    clientRole: 'Creative Director',
    project: 'AccessBank Campaign Film',
    rating: 5,
    tag: 'Commercial Film & Storytelling',
    initials: 'MH',
    highlight: 'Compelling Narrative & Seamless Workflow',
  },
  {
    id: 'elena-rostova',
    quote:
      'The architectural animation and atmosphere captured the exact prestige we needed for our luxury residences. The transitions from golden hour to dusk lighting were executed with total mastery. Prompt communication and early delivery.',
    clientName: 'Elena Rostova',
    clientRole: 'Managing Partner & Marketing Director',
    project: 'Palma Bay Luxury Residences',
    rating: 5,
    tag: 'Architectural Animation & Film',
    initials: 'ER',
    highlight: 'Flawless Atmosphere & Early Delivery',
  },
  {
    id: 'julian-thorne',
    quote:
      'Finding an editor and AI director who genuinely understands narrative pacing, character consistency, and high-fidelity color grading is rare. Morrow Visuals turned our episodic series concept into a visually arresting cinematic reality.',
    clientName: 'Julian Thorne',
    clientRole: 'Showrunner & Digital Content Creator',
    project: 'Episodic Sci-Fi Series Development',
    rating: 5,
    tag: 'Episodic Series & AI Direction',
    initials: 'JT',
    highlight: 'Character Consistency & Worldbuilding Mastery',
  },
];
