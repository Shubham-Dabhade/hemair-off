import React, { useEffect, useRef } from "react";
import "./particle4.css";
import { transform } from "framer-motion";

const Particle4 = () => {
  const canvasRef = useRef(null);
  const divRef = useRef(null);
  const barrierDistance = window.innerWidth>450?Math.min(window.innerWidth,window.innerHeight)*0.4:Math.min(window.innerWidth,window.innerHeight)/2;
  let particles = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const numParticles = 600;
    let repelForce = 0;

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * (5 - 1) + 1;
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
        ctx.fillStyle = `rgba(128, 128, 128, ${this.opacity})`;  //particle color
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
      // const barrierDistance = Math.min(window.innerWidthwidth,window.innerHeight)*0.2;
      const divSize =   window.innerWidth>450?Math.min(window.innerWidth, window.innerHeight, barrierDistance * 2):Math.min(window.innerWidth, window.innerHeight, barrierDistance*2);
      divRef.current.style.width = `${divSize}px`;
      divRef.current.style.height = `${divSize}px`;


      if(window.innerWidth<400){
        

      }
      


      for (let i = 0; i < numParticles; i++) {
        let x, y;
        do {
          x = Math.random() * canvas.width;
          y = Math.random() * canvas.height;
          // if(window.innerWidth<600){
            
          // }
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
      if(window.innerWidth){
        document.body.style.overflowX = "hidden";
      }
        // document.body.style.overflowY = window.innerWidth < 400 ? "scroll" : "auto";
      };

    const handleResize = () => {
      barrierDistance =
      window.innerWidth > 450
        ? Math.min(window.innerWidth, window.innerHeight) * 0.4
        : Math.min(window.innerWidth,window.innerHeight)/2;
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
          background: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'column'
        }}
      >
        <div className="loading-hemair-logo">Hemair</div>
        <div className="loading-hemair-desc">Sculpting Tomorrow's Clean Room Landscape Today.</div>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          background: "white",
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