import React, { useState, useRef, useEffect } from "react";
import "./particle3.css";
import { motion } from "framer-motion";
import useMousePosition from "./utils/useMousePosition";

const Particle3 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 800 : 40;
  const barrierDistance = size / 2; // Distance from barrier's center to repel particles
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const stuckParticlesRef = useRef(new Map());
  const moveThreshold = 10; // Set the movement threshold to release particles
  const prevMaskPosRef = useRef({ x: 0, y: 0 });
  const [showAlert, setShowAlert] = useState(false);
  const [hasBoxShadow, setHasBoxShadow] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const createParticles = () => {
      if (particlesRef.current.length === 0) {
        for (let i = 0; i < 700; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 1,
            speedX: Math.random() * 5 - 1,
            speedY: Math.random() * 5 - 1,
            opacity: Math.random(),
          });
        }
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#808080";

      particlesRef.current.forEach((particle) => {
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const updateParticles = () => {
      const dx = x - prevMaskPosRef.current.x;
      const dy = y - prevMaskPosRef.current.y;
      const distanceMoved = Math.sqrt(dx * dx + dy * dy);

      if (distanceMoved > moveThreshold) {
        stuckParticlesRef.current.clear();
      }

      if (stuckParticlesRef.current.size > 300) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }

      particlesRef.current.forEach((particle, index) => {
        const distFromBarrier = Math.sqrt(
          Math.pow(particle.x - x, 2) + Math.pow(particle.y - y, 2)
        );

        const isOnEdge =
          distFromBarrier > barrierDistance - 5 &&
          distFromBarrier < barrierDistance + 5;

        if (isOnEdge) {
          if (!stuckParticlesRef.current.has(index)) {
            stuckParticlesRef.current.set(index, {
              originalX: particle.x,
              originalY: particle.y,
            });
          }
        } else {
          stuckParticlesRef.current.delete(index);
        }

        if (!stuckParticlesRef.current.has(index)) {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x > canvas.width) particle.x = 0;
          else if (particle.x < 0) particle.x = canvas.width;

          if (particle.y > canvas.height) particle.y = 0;
          else if (particle.y < 0) particle.y = canvas.height;
        }
      });

      prevMaskPosRef.current = { x, y };
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      drawParticles();
      updateParticles();
    };

    createParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [x, y, size, barrierDistance, moveThreshold]);

  return (
    <main className="heading-main">
      <canvas ref={canvasRef} className="particle-canvas" />
      <motion.div
        className={`mask ${hasBoxShadow ? "box-shadow" : ""}`}
        style={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
          
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          setHasBoxShadow(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setHasBoxShadow(false);
        }}
      >
        <div className="mask-heading" style={{height:`${size}px`,width:`${size}px`}}>HAPPY CLEAN ROOMS</div>
      </motion.div>
      {showAlert && (
        <div className={`alert ${showAlert ? "alert-shake" : ""}`}>
          Shake the Dust off
        </div>
      )}
    </main>
  );
};

export default Particle3;
