import "./assets/css/style.css";
import { useState } from "react";
import MainNav from "./components/MainNav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ShopContext from "./context/ShopContext";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import PurchaseHistory from "./components/PurchaseHistory";
function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const clickHandler = (e) => {
    const clickedElm = e.target.classList;
    if (!clickedElm.contains("dd")) {
      setIsDropdownOpen(false);
    }
  };
  return (
    <div className="app" onClick={(e) => clickHandler(e)}>
      <Router>
        <ShopContext>
          <MainNav
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
          <Switch>
            <Route path="/" exact component={Shop} />
            <Route path="/cart" component={Cart} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/purchasehistory" component={PurchaseHistory} />
          </Switch>
        </ShopContext>
      </Router>
    </div>
  );
}

export default App;
