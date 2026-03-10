import Com_TopBar from "./components/com_topBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@/design/App.css";
import GlobalEvent from "./tools/GlobalEvent";
import { ToastContainer } from "react-toastify";
import { categoryHomePath } from "./hooks/CateGoryProvider";

function App() {
  const local = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (local.pathname == '/') {
      navigate(categoryHomePath());
    }
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    GlobalEvent.on('top', scrollTop);
  }, [])

  const location = useLocation();
  const isPlayPage = location.pathname.startsWith("/video/play");
  const scrollDoM = useRef<HTMLDivElement>(null);
  function scrollTop(bol: boolean) {
    scrollDoM.current?.scrollTo({
      top: 0,
      behavior: bol ? 'smooth' : 'instant'
    })
  }

  return (
    <main className="theme_bg_0 overflow-hidden text_0 select-none rounded-md" style={{ height: '100vh' }}>
      <Com_TopBar />
      <div ref={scrollDoM} className="mx-auto overflow-y-auto" style={{ height: 'calc(100vh - 32px)', maxWidth: isPlayPage ? '' : '1200px' }}>
        {!isPlayPage &&
          <div onClick={() => GlobalEvent.send('top', true)} className="p-2 theme_0 shadow-md rounded-md cursor-pointer active:scale-90 z-100 fixed right-4 bottom-4">
            <Icon icon="line-md:upload-twotone-loop" width="24" height="24" />
          </div>}
        <Outlet />
        <ToastContainer />
      </div>
    </main>
  );
}

export default App;
