import React, { useEffect, useRef, useState } from "react";
import "./particle2.css";

const Particle2 = () => {
    const canvasRef = useRef(null);
    const divRef = useRef(null);
    const barrierDistance = 200; // Define the barrier distance
    let particles = [];
  
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const numParticles = 300;
    
        const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          particles = [];
          init();
        };
  
      class Particle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = Math.random() * (4 - 1) + 1; // Random size between 3 and 5
          this.speedX = (Math.random() - 0.5) * 4; // Increased speed
          this.speedY = (Math.random() - 0.5) * 4; // Increased speed
          this.opacity = Math.random(); // Random opacity
        }
  
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
  
          // Constrain particles within the canvas bounds
          if (this.x > canvas.width) this.x = 0;
          else if (this.x < 0) this.x = canvas.width;
  
          if (this.y > canvas.height) this.y = 0;
          else if (this.y < 0) this.y = canvas.height;
  
          // Calculate distance from div's center
          const div = divRef.current;
          const divRect = div.getBoundingClientRect();
          const centerX = divRect.left + divRect.width / 2;
          const centerY = divRect.top + divRect.height / 2;
  
          const dx = this.x - centerX;
          const dy = this.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < barrierDistance) {
            // Stop particles when they reach the barrier
            this.speedX = 0;
            this.speedY = 0;
          }
        }
  
        draw() {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // Red color with varying opacity
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }
      }
  
      const init = () => {
        const divRect = divRef.current.getBoundingClientRect();
        const centerX = divRect.left + divRect.width / 2;
        const centerY = divRect.top + divRect.height / 2;
  
        for (let i = 0; i < numParticles; i++) {
          let x, y;
  
          do {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
          } while (
            x > centerX - barrierDistance &&
            x < centerX + barrierDistance &&
            y > centerY - barrierDistance &&
            y < centerY + barrierDistance
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
  
      const modifyParticles = () => {
        const particlesToRemove = 50; // Number of particles to remove from the barrier
        let removedCount = 0;
  
        // Remove a limited number of particles from the barrier
        particles = particles.filter((particle) => {
          const div = divRef.current;
          const divRect = div.getBoundingClientRect();
          const centerX = divRect.left + divRect.width / 2;
          const centerY = divRect.top + divRect.height / 2;
  
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < barrierDistance && removedCount < particlesToRemove) {
            removedCount++;
            return false; // Remove particles within the barrier up to particlesToRemove
          }
          return true;
        });
  
        // Generate the same number of removed particles in the canvas
        for (let i = 0; i < particlesToRemove; i++) {
          let x, y;
  
          do {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
          } while (
            // Ensure new particles are not inside the barrier
            // Adjust the barrier's coordinates and distance if necessary
            // to suit your specific layout and barrier position
            x > divRef.current.offsetLeft - barrierDistance &&
            x < divRef.current.offsetLeft + divRef.current.offsetWidth + barrierDistance &&
            y > divRef.current.offsetTop - barrierDistance &&
            y < divRef.current.offsetTop + divRef.current.offsetHeight + barrierDistance
          );
  
          particles.push(new Particle(x, y));
        }
      };
  
      let modifyInterval = setInterval(modifyParticles, 5000); // Run modifyParticles every 5 seconds

      window.addEventListener('resize', resizeCanvas);
  
      resizeCanvas();
      animate();
  
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        clearInterval(modifyInterval); // Clear the interval on unmount
      };
    }, []);
  
    return (
      <>
        <div
          ref={divRef}
          style={{
            width: '400px',
            height: '400px',
            background: 'transparent',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '3px dashed rgba(0, 0, 255, 0.5)', // Visualize the barrier
          }}
        >
          {/* Content of your div */}
        </div>
        <canvas
          ref={canvasRef}
          style={{ position: 'fixed', top: 0,background:'black', left: 0, width: '100%', height: '100%', zIndex: -1 }}
        />
      </>
    );
};

export default Particle2;


