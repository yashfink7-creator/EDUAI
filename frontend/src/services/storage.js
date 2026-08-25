const LESSONS_KEY = "eduai.savedLessons";
const QUIZZES_KEY = "eduai.savedQuizzes";

const readItems = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const writeItems = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};

const addItem = (key, item) => {
  const items = readItems(key);
  const savedItem = { ...item, id: item.id || `${Date.now()}-${Math.random()}` };
  writeItems(key, [savedItem, ...items]);
  return savedItem;
};

export const loadLibrary = () => ({
  lessons: readItems(LESSONS_KEY),
  quizzes: readItems(QUIZZES_KEY),
});

export const saveLesson = (lesson) => addItem(LESSONS_KEY, lesson);

export const saveQuiz = (quiz) => addItem(QUIZZES_KEY, quiz);
