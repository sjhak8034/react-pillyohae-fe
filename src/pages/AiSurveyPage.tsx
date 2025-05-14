import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  SurveyForm,
  Lifestyle,
  postSurvey,
  createAiRecommend,
} from "../api/survey";

const AiSurveyPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [form, setForm] = useState<SurveyForm>({
    healthGoals: [],
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    healthCondition: "",
    lifestyle: {
      exercise: "",
      smoking: "",
      sleepQuality: "",
      stressLevel: "",
    },
  });

  // Health goal options
  const healthGoalOptions = [
    "면역력 강화",
    "피로 회복",
    "다이어트",
    "집중력 향상",
    "소화 개선",
    "혈액순환 개선",
    "항산화 효과",
    "노화 방지",
    "에너지 증가",
    "스트레스 해소",
  ];

  // Calculate progress
  const progress = (step / totalSteps) * 100;

  // Handle health goal selection
  const toggleHealthGoal = (goal: string) => {
    const currentGoals = [...form.healthGoals];
    const goalIndex = currentGoals.indexOf(goal);

    // If goal already selected, remove it
    if (goalIndex !== -1) {
      currentGoals.splice(goalIndex, 1);
    }
    // If less than 3 goals selected, add it
    else if (currentGoals.length < 3) {
      currentGoals.push(goal);
    }

    setForm({ ...form, healthGoals: currentGoals });
  };

  // Navigation functions
  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Form submission
  const submitSurvey = async () => {
    try {
      // In a real app, you would send the form data to your API
      // await api.post('/surveys', form);
      console.log("Form submitted:", form);
      const surveyId = (await postSurvey(form)).surveyId;
      createAiRecommend(surveyId);
      alert("설문이 성공적으로 제출되었습니다!");
      // navigate('/results'); // Navigate to results page
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("설문 제출 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div
          className="h-full bg-blue-500 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Stepper header */}
      <div className="flex justify-between mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${
                  i + 1 < step
                    ? "bg-green-500 text-white"
                    : i + 1 === step
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
            >
              {i + 1}
            </div>
            <span className="text-xs mt-1 text-center hidden sm:block">
              {i === 0 && "건강 목표"}
              {i === 1 && "개인 정보"}
              {i === 2 && "영양제"}
              {i === 3 && "건강 상태"}
              {i === 4 && "생활 습관"}
            </span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* Step 1: Health Goals */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              건강 목표를 선택해주세요
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {healthGoalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleHealthGoal(goal)}
                  className={`py-2 px-3 rounded-md transition-colors ${
                    form.healthGoals.includes(goal)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {form.healthGoals.includes(goal) && (
                    <span className="mr-1">
                      {form.healthGoals.indexOf(goal) + 1}위
                    </span>
                  )}
                  {goal}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              {form.healthGoals.length}/3개 선택 완료
            </p>
          </>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4">개인 정보 입력</h2>
            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-700 mb-2">
                연령
              </label>
              <input
                type="number"
                id="age"
                value={form.age || ""}
                onChange={(e) =>
                  setForm({ ...form, age: parseInt(e.target.value) || null })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <p className="block text-gray-700 mb-2">성별</p>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="남성"
                    checked={form.gender === "남성"}
                    onChange={() => setForm({ ...form, gender: "남성" })}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">남성</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="여성"
                    checked={form.gender === "여성"}
                    onChange={() => setForm({ ...form, gender: "여성" })}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">여성</span>
                </label>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Health Status & Diet */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold mb-4">건강 상태 및 식습관</h2>
            <div className="mb-4">
              <label htmlFor="medical" className="block text-gray-700 mb-2">
                현재 건강 상태 (예: 고혈압, 당뇨)
              </label>
              <input
                type="text"
                id="medical"
                value={form.healthCondition}
                onChange={(e) =>
                  setForm({ ...form, healthCondition: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        {/* Step 4: Lifestyle */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              생활 습관 및 추가 정보
            </h2>
            <div className="mb-4">
              <label htmlFor="exercise" className="block text-gray-700 mb-2">
                운동 빈도 (주당 횟수)
              </label>
              <input
                type="number"
                min="0"
                max="7"
                id="exercise"
                value={form.lifestyle.exercise}
                onChange={(e) => {
                  setForm({
                    ...form,
                    lifestyle: {
                      ...form.lifestyle,
                      exercise: e.target.value,
                    },
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <p className="block text-gray-700 mb-2">흡연 여부</p>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="smoking"
                    value="yes"
                    checked={form.lifestyle.smoking === "yes"}
                    onChange={() => {
                      setForm({
                        ...form,
                        lifestyle: {
                          ...form.lifestyle,
                          smoking: "yes",
                        },
                      });
                    }}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">흡연 있음</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="smoking"
                    value="no"
                    checked={form.lifestyle.smoking === "no"}
                    onChange={() => {
                      setForm({
                        ...form,
                        lifestyle: {
                          ...form.lifestyle,
                          smoking: "no",
                        },
                      });
                    }}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">흡연 없음</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="sleep" className="block text-gray-700 mb-2">
                수면의 질
              </label>
              <select
                id="sleep"
                value={form.lifestyle.sleepQuality}
                onChange={(e) => {
                  setForm({
                    ...form,
                    lifestyle: {
                      ...form.lifestyle,
                      sleepQuality: e.target.value,
                    },
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택해주세요</option>
                <option value="좋음">좋음</option>
                <option value="보통">보통</option>
                <option value="나쁨">나쁨</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="stress" className="block text-gray-700 mb-2">
                스트레스 수준
              </label>
              <select
                id="stress"
                value={form.lifestyle.stressLevel}
                onChange={(e) => {
                  setForm({
                    ...form,
                    lifestyle: {
                      ...form.lifestyle,
                      stressLevel: e.target.value,
                    },
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택해주세요</option>
                <option value="낮음">낮음</option>
                <option value="중간">중간</option>
                <option value="높음">높음</option>
              </select>
            </div>
          </>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        {step > 1 ? (
          <button
            onClick={prevStep}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            이전
          </button>
        ) : (
          <div></div> // Empty div for spacing
        )}

        {step < totalSteps ? (
          <button
            onClick={nextStep}
            disabled={
              (step === 1 && form.healthGoals.length === 0) ||
              (step === 2 && (!form.age || !form.gender))
            }
            className={`px-4 py-2 rounded-md ${
              (step === 1 && form.healthGoals.length === 0) ||
              (step === 2 && (!form.age || !form.gender))
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            다음
          </button>
        ) : (
          <button
            onClick={submitSurvey}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            설문 저장하기
          </button>
        )}
      </div>
    </div>
  );
};

export default AiSurveyPage;
