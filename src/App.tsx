import "assets/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "constants/routes";
import SignInPage from "pages/SignInPage";
import GlobalContextProvider from "GlobalContextProvider";
import SignUpPage from "pages/SignUpPage";
import MyPage from "pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes>
          <Route index element={<h1>Hello</h1>} />
          <Route path={routes.signIn()} element={<SignInPage />} />
          <Route path={routes.signUp()} element={<SignUpPage />} />
          <Route path={routes.myPage()} element={<MyPage />} />
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
