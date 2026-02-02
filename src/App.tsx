import Com_TopBar from "./components/Com_TopBar";
import { Outlet } from "react-router-dom";
import "@/design/App.css";

function App() {
  return (
    <main className="theme_bg_0 text_0 select-none" style={{ height: '100vh' }}>
      <Com_TopBar />
      <div className="mx-auto" style={{ height: 'calc(100vh - 33px)', maxWidth: '1200px' }}>
        <Outlet />
      </div>
    </main>
  );
}

export default App;
