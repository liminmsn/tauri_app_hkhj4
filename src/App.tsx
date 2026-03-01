import Com_TopBar from "./components/com_topBar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@/design/App.css";
import GlobalEvent from "./tools/GlobalEvent";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    GlobalEvent.on('top', scrollTop);
  }, [])

  const location = useLocation();
  const isPlayPage = location.pathname.startsWith("/play");
  // const [topBtn, setTopBtn] = useState(false);
  // function onScroll(e: React.UIEvent<HTMLDivElement>) {
  //   const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
  //   const speed = (scrollTop + clientHeight) / scrollHeight;
  //   setTopBtn(speed > 0.6);
  // }
  const scrollDoM = useRef<HTMLDivElement>(null);
  function scrollTop(bol: boolean) {
    scrollDoM.current?.scrollTo({
      top: 0,
      behavior: bol ? 'smooth' : 'instant'
    })
  }

  return (
    <main className="theme_bg_0 text_0 select-none" style={{ height: '100vh' }}>
      <Com_TopBar />
      {/* onScroll={onScroll} */}
      <div ref={scrollDoM} className="mx-auto overflow-y-auto" style={{ height: 'calc(100vh - 33px)', maxWidth: isPlayPage ? '' : '1200px' }}>
        {/* topBtn && */}
        {!isPlayPage &&
          <div onClick={() => GlobalEvent.send('top', true)} className="p-2 theme_0 shadow-md rounded-sm cursor-pointer active:scale-90 z-100 fixed right-4 bottom-4">
            <Icon icon="line-md:upload-twotone-loop" width="24" height="24" />
          </div>}
        <Outlet />
        <ToastContainer />
      </div>
    </main>
  );
}

export default App;
