import { Lesson, CreativePrompt } from '../types';

export const CURRENT_WEEK_PROMPT: CreativePrompt = {
  id: 'prompt-w24',
  weekNumber: 24,
  title: 'Discover Your Creative Voice: What Inspires You?',
  theme: 'Draw What Matters to You',
  tagline: 'Spend 45 minutes this week exploring your ideas and drawing freely.',
  description: 'Art is a wonderful way to show who you are. This week, let go of perfection and enjoy the feeling of drawing. Take any paper you have and use bold lines, soft shadows, and simple shapes to bring your favorite memories, dreams, and feelings to life.',
  guidedQuestions: [
    'What colors and pictures pop into your head when you close your eyes?',
    'If your favorite feeling was a shape and color, what would it look like?',
    'Where is your favorite peaceful place in Nepal or at home?',
    'What is one story from your life you would love to tell through art?'
  ],
  recommendedMedium: 'Charcoal, dark pencil, black ink, or tea wash on plain paper',
  suggestedMusicMood: 'Peaceful acoustic guitar & rain sounds'
};

export const LESSONS_DATA: Lesson[] = [
  {
    id: 'lesson-middle-01',
    title: 'Charcoal Drawing: Expressive Lines & Mountain Shapes',
    gradeLevel: 'middle',
    gradeDisplay: 'Grades 6–8 (Middle School)',
    category: 'Self-Expression',
    duration: '45 mins',
    difficulty: 'Expressive / All Levels',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    videoPoster: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    videoDuration: '14:20',
    description: 'Learn how simple charcoal from a wood stove or fireplace can create bold lines, soft smoky shadows, and dramatic mountain peaks.',
    emotionalGoal: 'Build drawing confidence with big, sweeping arm movements, rich dark values, and fun smudge techniques.',
    learningObjectives: [
      'Draw with whole-arm gestures to create strong, expressive strokes',
      'Learn how light vs firm pressure changes the look of your lines',
      'Use a pinch of soft bread or an eraser to add shining white highlights',
      'Embrace smudges and marks as part of your unique personal style'
    ],
    chapters: [
      { id: 'c1', time: '00:00', title: 'Relaxing Your Hands', description: 'Shaking out hand tension and getting ready to draw freely.' },
      { id: 'c2', time: '02:40', title: 'Holding the Charcoal', description: 'Holding charcoal like a paintbrush to use both pointed and flat sides.' },
      { id: 'c3', time: '06:15', title: 'The Wave Exercise', description: 'Practicing bold rhythms and flowing marks across the paper.' },
      { id: 'c4', time: '10:30', title: 'Adding the Light', description: 'Using an eraser or bread pinch to uncover bright clouds and snowy ridges.' },
      { id: 'c5', time: '13:00', title: 'Signing Your Work', description: 'Adding your personal signature and giving your drawing a title.' }
    ],
    zeroBudgetMaterials: [
      {
        standard: 'Willow Charcoal Stick',
        nepaliAlternative: 'Cold charcoal from a cooking stove or fireplace',
        howToPrepare: 'Pick a cooled piece of black charcoal from the stove and wipe off loose gray ash.'
      },
      {
        standard: 'Heavy Drawing Paper',
        nepaliAlternative: 'Thick cardboard back of an old school notebook',
        howToPrepare: 'Tear off the sturdy brown cardboard back cover of a finished notebook.'
      },
      {
        standard: 'Kneaded Art Eraser',
        nepaliAlternative: 'A small pinch of fresh bread or roti dough',
        howToPrepare: 'Roll fresh bread dough into a little ball and press it onto charcoal to lift clean bright spots!'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Free Your Posture',
        action: 'Stand up or sit straight. Place your paper flat so your arm can move comfortably.',
        mindsetTip: 'Relax your shoulders and breathe easy. Good drawing starts with a relaxed body.'
      },
      {
        number: 2,
        title: 'Quick Expressive Lines',
        action: 'Think of a wild landscape or stormy sky. Draw bold, quick lines across the paper.',
        mindsetTip: 'There are no wrong marks in art. Every stroke adds personality.'
      },
      {
        number: 3,
        title: 'Blend and Highlight',
        action: 'Use your fingers to soften lines into cloudy shadows. Then use an eraser to reveal bright lights.',
        mindsetTip: 'Look closely: can you spot a flying bird, a mountain peak, or a river in your shadows?'
      },
      {
        number: 4,
        title: 'Give Your Art a Name',
        action: 'Sign your name in the corner and give your artwork a title that means something to you.',
        mindsetTip: 'You created something truly original that only you could make.'
      }
    ],
    reflectionQuestions: [
      'How did moving your whole arm change how bold your lines felt?',
      'Which part of your drawing has the most energy and movement?',
      'What did you discover about your own drawing style today?'
    ],
    instructor: {
      name: 'Pratima Shrestha',
      role: 'Art Educator & Painter',
      location: 'Patan / Lalitpur, Nepal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'lesson-high-01',
    title: 'Traditional Mithila: Culture & Personal Identity',
    gradeLevel: 'high',
    gradeDisplay: 'Grades 9–10 (High School)',
    category: 'Contemporary Voice',
    duration: '55 mins',
    difficulty: 'Intermediate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
    videoPoster: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80',
    videoDuration: '18:45',
    description: 'Explore Nepal’s rich Mithila art tradition. Learn how historic double-line techniques and rhythmic line fills can tell stories about your own life, community, and hopes for the future.',
    emotionalGoal: 'Find peace and deep focus through repetitive linear patterns, celebrating your heritage through personal art.',
    learningObjectives: [
      'Master the traditional double-line outline (Kachni) and steady line hatching',
      'Discover how artists across Nepal use mural traditions to share community stories',
      'Invent your own modern symbols that represent daily life and dreams in Nepal',
      'Create an original artwork to express your personal artistic story'
    ],
    chapters: [
      { id: 'm1', time: '00:00', title: 'The Power of the Line', description: 'How wall paintings in Madhesh preserved vibrant stories across centuries.' },
      { id: 'm2', time: '03:15', title: 'The Double-Line Outline', description: 'Drawing clean parallel borders ready to be filled with line patterns.' },
      { id: 'm3', time: '07:40', title: 'Modern Symbols & Storytelling', description: 'Combining birds, fish, and trees with modern elements like books and music.' },
      { id: 'm4', time: '12:50', title: 'Filling the Patterns (Kachni)', description: 'Finding calm rhythm with fine hatching lines and tiny repeating dots.' },
      { id: 'm5', time: '17:00', title: 'Sharing Your Story', description: 'Writing a short note about the meaning behind your symbols.' }
    ],
    zeroBudgetMaterials: [
      {
        standard: 'Calligraphy Dip Pen & Ink',
        nepaliAlternative: 'Carved bamboo stick pen with black ink or soot water',
        howToPrepare: 'Whittle the tip of a thin bamboo stick into a sharp slant. Dip into ink to draw fine lines.'
      },
      {
        standard: 'Artist Liquid Inks',
        nepaliAlternative: 'Kitchen turmeric water, beet juice, or warm black tea',
        howToPrepare: 'Mix warm water with turmeric powder or brew dark black tea for warm, natural colors.'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Draw the Main Subject',
        action: 'With light pencil, sketch a central figure: a leaping fish, an open book with sprouting leaves, or a soaring bird.',
        mindsetTip: 'Mithila art is symbolic and expressive, not photographic. Keep shapes simple and clear.'
      },
      {
        number: 2,
        title: 'Enclose with Double Lines',
        action: 'Trace each outline with two parallel lines. Keep your strokes steady and even.',
        mindsetTip: 'Feel your mind quiet down as your hand traces the steady borders.'
      },
      {
        number: 3,
        title: 'Pattern Hatching (Kachni)',
        action: 'Fill the inside shapes with repeating diagonal lines, little dots, or tiny flowers.',
        mindsetTip: 'Taking your time creates a pleasant, calming creative rhythm.'
      },
      {
        number: 4,
        title: 'Add Warm Colors',
        action: 'Paint select areas with turmeric yellow or warm tea, leaving the sharp black lines crisp.',
        mindsetTip: 'Leaving white space gives your artwork room to shine.'
      }
    ],
    reflectionQuestions: [
      'Did drawing repeating lines help your mind feel calmer and more centered?',
      'Which traditional Nepali symbols did you enjoy drawing the most?',
      'What story does your artwork tell about your life today?'
    ],
    instructor: {
      name: 'Rabin Mandal',
      role: 'Contemporary Painter & Educator',
      location: 'Janakpur / Kathmandu, Nepal',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'lesson-primary-01',
    title: 'The Whispering Forest: Leaf Prints & Nature Colors',
    gradeLevel: 'primary',
    gradeDisplay: 'Grades 1–5 (Primary School)',
    category: 'Form & Freedom',
    duration: '35 mins',
    difficulty: 'Beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    videoPoster: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    videoDuration: '11:10',
    description: 'Collect fallen peepal, sal, or rhododendron leaves and discover how nature makes the best printing stamps for colorful imaginary animals.',
    emotionalGoal: 'Enjoy playful hands-on printing, curious exploration of textures, and creative fun with nature.',
    learningObjectives: [
      'Discover how the veins on the back of leaves act like natural stamp blocks',
      'Learn easy printmaking with water, watercolor, or food coloring',
      'Turn accidental print shapes into birds, dragons, and guardian creatures',
      'Take pride in the rich nature and biodiversity of Nepal'
    ],
    chapters: [
      { id: 'p1', time: '00:00', title: 'The Great Leaf Hunt', description: 'Exploring outdoors to find fallen leaves with interesting bumpy textures.' },
      { id: 'p2', time: '02:30', title: 'The Vein Secret', description: 'Discovering why the textured back of a leaf holds paint best.' },
      { id: 'p3', time: '05:20', title: 'Press, Rub, Peel!', description: 'The fun surprise of lifting paper to reveal your hidden leaf print.' },
      { id: 'p4', time: '08:45', title: 'Bringing Creatures to Life', description: 'Adding eyes, wings, and friendly smiles to your leaf shapes.' }
    ],
    zeroBudgetMaterials: [
      {
        standard: 'Printmaking Roller & Block Ink',
        nepaliAlternative: 'Fallen backyard leaves + leftover poster paint or food coloring',
        howToPrepare: 'Gather dry fallen leaves from around your home or school; wipe them clean.'
      },
      {
        standard: 'Brayer Press Tool',
        nepaliAlternative: 'The palm of your hand or a smooth river pebble',
        howToPrepare: 'Smooth river stones make great little weights to press paper onto leaves!'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Find Your Leaves',
        action: 'Collect 5 different shaped leaves from the ground. Feel their ridges with your fingertips.',
        mindsetTip: 'Nature never makes two leaves identical. Each one is wonderfully unique!'
      },
      {
        number: 2,
        title: 'Paint the Bumpy Side',
        action: 'Brush a thin coat of color (turmeric paste, watercolor, or paint) onto the textured back of the leaf.',
        mindsetTip: 'Use just enough paint—like morning dew on a petal.'
      },
      {
        number: 3,
        title: 'Press and Reveal',
        action: 'Place the painted leaf face-down on paper. Cover with scrap paper and press firmly with your palm.',
        mindsetTip: 'Count to five slowly, take a breath, and peel back the leaf!'
      },
      {
        number: 4,
        title: 'Add Fun Details',
        action: 'Look at the leaf outline. Does it look like a fish fin, butterfly, or mountain? Add eyes and give it a name.',
        mindsetTip: 'Your imagination can turn a simple leaf into an entire adventure.'
      }
    ],
    reflectionQuestions: [
      'Which leaf made the clearest and prettiest pattern?',
      'What do you enjoy most about exploring outside in nature?',
      'If your leaf creature could fly anywhere in Nepal, where would it go?'
    ],
    instructor: {
      name: 'Sunita Gurung',
      role: 'Children’s Workshop Guide',
      location: 'Pokhara, Nepal',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'lesson-middle-02',
    title: 'The Mask & The River: Dual Identity Collage',
    gradeLevel: 'middle',
    gradeDisplay: 'Grades 6–8 (Middle School)',
    category: 'Self Identity',
    duration: '50 mins',
    difficulty: 'Expressive / All Levels',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80',
    videoPoster: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80',
    videoDuration: '16:10',
    description: 'Celebrate who you are inside and out. Create an expressive split collage using torn newspapers, colorful paper, and drawings to explore your dreams and daily life.',
    emotionalGoal: 'Celebrate individuality and creative imagination in a fun, supportive art space.',
    learningObjectives: [
      'Combine everyday newspaper words with personal drawings',
      'Create a visual portrait exploring both daily life and your inner dream world',
      'Learn how mixing different materials makes artwork interesting and deep',
      'Build confidence in sharing your personal thoughts and voice'
    ],
    chapters: [
      { id: 'cl1', time: '00:00', title: 'Outer Life & Inner Dreams', description: 'Thinking about how our daily activities and creative dreams work together.' },
      { id: 'cl2', time: '03:10', title: 'Hunting for Words & Patterns', description: 'Tearing old newspapers and colored papers for inspiring words and shapes.' },
      { id: 'cl3', time: '07:30', title: 'Building the Split Portrait', description: 'Left side features structured daily forms; Right side features free, flowing shapes.' },
      { id: 'cl4', time: '12:00', title: 'Connecting with Ink Wash', description: 'Adding soft ink or tea washes to pull the whole picture together.' }
    ],
    zeroBudgetMaterials: [
      {
        standard: 'Art Glues & Adhesives',
        nepaliAlternative: 'Cooked wheat flour paste (simple homemade paste)',
        howToPrepare: 'Mix 1 spoon of flour with 4 spoons of warm water until smooth.'
      },
      {
        standard: 'Collage Craft Paper',
        nepaliAlternative: 'Old newspapers, magazines, wrapping paper, or calendars',
        howToPrepare: 'Look for interesting headlines and words in Nepali and English.'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Draw the Head Outline',
        action: 'Sketch a simple outline of a head or profile in the middle of your page.',
        mindsetTip: 'It does not need to look like a photograph. Keep it simple and expressive.'
      },
      {
        number: 2,
        title: 'The Everyday World (Left Side)',
        action: 'Glue down newspaper text, calendars, and geometric shapes on the left half.',
        mindsetTip: 'This represents our daily routines, study time, and everyday life.'
      },
      {
        number: 3,
        title: 'The Dream World (Right Side)',
        action: 'Add colorful torn shapes, flowing stars, waves, or animals on the right half.',
        mindsetTip: 'Let colors spill freely across the page. Your creativity has no limits.'
      }
    ],
    reflectionQuestions: [
      'Which words or colors in your collage feel most like your true personality?',
      'If your imagination had a soundtrack or weather, what would it be?',
      'How does mixing paper textures help you tell a story?'
    ],
    instructor: {
      name: 'Ashish Tamang',
      role: 'Visual Artist & Mentor',
      location: 'Kathmandu / Dhulikhel, Nepal',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'lesson-high-02',
    title: 'Light & Shadow: Mountain Light in Daily Life',
    gradeLevel: 'high',
    gradeDisplay: 'Grades 9–10 (High School)',
    category: 'Observational Flow',
    duration: '60 mins',
    difficulty: 'Intermediate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80',
    videoPoster: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80',
    videoDuration: '19:20',
    description: 'Learn observational drawing skills. Notice how sunlight cuts through wooden lattice windows and village doorways, creating rich light and shadow.',
    emotionalGoal: 'Turn busy days into calm observation, enjoying the peaceful feeling of slow, mindful drawing.',
    learningObjectives: [
      'Master the basic values: bright highlight, gentle midtone, and deep shadow',
      'Learn to see shapes of light instead of just drawing outlines',
      'Draw realistic depth in classic Nepali architecture and everyday objects',
      'Experience how patience and observation bring drawings to life'
    ],
    chapters: [
      { id: 'ar1', time: '00:00', title: 'The Peace of Stillness', description: 'Pausing to notice how sunlight and shadow interact in your home.' },
      { id: 'ar2', time: '04:00', title: 'Building a Value Scale', description: 'Practicing smooth pencil shading from light paper white to deep dark gray.' },
      { id: 'ar3', time: '08:30', title: 'Blocking in Shadows', description: 'Drawing the large areas of dark shadow first.' },
      { id: 'ar4', time: '14:10', title: 'Soft Bounce Light', description: 'Adding gentle bounce light on wooden sills and brick surfaces.' }
    ],
    zeroBudgetMaterials: [
      {
        standard: 'Graphite Shading Pencil Set',
        nepaliAlternative: 'Standard school pencil + charcoal dust',
        howToPrepare: 'Tilt your everyday pencil sideways to shade wide, smooth areas with ease.'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Find a Sunlit Corner',
        action: 'Find an interesting window sill, doorway, or tea kettle catching morning sunlight.',
        mindsetTip: 'Look for clean, clear edges where bright light meets dark shadow.'
      },
      {
        number: 2,
        title: 'Squint to Simplify',
        action: 'Squint your eyes so small details blur away. Focus only on light versus dark shapes.',
        mindsetTip: 'Draw the dark shapes of the shadow first, not individual bricks.'
      },
      {
        number: 3,
        title: 'Build Tone Step by Step',
        action: 'Shade gently in light diagonal strokes. Gradually build up dark tones like twilight falling.',
        mindsetTip: 'Taking your time is the secret to rich, realistic shading.'
      }
    ],
    reflectionQuestions: [
      'How did spending time studying light change how you notice ordinary objects?',
      'Does shadow make a drawing feel more peaceful and dramatic?',
      'What part of your drawing has the most convincing sense of light?'
    ],
    instructor: {
      name: 'Bikram Thapa',
      role: 'Fine Arts Lecturer & Draftsman',
      location: 'Bhaktapur, Nepal',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'lesson-primary-02',
    title: 'Clay Sculpting: Making a Little Animal Friend',
    gradeLevel: 'primary',
    gradeDisplay: 'Grades 1–5 (Primary School)',
    category: 'Form & Freedom',
    duration: '40 mins',
    difficulty: 'Beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    videoPoster: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    videoDuration: '13:05',
    description: 'Use natural garden clay or river soil to sculpt your own little guardian animal to keep on your study desk.',
    emotionalGoal: 'Enjoy sensory grounding with natural earth clay, celebrating Nepal’s pottery heritage.',
    learningObjectives: [
      'Learn simple pinch-pot shaping using natural local soil or clay',
      'Understand how 3D shapes stand up securely without toppling',
      'Press in seeds, rice grains, and twigs to give personality to your sculpture',
      'Create an inspiring little friend to keep on your desk'
    ],
    chapters: [
      { id: 'cy1', time: '00:00', title: 'Testing Your Soil', description: 'Rolling a little soil snake to test if it is sticky enough for sculpting.' },
      { id: 'cy2', time: '03:15', title: 'The Hollow Core', description: 'Making a pinch-pot dome so your sculpture dries evenly.' },
      { id: 'cy3', time: '06:40', title: 'Adding Ears & Horns', description: 'Scratching surfaces with a twig and water so little parts stay attached.' },
      { id: 'cy4', time: '10:00', title: 'Adding Eyes and Details', description: 'Pressing in mustard seeds or lentils for expressive eyes.' }
    ],
    zeroBudgetMaterials: [
      {
        standard: 'Ceramic Pottery Clay',
        nepaliAlternative: 'Riverbank mud or clean garden clay',
        howToPrepare: 'Dig under top grass to find clean, sticky clay. Knead with a splash of water until soft.'
      }
    ],
    steps: [
      {
        number: 1,
        title: 'Knead the Clay',
        action: 'Squeeze the wet clay in your hands until soft and smooth like roti dough.',
        mindsetTip: 'Feel how cooling and relaxing the earth feels in your hands.'
      },
      {
        number: 2,
        title: 'Form the Body',
        action: 'Roll a ball, press your thumb inside to make a little hollow bell shape.',
        mindsetTip: 'A hollow shape helps the clay dry strong without cracking.'
      },
      {
        number: 3,
        title: 'Shape the Face',
        action: 'Pull out friendly ears, a little snout, or happy horns for your animal.',
        mindsetTip: 'Is your guardian creature wise, playful, or silly? Make it yours!'
      },
      {
        number: 4,
        title: 'Dry in the Shade',
        action: 'Place your sculpture in the shade for two days to dry slowly and stay strong.',
        mindsetTip: 'Keep it on your table as a reminder of your creativity.'
      }
    ],
    reflectionQuestions: [
      'How did kneading the cool clay feel in your hands?',
      'What name and special mission did you give your little animal friend?',
      'Did you know that potters in Bhaktapur and Thimi create wonderful ceramics this same way?'
    ],
    instructor: {
      name: 'Gita Prajapati',
      role: 'Traditional Terracotta Sculptor',
      location: 'Thimi / Bhaktapur, Nepal',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    }
  }
];
