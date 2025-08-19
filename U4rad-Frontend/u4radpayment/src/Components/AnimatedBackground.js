import React, { useState, useEffect } from 'react';

const AnimatedBackground = ({ children }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles with random positions and properties
    const generateParticles = () => {
      return Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 6,
        opacity: 0.1 + Math.random() * 0.4
      }));
    };

    setParticles(generateParticles());
  }, []);

  const ParticleBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-red-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity * 0.6,
            animation: `floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
          }}
        />
      ))}

      {/* Large dark floating orbs */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${200 + i * 80}px`,
            height: `${200 + i * 80}px`,
            left: `${(i % 2 === 0 ? -10 + i * 15 : 70 + i * 10)}%`,
            top: `${-5 + i * 20}%`,
            background: `radial-gradient(circle, rgba(15, 15, 15, 0.8) 0%, rgba(30, 30, 30, 0.6) 40%, transparent 70%)`,
            animation: `floatOrb ${8 + i * 2}s ease-in-out ${i * 1.2}s infinite`
          }}
        />
      ))}

      {/* Red accent circles */}
      {[1, 2, 3].map((i) => (
        <div
          key={`accent-${i}`}
          className="absolute rounded-full border-2 border-red-600"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            left: `${(i === 1 ? 80 : i === 2 ? 15 : 60)}%`,
            top: `${(i === 1 ? 60 : i === 2 ? 20 : 80)}%`,
            background: 'rgba(220, 38, 38, 0.1)',
            animation: `floatAccent ${6 + i * 1.5}s ease-in-out ${i * 0.8}s infinite`,
            boxShadow: '0 0 30px rgba(220, 38, 38, 0.2)'
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Medical cross symbols with red theme */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={`cross-${i}`}
          className="absolute text-red-400 font-bold select-none"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            fontSize: `${16 + i * 2}px`,
            opacity: 0.2,
            animation: `floatCross ${5 + i * 0.8}s ease-in-out ${i * 0.6}s infinite`,
            textShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
          }}
        >
          ✚
        </div>
      ))}

      {/* Subtle glowing dots */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={`glow-${i}`}
          className="absolute rounded-full"
          style={{
            width: '8px',
            height: '8px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'rgba(239, 68, 68, 0.4)',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
            animation: `floatGlow ${4 + i * 1.5}s ease-in-out ${i * 1}s infinite`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <ParticleBackground />
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-15px);
          }
          75% {
            transform: translateY(-25px) translateX(5px);
          }
        }

        @keyframes floatOrb {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.1);
          }
        }

        @keyframes floatAccent {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg) scale(1.05);
            opacity: 0.6;
          }
        }

        @keyframes floatCross {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-25px) rotate(180deg);
            opacity: 0.4;
          }
        }

        @keyframes floatGlow {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-30px) scale(1.3);
            opacity: 0.8;
          }
        }

        @keyframes pulse {
          0% {
            opacity: 0.2;
            transform: scale(1);
          }
          100% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;