import React from "react";
import "./intro.css";
import {
  motion,
  useViewportScroll,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Intro = () => {
  const intro = useRef();
  const card = useRef();
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [dis, setDis] = useState(false);
  const [latest, setLatest] = useState(false);

  const { scrollYProgress } = useScroll({
    target: intro,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.6) {
      setDis(true);
      setLatest(latest);
    } else {
      setDis(false);
      setLatest(latest)
    }
  });
  const { height } = dimension;

  const y = useTransform(scrollYProgress, [0, 1], [0, -height * 0.92]);
  //   console.log(y)

  const transy = useTransform(scrollYProgress, [0, 1], [0, height * 2.73]);
  const alty = useTransform(scrollYProgress, [0, 1], [0, -height * 1.2]);


  // Opacity change based on scroll progress
  const opacity = useTransform(scrollYProgress, [0, 1], [0, (latest+0.8)]);




  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    console.log(card.current.style);
  }, [card]);

  // Flip animation based on scroll progress
  const flip = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="intro">
      <div className="intro-wrapper" ref={intro}>
        <motion.div
          ref={card}
          className="single-card"
          style={{
            rotateY: y,
            translateY: transy,
            display: dis ? "none" : "block",
          }}
        >
          <div className="front">
            <img
              src={require("../../../images/Home/Intro/worker.avif")}
              alt="worker"
              className="front-worker-image"
            />
          </div>
          {/* <div className="back">
          <h2>Content</h2>
        </div> */}
        </motion.div>
        <motion.div
          ref={card}
          className="single-card"
          style={{
            rotateY: y,
            translateY: transy,
            display: dis ? "none" : "block",
          }}
        >
          <div className="front">
            <img
              src={require("../../../images/Home/Intro/worker.avif")}
              alt="worker"
              className="front-worker-image"
            />
          </div>
          {/* <div className="back">
          <h2>Content</h2>
        </div> */}
        </motion.div>
        <motion.div
          ref={card}
          className="single-card"
          style={{
            rotateY: y,
            translateY: transy,
            display: dis ? "none" : "block",
          }}
        >
          <div className="front">
            <img
              src={require("../../../images/Home/Intro/worker.avif")}
              alt="worker"
              className="front-worker-image"
            />
          </div>
          {/* <div className="back">
          <h2>Content</h2>
        </div> */}
        </motion.div>
      </div>
        <motion.div className="introduction-container" style={{opacity,translateY: alty}}>
            Hello
        </motion.div>
    </div>
  );
};

export default Intro;
