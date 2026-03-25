export interface Project {
  id: number;
  title: string;
  em: string;
  bg: string;
  cat: string;
  diff: 'beginner' | 'intermediate' | 'advanced';
  time: string;
  pts: number;
  desc: string;
  yt: string;
  steps: { t: string; d: string }[];
  mats: string[];
}

export interface Badge {
  id: string;
  name: string;
  em: string;
  earned: boolean;
  thresh: number;
  type: 'count' | 'cat' | 'pts';
  cat?: string;
}

export interface User {
  name: string;
  email: string;
}

export interface AppState {
  user: User | null;
  pts: number;
  done: number[];
  badges: Badge[];
  claimable: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Paper Bridge Challenge",
    em: "🌉",
    bg: "bg-bl",
    cat: "Engineering",
    diff: "beginner",
    time: "45 min",
    pts: 50,
    desc: "Build the strongest paper bridge using only cardstock and tape. Learn real structural engineering!",
    yt: "dQw4w9WgXcQ",
    steps: [
      { t: "Gather Materials", d: "Collect 5 sheets of cardstock, tape, scissors, and coins for testing." },
      { t: "Design Your Bridge", d: "Sketch your design. Triangles are the strongest shape in engineering!" },
      { t: "Build Accordion Supports", d: "Fold two sheets into accordion folds for your vertical supports." },
      { t: "Add the Bridge Deck", d: "Tape a flat sheet across the supports to create the road surface." },
      { t: "Load Test!", d: "Stack coins on top and count how many it holds before collapsing." }
    ],
    mats: ["5 sheets cardstock 📄", "Scotch tape 🪛", "Scissors ✂️", "Ruler 📏", "Coins for testing 🪙"]
  },
  {
    id: 2,
    title: "Mini Volcano Eruption",
    em: "🌋",
    bg: "bg-or",
    cat: "Science",
    diff: "beginner",
    time: "30 min",
    pts: 60,
    desc: "A classic chemical reaction spectacular! Make lava flow with baking soda and vinegar.",
    yt: "dQw4w9WgXcQ",
    steps: [
      { t: "Build the Volcano", d: "Shape clay or playdough into a cone, leaving an opening at the top." },
      { t: "Add Baking Soda", d: "Pour 2 tablespoons of baking soda into the opening." },
      { t: "Add Food Coloring", d: "Drop in red or orange food coloring for realistic lava effects!" },
      { t: "The Big Eruption", d: "Pour white vinegar and watch the spectacular fizzing eruption!" },
      { t: "Experiment More", d: "Try different amounts of each ingredient and observe what changes." }
    ],
    mats: ["Baking soda 🧂", "White vinegar 🍾", "Food coloring 🎨", "Clay or playdough 🏺", "Small container 🥤"]
  },
  {
    id: 3,
    title: "DIY Cardboard Robot",
    em: "🤖",
    bg: "bg-pu",
    cat: "Engineering",
    diff: "intermediate",
    time: "2 hours",
    pts: 120,
    desc: "Build your own robot with moving arms and glowing LED eyes. Full mechanical assembly included!",
    yt: "dQw4w9WgXcQ",
    steps: [
      { t: "Collect Cardboard Boxes", d: "Find boxes of different sizes for the torso, head, arms, and legs." },
      { t: "Cut All Parts", d: "Cut out robot body pieces using scissors or a craft knife (with adult help!)." },
      { t: "Assemble the Frame", d: "Connect parts with brass fasteners so the arms can actually move." },
      { t: "Add Glowing Eyes", d: "Poke holes for eyes, insert LEDs with a coin battery for cool glow effects." },
      { t: "Decorate Your Robot", d: "Paint, add buttons, dials, and make your robot totally unique!" }
    ],
    mats: ["Large cardboard boxes 📦", "Brass fasteners 🔩", "LED lights 💡", "Coin batteries 🔋", "Acrylic paint 🎨", "Hot glue gun 🔫"]
  },
  {
    id: 4,
    title: "Stretchy Slime Lab",
    em: "🟢",
    bg: "bg-gr",
    cat: "Chemistry",
    diff: "beginner",
    time: "30 min",
    pts: 40,
    desc: "Make satisfying, stretchy slime with simple ingredients. Explore polymer science!",
    yt: "dQw4w9WgXcQ",
    steps: [
      { t: "Mix the Glue Base", d: "Combine 1 cup white school glue with ½ cup water in a bowl." },
      { t: "Choose Your Color", d: "Add food coloring and stir until you achieve the perfect shade." },
      { t: "Add Baking Soda", d: "Mix in ½ teaspoon baking soda and stir thoroughly." },
      { t: "Activate the Slime", d: "Add contact lens solution a little at a time — the slime starts forming!" },
      { t: "Knead to Perfection", d: "Knead the slime until it's non-sticky and perfectly stretchy. Play!" }
    ],
    mats: ["White school glue 🖊️", "Baking soda 🧂", "Contact lens solution 👁️", "Food coloring 🎨", "Mixing bowl 🥣", "Spoon 🥄"]
  },
  {
    id: 5,
    title: "Solar System Model",
    em: "🪐",
    bg: "bg-te",
    cat: "Space",
    diff: "intermediate",
    time: "3 hours",
    pts: 150,
    desc: "Build a 3D scale model of our solar system with painted Styrofoam balls and string.",
    yt: "dQw4w9WgXcQ",
    steps: [
      { t: "Get Your Planets", d: "Buy 9 Styrofoam balls in sizes proportional to each planet." },
      { t: "Paint the Planets", d: "Paint Mercury (grey), Venus (yellow), Earth (blue-green), Mars (red)..." },
      { t: "Add Special Details", d: "Paint Saturn's rings, Jupiter's red spot, and Neptune's storms!" },
      { t: "Build the Frame", d: "Bend a wire hanger into an arc. The Sun hangs in the center." },
      { t: "Hang in Order", d: "Use different string lengths so planets orbit at correct distances." }
    ],
    mats: ["9 Styrofoam balls ⚪", "Paint set 🎨", "String/wire 🧵", "Wire hanger 🪝", "Reference chart 🌍", "Paintbrushes 🖌️"]
  },
  {
    id: 6,
    title: "LED Light-Up Card",
    em: "💡",
    bg: "bg-ye",
    cat: "Electronics",
    diff: "intermediate",
    time: "1 hour",
    pts: 100,
    desc: "Create a greeting card that lights up using a simple circuit. Learn basic electronics!",
    yt: "dQw4w9WgXcQ",
    steps: [
      { t: "Design Your Card", d: "Fold cardstock in half. Plan where your LED light will shine through." },
      { t: "Lay the Circuit", d: "Use copper conductive tape to make two parallel tracks inside the card." },
      { t: "Place the LED", d: "Set the LED so each leg touches a tape track. Long leg = positive!" },
      { t: "Add the Battery", d: "Attach a coin cell battery holder where the tape tracks meet." },
      { t: "Close & Light Up!", d: "Closing the card completes the circuit — it lights up! Decorate!" }
    ],
    mats: ["Cardstock 📄", "Copper conductive tape 🥇", "LED light 💡", "Coin cell battery 🔋", "Scissors ✂️", "Markers 🖊️"]
  },
  {
    id: 7,
    title: "Hydraulic Claw Machine",
    em: "🦾",
    bg: "bg-rd",
    cat: "Engineering",
    diff: "advanced",
    time: "4 hours",
    pts: 200,
    desc: "Build a working hydraulic claw machine using syringes and cardboard. Real fluid mechanics!",
    yt: "dQw4w9WgXcQ",
    steps: [
      { t: "Design the Arm", d: "Sketch and cut arm segments from thick corrugated cardboard." },
      { t: "Build the Frame", d: "Assemble arm segments with brass fasteners for pivoting motion." },
      { t: "Create the Claw", d: "Cut 3 curved claw fingers and attach them around a central pivot." },
      { t: "Set Up Hydraulics", d: "Fill two syringes with water and connect with plastic tubing." },
      { t: "Attach & Test", d: "Connect syringes to the claw. Push one syringe — the claw grabs!" }
    ],
    mats: ["Thick cardboard 📦", "4 plastic syringes 💉", "Plastic tubing 🧪", "Brass fasteners 🔩", "Hot glue gun 🔫", "String 🧵", "Water 💧"]
  },
  {
    id: 8,
    title: "Weather Station",
    em: "🌡️",
    bg: "bg-bl",
    cat: "Science",
    diff: "advanced",
    time: "3 hours",
    pts: 180,
    desc: "Build a fully functional weather station with rain gauge, wind vane, and barometer!",
    yt: "dQw4w9WgXcQ",
    steps: [
      { t: "Rain Gauge", d: "Cut the top off a plastic bottle. Invert it as a funnel into the bottom." },
      { t: "Wind Vane", d: "Balance a straw on a pin through an eraser. Add a cardstock arrow and tail." },
      { t: "Barometer", d: "Stretch a balloon over a jar. Tape a straw pointer to the balloon." },
      { t: "Build the Frame", d: "Attach all instruments to a wooden craft stick display frame." },
      { t: "Record Daily", d: "Check readings each morning and record weather patterns over time." }
    ],
    mats: ["Plastic bottle 🍾", "Drinking straws 🥤", "Balloon 🎈", "Glass jar 🫙", "Craft sticks 🪵", "Pin & eraser 📌", "Cardstock 📄"]
  },
  {
    id: 9,
    title: "Tie-Dye T-Shirt",
    em: "👕",
    bg: "bg-pk",
    cat: "Art & Craft",
    diff: "beginner",
    time: "2 hours",
    pts: 70,
    desc: "Create a vibrant, totally unique tie-dye shirt using rubber bands and fabric dye!",
    yt: "dQw4w9WgXcQ",
    steps: [
      { t: "Prep the Shirt", d: "Wash and dampen a white 100% cotton t-shirt. Lay flat on a protected surface." },
      { t: "Create Patterns", d: "Scrunch, twist, or spiral the shirt. Secure tightly with rubber bands." },
      { t: "Apply Dye", d: "Squirt fabric dye generously onto different sections. Use many colors!" },
      { t: "Wrap and Wait", d: "Wrap the shirt in plastic wrap and let it sit for 6-8 hours." },
      { t: "Reveal Your Art!", d: "Rinse in cold water, cut rubber bands, and see your unique masterpiece!" }
    ],
    mats: ["White cotton t-shirt 👕", "Fabric dye (multi-color) 🎨", "Rubber bands 🔴", "Plastic wrap 🫙", "Gloves 🧤", "Protective sheet 🛡️"]
  }
];

export const INITIAL_BADGES: Badge[] = [
  { id: 'first', name: 'First Step', em: '👣', earned: false, thresh: 1, type: 'count' },
  { id: 'beginner', name: 'Beginner Creator', em: '🌟', earned: false, thresh: 3, type: 'count' },
  { id: 'maker', name: 'Maker', em: '🔧', earned: false, thresh: 5, type: 'count' },
  { id: 'scientist', name: 'Young Scientist', em: '🔬', earned: false, thresh: 0, type: 'cat', cat: 'Science' },
  { id: 'engineer', name: 'Engineer', em: '⚙️', earned: false, thresh: 0, type: 'cat', cat: 'Engineering' },
  { id: 'artist', name: 'Creative Artist', em: '🎨', earned: false, thresh: 0, type: 'cat', cat: 'Art & Craft' },
  { id: 'master', name: 'DIY Master', em: '🏆', earned: false, thresh: 8, type: 'count' },
  { id: 'champion', name: 'Champion', em: '🥇', earned: false, thresh: 500, type: 'pts' }
];

export const BOT_RESPONSES: Record<string, string[]> = {
  hello: ["Hi there, maker! 👋 I'm MakerBot AI. Ready to build something amazing? Ask me anything!"],
  hi: ["Hey! 😊 What DIY project are you curious about today?"],
  help: ["I can help with: 🔧 Choosing a project, 📦 Materials needed, 📋 Step guidance, 💡 Troubleshooting. What do you need?"],
  project: ["We have 9 awesome projects! Beginner: Paper Bridge 🌉, Volcano 🌋, Slime 🟢, Tie-Dye 👕. Intermediate: Robot 🤖, Solar System 🪐, LED Card 💡. Advanced: Hydraulic Claw 🦾, Weather Station 🌡️. Which interests you?"],
  material: ["Materials are listed on each project page. Most use everyday items like cardboard, glue, tape, and paint. Always ask a grown-up before using sharp tools! 🛒"],
  point: ["Earn points by completing projects! Beginner = 40-70 pts, Intermediate = 100-150 pts, Advanced = 150-200 pts. ⭐"],
  badge: ["Badges are special achievements! Earn 'First Step' by completing 1 project, 'DIY Master' for 8 projects, 'Young Scientist' for science projects, and more! 🏅"],
  stuck: ["Don't give up! 💪 Every maker struggles sometimes. Try: 1) Re-reading the step 2) Watching the video again 3) Asking a parent 4) Describing your problem here and I'll help!"],
  easy: ["Try the Paper Bridge 🌉 or Mini Volcano 🌋 — both are beginner-friendly and super fun! Which sounds most interesting?"],
  hard: ["Challenge yourself with the Hydraulic Claw 🦾 (+200 pts!) or the Weather Station 🌡️. Both teach real engineering principles!"],
  default: ["That's a great question! 🤔 Try asking about: projects, materials, earning points, or what to do when stuck. I'm here to help you create awesome things! 🔧"]
};
