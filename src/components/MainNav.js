import { Link } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";

export default function MainNav(props) {
  const { isDropdownOpen, setIsDropdownOpen } = props;
  const { cart, currentUser, logOut } = useShopContext();

  const cartLength = cart.length > 0 ? `(${cart.length})` : "";
  return (
    <div className="navbar">
      <nav className="flex-wrapper-1">
        <Link className="nav-link" to="/">
          Shop
        </Link>

        <Link className="nav-link" to="/cart">
          Cart {cartLength}
        </Link>

        {currentUser ? (
          <div className="dropdown">
            <div
              className="nav-link dd"
              to="/login"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {currentUser.email}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link className="nav-link dd" to="/purchasehistory">
                  Purchase History
                </Link>
                <Link
                  className="nav-link dd"
                  to="/login"
                  onClick={() => {
                    logOut();
                    setIsDropdownOpen(false);
                  }}
                >
                  Log out
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-wrapper-2">
            <Link className="nav-link" to="/signup">
              Sign up
            </Link>
            /
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
