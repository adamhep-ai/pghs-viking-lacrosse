import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { TreePage } from "./pages/TreePage";
import { RuleDetailPage } from "./pages/RuleDetailPage";
import { BasicsPage } from "./pages/BasicsPage";
import { RulesPage } from "./pages/RulesPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="min-h-full flex flex-col bg-white">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/t" element={<TreePage />} />
          <Route path="/t/:nodeId" element={<TreePage />} />
          <Route path="/r/:ruleId" element={<RuleDetailPage />} />
          <Route path="/basics" element={<BasicsPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
