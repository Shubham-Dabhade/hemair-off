import React, { useEffect, useRef } from "react";
import "./particle4.css";

const Particle4 = () => {
  const canvasRef = useRef(null);
  const divRef = useRef(null);
  const barrierDistance = 200;
  let particles = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const numParticles = 300;
    let repelForce = 0;

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * (4 - 1) + 1;
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = (Math.random() - 0.5) * 4;
        this.opacity = Math.random(); // Initialize opacity here
      }

      update() {
        const div = divRef.current;
        const divRect = div.getBoundingClientRect();
        const centerX = divRect.left + divRect.width / 2;
        const centerY = divRect.top + divRect.height / 2;

        const dx = this.x - centerX;
        const dy = this.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < barrierDistance) {
          const angle = Math.atan2(dy, dx);
          const repelMultiplier = this.opacity * 1.2; // Adjust repel force based on opacity

          this.speedX = Math.cos(angle) * repelForce * repelMultiplier;
          this.speedY = Math.sin(angle) * repelForce * repelMultiplier;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const divSize = Math.min(window.innerWidth, window.innerHeight, barrierDistance * 2);

      divRef.current.style.width = `${divSize}px`;
      divRef.current.style.height = `${divSize}px`;

      for (let i = 0; i < numParticles; i++) {
        let x, y;
        do {
          x = Math.random() * canvas.width;
          y = Math.random() * canvas.height;
        } while (
          x > divRef.current.offsetLeft - barrierDistance &&
          x < divRef.current.offsetLeft + divRef.current.offsetWidth + barrierDistance &&
          y > divRef.current.offsetTop - barrierDistance &&
          y < divRef.current.offsetTop + divRef.current.offsetHeight + barrierDistance
        );
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    const handleMouseOver = () => {
      repelForce = 1;
      particles.forEach((particle) => {
        // Update particles behavior when mouse is over barrier (existing logic remains unchanged)
      });
    };

    const handleMouseOut = () => {
      repelForce = 0;
    };

    const handleOverflow = () => {
        document.body.style.overflowX = window.innerWidth < 400 ? "hidden" : "auto";
        document.body.style.overflowY = window.innerWidth < 400 ? "scroll" : "auto";
      };

    const handleResize = () => {
      init();
      animate();
      handleOverflow();
    };

    divRef.current.addEventListener("mouseover", handleMouseOver);
    divRef.current.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleResize);

    init();
    animate();
    handleOverflow();

    return () => {
      divRef.current.removeEventListener("mouseover", handleMouseOver);
      divRef.current.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
    <div className="particle-container">

      <div
        ref={divRef}
        style={{
          width: "400px",
          height: "400px",
          background: "transparent",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "3px dashed rgba(0, 0, 255, 0.5)",
        }}
      >
        {/* Content of your div */}
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          background: "black",
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
    </div>
    </>
  );
};

export default Particle4;