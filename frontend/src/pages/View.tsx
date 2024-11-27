import { Route, Routes } from "react-router-dom";
import LLMMockPage from "./LLMMockPage";
import RootLayout from "@/layout/RootLayout";
import MainPage from "./MainPage";
import InterestPage from "./InterestPage";

function Views() {
  return (

        <Routes>
         
            <Route path="/" element={<RootLayout />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/interests" element={<InterestPage />} />
            </Route>
            <Route path="/docs" element={<LLMMockPage />} />
            <Route path="*" element={<MainPage />} />
        </Routes>

  )
}

export default Views