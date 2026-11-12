// Founder story content. The build fails in production until `inHerWords`
// is populated from the kickoff interview and the shoot (file 08 item 12).

export const founder = {
  name: "Oluwadamilola Ojo",
  portrait: "/images/founder/portrait.jpg",
  inHerWords: [] as { question: string; answer: string }[],
};

export const founderQuestions = [
  "What was happening in your life on the day you decided to start?",
  "Tell us about the first batch. What did you get wrong?",
  "Which order made you think this can work?",
  "What do customers say that you did not expect?",
  "What does a normal morning look like before the first bottle leaves?",
  "What is the one thing you would tell a buyer who has never tried it?",
];
