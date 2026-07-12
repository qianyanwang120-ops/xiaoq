export type Mood = "great" | "good" | "okay" | "bad" | "terrible";

export const moodEmojis: Record<Mood, string> = {
  great: "😸",
  good: "😺",
  okay: "🐱",
  bad: "😿",
  terrible: "🙀",
};

export const moodLabels: Record<Mood, string> = {
  great: "超棒",
  good: "不错",
  okay: "一般",
  bad: "低落",
  terrible: "难过",
};

export interface MoodRecord {
  date: string;
  mood: Mood;
}
