import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import CreateShortLinkPage from "./pages/CreateShortLinkPage";
import Layout from "@/components/global/Layout";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Donate from "./pages/Donate";
import RedirectPage from "./pages/RedirectPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<CreateShortLinkPage />} />
          <Route path="/app/*" element={<Outlet></Outlet>}>
            <Route path="redirect" element={<RedirectPage />} />
            <Route index element={<CreateShortLinkPage />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="donate" element={<Donate />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
