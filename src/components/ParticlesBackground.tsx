import { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let isDirty = true; // Only redraw when something changed
        let lastRenderTime = 0;
        const TARGET_FPS = 30; // Cap at 30fps when idle – halves CPU/GPU load
        const FRAME_INTERVAL = 1000 / TARGET_FPS;

        const mouse: {
            x: number,
            y: number,
            radius: number,
            active: boolean,
            timer: ReturnType<typeof setTimeout> | null
        } = {
            x: -9999,
            y: -9999,
            radius: 130,
            active: false,
            timer: null
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            baseX: number;
            baseY: number;
            density: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 1.3 + 0.7;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 18) + 1;
            }

            update(): boolean {
                let moved = false;

                if (mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;

                    if (Math.abs(dx) < mouse.radius && Math.abs(dy) < mouse.radius) {
                        const distSq = dx * dx + dy * dy;
                        const rSq = mouse.radius * mouse.radius;
                        if (distSq < rSq) {
                            const distance = Math.sqrt(distSq);
                            const force = (mouse.radius - distance) / mouse.radius;
                            this.x -= (dx / distance) * force * this.density;
                            this.y -= (dy / distance) * force * this.density;
                            moved = true;
                        }
                    }
                }

                // Return to base position
                const dxBase = this.x - this.baseX;
                const dyBase = this.y - this.baseY;
                if (Math.abs(dxBase) > 0.1) { this.x -= dxBase / 12; moved = true; }
                if (Math.abs(dyBase) > 0.1) { this.y -= dyBase / 12; moved = true; }

                return moved;
            }
        }

        const init = () => {
            particles = [];
            // Reduced density: ~1 particle per 18000px²
            const count = Math.floor((canvas.width * canvas.height) / 18000);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                ));
            }
            isDirty = true;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // --- Draw all particles in one pass ---
            ctx.fillStyle = 'rgba(167, 139, 250, 0.45)';
            ctx.beginPath();
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.moveTo(p.x + p.size, p.y);
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            }
            ctx.fill();

            // --- Draw connections ---
            // Build a 2D spatial grid to avoid O(n²) comparisons
            const CELL = 100;
            const cols = Math.ceil(canvas.width / CELL) + 1;
            const grid: Map<number, number[]> = new Map();

            for (let i = 0; i < particles.length; i++) {
                const cx = Math.floor(particles[i].x / CELL);
                const cy = Math.floor(particles[i].y / CELL);
                const key = cy * cols + cx;
                if (!grid.has(key)) grid.set(key, []);
                grid.get(key)!.push(i);
            }

            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                const pa = particles[i];
                const cx = Math.floor(pa.x / CELL);
                const cy = Math.floor(pa.y / CELL);

                // Check only the 4 neighbouring cells (right, down, down-left, down-right)
                // to avoid double-drawing edges
                for (let dy = 0; dy <= 1; dy++) {
                    for (let dx = dy === 0 ? 1 : -1; dx <= 1; dx++) {
                        const neighbours = grid.get((cy + dy) * cols + (cx + dx));
                        if (!neighbours) continue;
                        for (let k = 0; k < neighbours.length; k++) {
                            const j = neighbours[k];
                            if (dy === 0 && j <= i) continue; // avoid double-draw
                            const pb = particles[j];
                            const ddx = pa.x - pb.x;
                            const ddy = pa.y - pb.y;
                            const distSq = ddx * ddx + ddy * ddy;
                            if (distSq < 10000) { // 100² = 10000
                                const opacity = (1 - Math.sqrt(distSq) / 100) * 0.12;
                                ctx.strokeStyle = `rgba(167,139,250,${opacity.toFixed(3)})`;
                                ctx.beginPath();
                                ctx.moveTo(pa.x, pa.y);
                                ctx.lineTo(pb.x, pb.y);
                                ctx.stroke();
                            }
                        }
                    }
                }
                // Same-cell neighbours (j > i only)
                const selfCell = grid.get(cy * cols + cx);
                if (selfCell) {
                    for (let k = 0; k < selfCell.length; k++) {
                        const j = selfCell[k];
                        if (j <= i) continue;
                        const pb = particles[j];
                        const ddx = pa.x - pb.x;
                        const ddy = pa.y - pb.y;
                        const distSq = ddx * ddx + ddy * ddy;
                        if (distSq < 10000) {
                            const opacity = (1 - Math.sqrt(distSq) / 100) * 0.12;
                            ctx.strokeStyle = `rgba(167,139,250,${opacity.toFixed(3)})`;
                            ctx.beginPath();
                            ctx.moveTo(pa.x, pa.y);
                            ctx.lineTo(pb.x, pb.y);
                            ctx.stroke();
                        }
                    }
                }
            }
        };

        const animate = (timestamp: number) => {
            animationFrameId = requestAnimationFrame(animate);

            const elapsed = timestamp - lastRenderTime;
            if (elapsed < FRAME_INTERVAL) return; // Throttle to TARGET_FPS

            lastRenderTime = timestamp - (elapsed % FRAME_INTERVAL);

            // Update particles and track if anything moved
            let anyMoved = false;
            for (let i = 0; i < particles.length; i++) {
                if (particles[i].update()) anyMoved = true;
            }

            // Only redraw if particles moved or a dirty flag is set
            if (anyMoved || isDirty) {
                draw();
                isDirty = false;
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
            mouse.active = true;
            isDirty = true;

            if (mouse.timer) clearTimeout(mouse.timer);
            mouse.timer = setTimeout(() => {
                mouse.active = false;
            }, 1500);
        };

        // Pause animation when tab is hidden
        const handleVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameId);
            } else {
                lastRenderTime = 0;
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        handleResize();
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (mouse.timer) clearTimeout(mouse.timer);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                pointerEvents: 'none'
            }}
        />
    );
};

export default ParticlesBackground;
