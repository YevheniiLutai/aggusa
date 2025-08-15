"use client";

import { useEffect, useRef } from "react";

interface Leaf {
  el: HTMLDivElement;
  x: number;
  y: number;
  z: number;
  rotation: {
    axis: "X" | "Y" | "Z";
    value: number;
    speed: number;
    x: number;
  };
  xSpeedVariation: number;
  ySpeed: number;
}

interface WindOptions {
  magnitude: number;
  maxSpeed: number;
  duration: number;
  start: number;
  speed: (t: number, y: number) => number;
}

interface LeafSceneOptions {
  numLeaves: number;
  wind: WindOptions;
}

export default function FallingLeaves() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    class LeafScene {
      viewport: HTMLDivElement;
      world: HTMLDivElement;
      leaves: Leaf[] = [];
      options: LeafSceneOptions;
      width: number;
      height: number;
      timer = 0;
      rafId: number | null = null;
      onResize = () => {
        this.width = this.viewport.offsetWidth;
        this.height = this.viewport.offsetHeight;
      };

      constructor(el: HTMLDivElement) {
        this.viewport = el;
        this.world = document.createElement("div");
        this.world.className = "leaf-scene";
        this.options = {
          numLeaves: 24,
          wind: {
            magnitude: 1.2,
            maxSpeed: 12,
            duration: 300,
            start: 0,
            speed: () => 0,
          },
        };
        this.width = this.viewport.offsetWidth;
        this.height = this.viewport.offsetHeight;
      }

      private resetLeaf(leaf: Leaf) {
        leaf.x = this.width * 2 - Math.random() * this.width * 1.75;
        leaf.y = -10;
        leaf.z = Math.random() * 200;

        if (leaf.x > this.width) {
          leaf.x = this.width + 10;
          leaf.y = (Math.random() * this.height) / 2;
        }
        if (this.timer === 0) {
          leaf.y = Math.random() * this.height;
        }

        // rotation axis and speed
        leaf.rotation.speed = Math.random() * 10;
        const randomAxis = Math.random();
        if (randomAxis > 0.5) {
          leaf.rotation.axis = "X";
        } else if (randomAxis > 0.25) {
          leaf.rotation.axis = "Y";
          leaf.rotation.x = Math.random() * 180 + 90;
        } else {
          leaf.rotation.axis = "Z";
          leaf.rotation.x = Math.random() * 360 - 180;
          leaf.rotation.speed = Math.random() * 3;
        }

        // travel speed
        leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
        leaf.ySpeed = Math.random() + 1.5;
      }

      private updateLeaf(leaf: Leaf) {
        const leafWindSpeed = this.options.wind.speed(
          this.timer - this.options.wind.start,
          leaf.y
        );
        const xSpeed = leafWindSpeed + leaf.xSpeedVariation;

        leaf.x -= xSpeed;
        leaf.y += leaf.ySpeed;
        leaf.rotation.value += leaf.rotation.speed;

        let t = `translateX(${leaf.x}px) translateY(${leaf.y}px) translateZ(${leaf.z}px) rotate${leaf.rotation.axis}(${leaf.rotation.value}deg)`;
        if (leaf.rotation.axis !== "X") {
          t += ` rotateX(${leaf.rotation.x}deg)`;
        }
        leaf.el.style.transform = t;

        if (leaf.x < -10 || leaf.y > this.height + 10) {
          this.resetLeaf(leaf);
        }
      }

      private updateWind() {
        if (
          this.timer === 0 ||
          this.timer > this.options.wind.start + this.options.wind.duration
        ) {
          this.options.wind.magnitude =
            Math.random() * this.options.wind.maxSpeed;
          this.options.wind.duration =
            this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
          this.options.wind.start = this.timer;

          const screenHeight = this.height;
          this.options.wind.speed = function (t: number, y: number) {
            const a =
              (this.magnitude / 2) *
              (screenHeight - (2 * y) / 3) /
              screenHeight;
            return (
              a *
                Math.sin((2 * Math.PI / this.duration) * t + (3 * Math.PI) / 2) +
              a
            );
          };
        }
      }

      init() {
        // build leaves
        for (let i = 0; i < this.options.numLeaves; i++) {
          const el = document.createElement("div");
          el.className = "leaf";
          // visible even without image assets
          el.textContent = "🍂";

          const leaf: Leaf = {
            el,
            x: 0,
            y: 0,
            z: 0,
            rotation: { axis: "X", value: 0, speed: 0, x: 0 },
            xSpeedVariation: 0,
            ySpeed: 0,
          };
          this.resetLeaf(leaf);
          this.leaves.push(leaf);
          this.world.appendChild(leaf.el);
        }

        this.viewport.appendChild(this.world);
        this.world.style.perspective = "400px";
        window.addEventListener("resize", this.onResize);
      }

      render = () => {
        this.updateWind();
        for (let i = 0; i < this.leaves.length; i++) {
          this.updateLeaf(this.leaves[i]);
        }
        this.timer++;
        this.rafId = requestAnimationFrame(this.render);
      };

      destroy() {
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
        window.removeEventListener("resize", this.onResize);
        // remove generated DOM
        if (this.world.parentElement) {
          this.world.parentElement.removeChild(this.world);
        }
        this.leaves = [];
      }
    }

    const scene = new LeafScene(containerRef.current);
    scene.init();
    scene.render();

    return () => scene.destroy();
  }, []);

  // fixed, full-viewport overlay so you actually see the effect
  return <div ref={containerRef} className="falling-leaves" />;
}