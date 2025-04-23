// Mock data for the Elophaz mentor-connect platform

// Anime avatar URLs
export const avatars = [
  "https://api.dicebear.com/7.x/personas/svg?seed=Felix&backgroundColor=b6e3f4",
  "https://api.dicebear.com/7.x/personas/svg?seed=Miyuki&backgroundColor=ffdfbf",
  "https://api.dicebear.com/7.x/personas/svg?seed=Touma&backgroundColor=c0aede",
  "https://api.dicebear.com/7.x/personas/svg?seed=Rei&backgroundColor=d1d4f9",
  "https://api.dicebear.com/7.x/personas/svg?seed=Asuka&backgroundColor=ffd6cc",
  "https://api.dicebear.com/7.x/personas/svg?seed=Kaworu&backgroundColor=c1e1c1",
  "https://api.dicebear.com/7.x/personas/svg?seed=Misato&backgroundColor=ffccaa",
  "https://api.dicebear.com/7.x/personas/svg?seed=Shinji&backgroundColor=c4e0f9",
];

// College data
export const colleges = [
  {
    name: "IIT Delhi",
    mentorCount: 34,
    location: "Delhi",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/200px-Indian_Institute_of_Technology_Delhi_Logo.svg.png"
  },
  {
    name: "IIT Bombay",
    mentorCount: 42,
    location: "Mumbai",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png"
  },
  {
    name: "BITS Pilani",
    mentorCount: 28,
    location: "Pilani",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/200px-BITS_Pilani-Logo.svg.png"
  },
  {
    name: "NIT Trichy",
    mentorCount: 19,
    location: "Tiruchirappalli",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/NIT_Trichy_logo.svg/200px-NIT_Trichy_logo.svg.png"
  },
];

// Mentor data
export const mentors = [
  {
    id: "m1",
    name: "Arjun Kumar",
    anonymousName: "RT456s",
    gender: "Male",
    college: "IIT Delhi",
    department: "Computer Science",
    year: 3,
    avatar: avatars[0],
    rating: 4.8,
    reviewCount: 24,
    verified: true,
    ratePerCall: 100,
    bio: "I'm a CS student passionate about AI. Ask me about placements, internships, or campus life!",
    reviews: [
      { user: "Priya S", rating: 5, text: "Arjun gave me great insights about the CS curriculum and placement opportunities." },
      { user: "Rahul T", rating: 4, text: "Very helpful in explaining the admission process and campus culture." },
    ]
  },
  {
    id: "m2",
    name: "Sneha Patel",
    anonymousName: "QJ782p",
    gender: "Female",
    college: "IIT Bombay",
    department: "Electrical Engineering",
    year: 4,
    avatar: avatars[1],
    rating: 4.9,
    reviewCount: 31,
    verified: true,
    ratePerCall: 120,
    bio: "Final year EE student. Happy to discuss research opportunities, internships, and campus life!",
    reviews: [
      { user: "Amir K", rating: 5, text: "Sneha's advice on research projects was incredibly valuable." },
      { user: "Leela M", rating: 5, text: "She gave me a real picture of what to expect in the program." },
    ]
  },
  {
    id: "m3",
    name: "Vikram Singh",
    anonymousName: "ZX210b",
    gender: "Male",
    college: "BITS Pilani",
    department: "Mechanical Engineering",
    year: 2,
    avatar: avatars[2],
    rating: 4.7,
    reviewCount: 16,
    verified: true,
    ratePerCall: 90,
    bio: "Mech engineer with a passion for robotics. Let's talk about clubs, events, and academics!",
    reviews: [
      { user: "Deepak R", rating: 5, text: "Vikram helped me understand the robotics clubs and opportunities." },
      { user: "Sanya P", rating: 4, text: "Great overview of the mechanical engineering program." },
    ]
  },
  {
    id: "m4",
    name: "Meera Iyer",
    anonymousName: "PL690z",
    gender: "Female",
    college: "NIT Trichy",
    department: "Chemical Engineering",
    year: 3,
    avatar: avatars[4],
    rating: 4.6,
    reviewCount: 13,
    verified: false,
    ratePerCall: 80,
    bio: "Chemical engineering student. Happy to discuss academics, hostel life, and extracurriculars!",
    reviews: [
      { user: "Karthik L", rating: 5, text: "Meera provided helpful insights about lab work and internships." },
      { user: "Nandini S", rating: 4, text: "Honest feedback about the chemical engineering program." },
    ]
  },
];

// Platform features
export const features = [
  {
    title: "Verified Mentors",
    description: "All mentors are verified through college ID and email",
    icon: "shield-check"
  },
  {
    title: "Pay-per-Call",
    description: "Only pay for the time you talk, starting at ₹100 for 30 mins",
    icon: "credit-card"
  },
  {
    title: "Anime Avatars",
    description: "Choose your unique anime avatar for a fun experience",
    icon: "user-circle"
  },
  {
    title: "Real Reviews",
    description: "Read honest reviews from students who've used the platform",
    icon: "star"
  }
];

// FAQ questions
export const faqs = [
  {
    question: "How do I know mentors are real college students?",
    answer: "All mentors go through a verification process where they must provide their college ID and verify their college email address."
  },
  {
    question: "How much does a mentorship call cost?",
    answer: "Calls start at ₹100 for 30 minutes. Each mentor sets their own rate, clearly displayed on their profile."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Yes! If you end a call within the first 5 minutes, you'll receive a full refund."
  },
  {
    question: "How do I become a mentor?",
    answer: "Current college students can sign up as mentors. You'll need to verify your identity with your college ID and email."
  }
];

// Testimonials
export const testimonials = [
  {
    name: "Ankit Sharma",
    avatar: avatars[5],
    college: "Delhi University",
    text: "Elophaz helped me connect with seniors from my dream college who gave me real insights I couldn't find anywhere else.",
    rating: 5
  },
  {
    name: "Riya Agarwal",
    avatar: avatars[6],
    college: "Manipal University",
    text: "The mentors here are so helpful and genuine. I got all my questions about campus life and academics answered honestly.",
    rating: 4
  },
  {
    name: "Mohammed Farhan",
    avatar: avatars[7],
    college: "SRM University",
    text: "Being able to talk to actual students from IITs and NITs was invaluable for my admission decisions.",
    rating: 5
  }
];
