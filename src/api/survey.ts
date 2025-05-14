import api from "./auth";

export interface SurveyForm {
  healthGoals: string[];
  age: number | null;
  gender: string;
  height: number;
  weight: number;
  healthCondition: string;
  lifestyle: Lifestyle;
}

export interface Lifestyle {
  exercise: string;
  smoking: string;
  sleepQuality: string;
  stressLevel: string;
}

interface SurveyResponse {
  surveyId: number;
  categories: string;
  createdAt: Date;
}

export const postSurvey = async (
  survey: SurveyForm
): Promise<SurveyResponse> => {
  const response = await api.post("/surveys", survey);
  return response.data;
};

export const createAiRecommend = async (surveyId: number) => {
  await api.post(`/surveys/${surveyId}/recommendations`);
};
