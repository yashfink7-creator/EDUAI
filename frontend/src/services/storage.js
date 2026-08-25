import { supabase } from "./supabase";

const requireClient = () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
};

const mapLesson = (row) => ({
  id: row.id,
  title: row.title,
  subject: row.subject,
  topic: row.topic,
  grade: row.grade,
  duration: row.duration,
  teachingStyle: row.teaching_style,
  plan: row.plan,
  savedAt: row.created_at,
});

const mapQuiz = (row) => ({
  id: row.id,
  title: row.title,
  subject: row.subject,
  topic: row.topic,
  grade: row.grade,
  difficulty: row.difficulty,
  questions: (row.quiz_questions || [])
    .sort((first, second) => first.question_order - second.question_order)
    .map((question) => ({
      question: question.question,
      options: question.options,
      answer: question.answer,
    })),
  savedAt: row.created_at,
});

export const loadLibrary = async (userId) => {
  const client = requireClient();
  const [{ data: lessonRows, error: lessonError }, { data: quizRows, error: quizError }] = await Promise.all([
    client.from("lessons").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    client.from("quizzes").select("*, quiz_questions(*)").eq("user_id", userId).order("created_at", { ascending: false }),
  ]);

  if (lessonError) throw lessonError;
  if (quizError) throw quizError;
  return { lessons: lessonRows.map(mapLesson), quizzes: quizRows.map(mapQuiz) };
};

export const saveLesson = async (lesson, userId) => {
  const { data, error } = await requireClient()
    .from("lessons")
    .insert({
      user_id: userId,
      title: lesson.title,
      subject: lesson.subject,
      topic: lesson.topic,
      grade: lesson.grade,
      duration: Number(lesson.duration),
      teaching_style: lesson.teachingStyle,
      plan: lesson.plan,
    })
    .select()
    .single();

  if (error) throw error;
  return mapLesson(data);
};

export const saveQuiz = async (quiz, userId) => {
  const client = requireClient();
  const { data: quizRow, error: quizError } = await client
    .from("quizzes")
    .insert({
      user_id: userId,
      title: quiz.title,
      subject: quiz.subject,
      topic: quiz.topic,
      grade: quiz.grade,
      difficulty: quiz.difficulty,
    })
    .select()
    .single();

  if (quizError) throw quizError;

  const { error: questionError } = await client.from("quiz_questions").insert(
    quiz.questions.map((question, index) => ({
      quiz_id: quizRow.id,
      question_order: index,
      question: question.question,
      options: question.options,
      answer: question.answer,
    }))
  );

  if (questionError) {
    await client.from("quizzes").delete().eq("id", quizRow.id);
    throw questionError;
  }

  return mapQuiz({ ...quizRow, quiz_questions: quiz.questions.map((question, index) => ({ ...question, question_order: index })) });
};
