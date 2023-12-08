import React, { useState } from "react";
import "./navbar.css";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Navbar = () => {
  const [navHidden, setNavHidden] = useState(false);
  const [link, setLink] = useState(0);
  const { scrollY } = useScroll();

  //for removing the navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  //for checking which nav button is active
  const clickLink = (e, num) => {
    setLink(num);
  };

  return (
    <motion.div
      className="Navbar"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={navHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="navbar-left-component">
        <div className="navbar-logo-container">
          <img
            src={require("../../images/Navbar/hemair logo@2x-100.jpg")}
            alt=""
            className="navbar-logo-img"
          />
        </div>
      </div>
      <div className="navbar-middle-component">
        <ul className="middle-component-links-container">
          <li
            className={`link-container ${link === 0 && "active"}`}
            onClick={(e) => {
              clickLink(e, 0);
            }}
          >
            {" "}
            <a href="#">HOME</a>{" "}
          </li>
          <li
            className={`link-container cleanrooms-drop ${
              link === 1 && "active"
            }`}
            onClick={(e) => {
              clickLink(e, 1);
            }}
          >
            <a href="#">CLEANROOMS</a>
            <ArrowDropDownIcon className="drop-down-arrow" />
            <div className="drop-down-container">
              <ul className="drop-down-content">
                <li className="drop-down-link products-drop">
                  Products <KeyboardArrowRightIcon />
                  <div className="more-drop-down-container">
                    <ul className="more-drop-down-content">
                      <li className="more-drop-down-link">Product 1</li>
                      <li className="more-drop-down-link">Product 2</li>
                      <li className="more-drop-down-link">Product 3</li>
                      <li className="more-drop-down-link">Product 4</li>
                      <li className="more-drop-down-link">Product 5</li>
                    </ul>
                  </div>
                </li>
                <li className="drop-down-link industries-drop">
                  Industries <KeyboardArrowRightIcon />
                  <div className="more-drop-down-container-2">
                    <ul className="more-drop-down-content">
                      <li className="more-drop-down-link">Pharmaceutical</li>
                      <li className="more-drop-down-link">Medical</li>
                      <li className="more-drop-down-link">Electronics</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li
            className={`link-container ${link === 2 && "active"}`}
            onClick={(e) => {
              clickLink(e, 2);
            }}
          >
            <a href="#">ABOUT US</a>
          </li>
          <li
            className={`link-container ${link === 3 && "active"}`}
            onClick={(e) => {
              clickLink(e, 3);
            }}
          >
            <a href="#">PROJECTS</a>
          </li>
          <li
            className={`link-container ${link === 4 && "active"}`}
            onClick={(e) => {
              clickLink(e, 4);
            }}
          >
            <a href="#">CONTACT US</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right-component">
        <div className="navbar-right-logo-container">
          <a href="#">
            <img
              src={require("../../images/Navbar/icons8-linkedin-30.png")}
              alt=""
              className="navbar-social-img"
            />
          </a>
          <a href="#">
            <img
              src={require("../../images/Navbar/icons8-twitter-50.png")}
              alt=""
              className="navbar-social-img"
            />
          </a>
          <a href="#">
            <img
              src={require("../../images/Navbar/icons8-facebook-48.png")}
              alt=""
              className="navbar-social-img"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
