import Image from "next/image";

export function HeroTechnicalVisual() {
  return (
    <figure className="hero-visual" aria-label="Synqonic cybersecurity research interface">
      <svg className="hero-visual-circuit" viewBox="0 0 640 480" fill="none" aria-hidden="true">
        <path d="M0 112h94l36 36h82m428-62h-86l-35 35h-58M0 352h92l41-41h78m429 82h-83l-43-43h-50" />
        <path d="M76 0v61l38 38m411-99v67l-31 31M78 480v-65l38-38m411 103v-66l-31-31" />
        <circle cx="212" cy="148" r="3" />
        <circle cx="461" cy="121" r="3" />
        <circle cx="211" cy="311" r="3" />
        <circle cx="457" cy="350" r="3" />
      </svg>

      <div className="hero-visual-topline" aria-hidden="true">
        <span className="hero-visual-mark"><span /> SYNQONIC / LAB 01</span>
        <span className="hero-visual-index">SYS.001</span>
      </div>

      <div className="hero-visual-orbit">
        <span className="hero-visual-orbit-inner" />
        <Image
          src="/brand/synqonic-logo.png"
          alt="Synqonic logo"
          width={3338}
          height={3338}
          sizes="(max-width: 767px) 140px, (max-width: 1279px) 180px, 210px"
          className="hero-visual-logo"
          priority
        />
      </div>

      <div className="hero-visual-readout hero-visual-readout-left" aria-hidden="true">
        <span className="hero-visual-readout-label">NETWORK</span>
        <span className="hero-visual-readout-value">RESEARCH NODE</span>
        <span className="hero-visual-readout-line" />
        <span className="hero-visual-readout-label">PROTOCOL</span>
        <span className="hero-visual-readout-value">QUESTION / VERIFY</span>
      </div>
      <div className="hero-visual-readout hero-visual-readout-right" aria-hidden="true">
        <span className="hero-visual-coordinate">23.8 N</span>
        <span className="hero-visual-coordinate">90.4 E</span>
      </div>

      <div className="hero-visual-baseline" aria-hidden="true">
        <span>INDEPENDENT SECURITY THINKING</span>
        <span className="hero-visual-live"><i /> SYSTEM ONLINE</span>
      </div>
    </figure>
  );
}
