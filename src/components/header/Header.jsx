import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo.jsx";
import Container from "../container/Container.jsx";

function Header() {
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      to: "/",
      text: "Home",
      active: true,
    },
    {
      to: "/login",
      text: "Login",
      active: !status,
    },
    {
      to: "/allposts",
      text: "All Posts",
      active: status,
    },
    {
      to: "/add-post",
      text: "Add Post",
      active: status,
    },
    {
      to: "/signup",
      text: "Signup",
      active: !status,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div>
            <ul className="flex ml-auto">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.text}>
                    <button
                      onClick={() => navigate(item.to)}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.text}
                    </button>
                  </li>
                ) : null
              )}
              {status && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
