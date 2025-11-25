import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MenuButton from "./components/MenuButton";
import Sidebar from "./components/SideBar";
import { GlobalStyle  } from "./globalStyle";
function App() {
  const [showMenuButton, setShowMenuButton] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleMenuClick() {
    setShowMenuButton(false);
    setSidebarOpen(true);
  }

  function handleSidebarClose() {W
    setSidebarOpen(false);
    setShowMenuButton(true);
  }

  return (

      <BrowserRouter>
            <GlobalStyle/>

        {showMenuButton && <MenuButton onClick={handleMenuClick} />}
        <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
        <AppRoutes />
      </BrowserRouter>

  );
}

export default App;
