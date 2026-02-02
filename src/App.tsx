import Com_TopBar from "./components/Com_TopBar";
import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@/design/App.css";

function App() {
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => e.preventDefault())
  }, [])
  const [topBtn, setTopBtn] = useState(false);
  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const speed = (scrollTop + clientHeight) / scrollHeight;
    setTopBtn(speed > 0.58);
  }
  const scrollDoM = useRef<HTMLDivElement>(null);
  function scrollTop() {
    scrollDoM.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <main className="theme_bg_0 text_0 select-none" style={{ height: '100vh' }}>
      <Com_TopBar />
      <div ref={scrollDoM} onScroll={onScroll} className="mx-auto overflow-y-auto" style={{ height: 'calc(100vh - 33px)', maxWidth: '1200px' }}>
        {topBtn &&
          <div onClick={scrollTop} className="p-2 theme_0 shadow-md rounded-sm cursor-pointer active:scale-90 z-100 fixed right-4 bottom-4">
            <Icon icon="line-md:upload-twotone-loop" width="24" height="24" />
          </div>}
        <Outlet />
      </div>
    </main>
  );
}

export default App;
