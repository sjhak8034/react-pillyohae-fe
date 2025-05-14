import { useState, useEffect } from "react";
import "./App.css";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ItemDetail from "./components/common/ItemDetail";
import { CartComponent } from "./components/common/Cart";
import { FC } from "react";
import FreshButton from "./features/FreshButton";
import "./styles/GlobalStyles.css";
import CategoryBar from "./features/CategoryBar";
import NavBar from "./features/NavBar";
import AiAssistButton from "./features/AiAssistButton";
import LoginPage from "./pages/LoginPage";
import { getUserProfile } from "./api/users";
import { MainPage } from "./pages/MainPage";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";
import { setUser } from "./store/userSlice";
import ProductRegisterPage from "./pages/ProductRegisterPage";
import { getNutrients, getCategories } from "./api/products";
import { setNutrient } from "./store/nutrientSlice";
import { setCategory } from "./store/categorySlice";
import AiSurveyPage from "./pages/AiSurveyPage";

const App: FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const dispatch = useDispatch<AppDispatch>();
  console.log(localStorage.getItem("accessToken"));
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getUserProfile();
        dispatch(setUser(profile));
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };

    fetchUser();
  }, [dispatch]);
  // 처음 렌더링 될때만 가져옴
  useEffect(() => {
    const fetchNutrient = async () => {
      try {
        const nutrient = await getNutrients();
        dispatch(setNutrient(nutrient));
      } catch (err) {
        console.error("Failed to fetch nutrient", err);
      }
    };
    const fetchCategory = async () => {
      try {
        const category = await getCategories();
        dispatch(setCategory(category));
      } catch (err) {
        console.error("Failed to fetch nutrient", err);
      }
    };
    fetchCategory();
    fetchNutrient();
  }, [dispatch]);

  return (
    <div className="App">
      {!isLoginPage && <NavBar />}
      {!isLoginPage && <CategoryBar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:id" element={<ItemDetail />} />
        <Route path="/cart" element={<CartComponent />} />
        <Route path="*" element={<div>404 not found 에러</div>} />
        <Route path="/fresh" element={<FreshButton />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/register" element={<ProductRegisterPage />} />
        <Route path="/ai-recommend" element={<AiSurveyPage></AiSurveyPage>} />
      </Routes>
      <AiAssistButton />
    </div>
  );
};

export default App;
