"use client";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/firebase";
import Image from "next/image";
import Icon from "@/app/images/icon.png";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef(null);
  const glossRef = useRef(null);
  const shineRef = useRef(null);
  const cardShadowRef = useRef(null);

  const theme = {
    bg: "#0b0b0d",
    glassBorder: "rgba(255,255,255,0.06)",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  };
  
  useEffect(() => {
    setLoading(true);
    Promise.resolve(params).then(async (unwrappedParams) => {
      try {
        const docId = unwrappedParams.id;
        const docRef = doc(db, "cards", docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setData(docSnap.data());
        else alert("No such DevCard exist, please try again");
      } catch (err) {
        console.error(err);
        alert("Error fetching card");
      } finally {
        setLoading(false);
      }
    });
  }, [params]);

  useEffect(() => {
    if (!data || !cardRef.current) return;

    let bounds = cardRef.current.getBoundingClientRect();
    function updateBounds() {
      if (cardRef.current) bounds = cardRef.current.getBoundingClientRect();
    }
    window.addEventListener("resize", updateBounds);

    let raf = null;
    let lastEvent = null;

    function applyTransforms(e) {
      lastEvent = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const { left, top, width, height } = bounds;
        const x = (lastEvent.clientX - left) / width;
        const y = (lastEvent.clientY - top) / height;
        const rx = (y - 0.5) * 10;
        const ry = (x - 0.5) * -15;

        if (cardRef.current) cardRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        if (shineRef.current) {
          const translatePercent = (x - 0.5) * 100;
          shineRef.current.style.transform = `rotate(25deg) translateX(${translatePercent}%)`;
        }
        if (glossRef.current) {
          glossRef.current.style.transform = `translate3d(${(x - 0.5) * 20}px, ${(y - 0.5) * 10}px, 0)`;
        }
        if (cardShadowRef.current) {
          const shadowBlur = 30 + Math.max(Math.abs(rx), Math.abs(ry)) * 2;
          cardShadowRef.current.style.boxShadow = `0 ${10 + Math.abs(ry)}px ${30 + shadowBlur}px rgba(2,6,23,0.7)`;
        }

        if (cardRef.current && !cardRef.current.classList.contains("hovered"))
          cardRef.current.classList.add("hovered");
      });
    }

    function handleLeave() {
      if (cardRef.current) {
        cardRef.current.classList.remove("hovered");
        cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
        cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
        setTimeout(() => {
          if (cardRef.current) cardRef.current.style.transition = "";
        }, 600);
      }
      if (shineRef.current) shineRef.current.style.transform = "rotate(25deg) translateX(-30%)";
      if (glossRef.current) glossRef.current.style.transform = "";
      if (cardShadowRef.current) cardShadowRef.current.style.boxShadow = "0 30px 60px rgba(2,6,23,0.65)";
    }

    const sceneEl = document.querySelector(".scene");
    if (sceneEl) {
      sceneEl.addEventListener("mousemove", applyTransforms);
      sceneEl.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      window.removeEventListener("resize", updateBounds);
      if (sceneEl) {
        sceneEl.removeEventListener("mousemove", applyTransforms);
        sceneEl.removeEventListener("mouseleave", handleLeave);
      }
      if (raf) cancelAnimationFrame(raf);
    };
  }, [data]);

  // safe vars so style JSX never tries to access data.theme when data is null
  const cardTextColor = data?.theme?.cardTextColor ?? "#f5f5f5";
  const cardBg = data?.theme?.cardBgColor ?? "linear-gradient(135deg, rgb(21,21,21), rgb(90,90,90))";
  const cardName = data?.theme?.cardName ?? "PREMIUM";
  const cardShine = data?.theme?.cardShine ?? `linear-gradient(
  90deg,
  rgba(255, 255, 255, 0) 0%,
  rgba(255, 220, 230, 0.22) 40%,
  rgba(255, 240, 245, 0.42) 50%,
  rgba(255, 220, 230, 0.22) 60%,
  rgba(255, 255, 255, 0) 100%
)`

  return (
    <div className="scene">
      {loading || !data ? (
        <div
          style={{
            width: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner
            variant="circle"
            style={{
              stroke: "url(#gradient)",
              strokeWidth: 4,
            }}
          />
          <svg width="0" height="0">
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </svg>
        </div>

      ) : (
        <div className="card" ref={cardRef}>
          <div className="tile" />
          <div className="gloss" ref={glossRef} />
          <div className="shine" ref={shineRef} />

          <div className="face front">
            <div className="content">
              <div className="logo">
                <Image src={data.image || Icon} draggable={false} alt="logo" width={60} height={60} />
              </div>

              <div className="meta">
                <div className="name">{data.title}</div>
                <div className="role">
                  {data.shortTitle.map((e, i) => (
                    <span key={i}>
                      {e}
                      {i < data.shortTitle.length - 1 && " • "}
                    </span>
                  ))}
                </div>
                <div className="desc">{data.desc}</div>
                <div className="badges">
                  {data.badges.map((e, i) => (
                    <div className="badge" key={i}>
                      {e}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="footer">
              <a className="code" href={data.contact.contactLink} target="_blank" rel="noreferrer">
                {data.contact.contactName}
              </a>
              <div style={{ opacity: 0.9, fontWeight: 700, letterSpacing: "1px" }}>{cardName}</div>
            </div>
          </div>

          <div className="card-shadow" ref={cardShadowRef} />
        </div>
      )}

      <style jsx>{`
        .scene {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background-color: transparent !important;
          color: ${cardTextColor};
          -webkit-font-smoothing: antialiased;
          font-family: ${theme.fontFamily};
          overflow: hidden;
        }

        .card {
          width: 420px;
          height: 240px;
          border-radius: 18px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 300ms ease, box-shadow 300ms ease;
          background: ${cardBg};
          border: 1px solid ${theme.glassBorder};
          box-shadow: 0 20px 50px rgba(2, 6, 23, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.02);
          overflow: hidden;
        }

        .card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.02) 100%);
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .shine {
          position: absolute;
          inset: -50% -30% auto -30%;
          height: 200%;
          transform: rotate(25deg) translateX(-30%);
        background:${cardShine} ;
        filter: blur(18px);
          opacity: 0;
          transition: opacity 300ms ease, transform 120ms linear;
          pointer-events: none;
        }
        .card.hovered .shine { opacity: 0.9; }

        .gloss {
          position: absolute;
          right: -40%;
          top: -20%;
          width: 220%;
          height: 140%;
          background: conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.02), rgba(255,255,255,0.08));
          mix-blend-mode: overlay;
          filter: blur(18px);
          transition: transform 400ms ease;
          pointer-events: none;
        }

        .face { position: absolute; inset: 0; display:flex; align-items:center; justify-content:center; padding:22px; }
        .content { display:flex; gap:18px; align-items:center; width:100%; }
        .logo { width:92px; height:92px; border-radius:16px; background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); border:1px solid rgba(255,255,255,0.04); display:flex; align-items:center; justify-content:center; box-shadow:0 8px 30px rgba(0,0,0,0.6), inset 0 -6px 30px rgba(0,0,0,0.25); }
        .meta { flex:1; }
        .name { font-size:20px; font-weight:700; margin-bottom:6px; }
        .role { font-size:13px; color: ${cardTextColor}; margin-bottom:12px; opacity:0.8; }
        .desc { font-size:13px; line-height:1.2; color:${cardTextColor}; }
        .badges { display:flex; gap:8px; margin-top:12px; flex-wrap:wrap; }
        .badge { padding:6px 10px; border-radius:999px; font-size:12px; font-weight:600; background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.008)); border:1px solid ${cardTextColor}; opacity:0.8; }
        .footer { position:absolute; left:22px; right:22px; bottom:10px; display:flex; align-items:center; justify-content:space-between; }
        .code { font-family:monospace; font-size:12px; color:${cardTextColor}; }
        .card-shadow { position:absolute; inset:0; border-radius:18px; box-shadow:0 30px 60px rgba(2,6,23,0.65); pointer-events:none; }
        .tile { position:absolute; left:-40px; top:-40px; width:140px; height:140px; transform:rotate(25deg); background: linear-gradient(135deg, rgba(155,211,255,0.02), rgba(255,209,102,0.02)); filter:blur(8px); }

        @media (max-width:480px) {
          .card { min-width:260px; min-height:300px; padding:16px; }
          .shine { inset:-70% -15% auto -15%; height:250%; }
          .gloss { right:-20%; top:-10%; width:280%; height:160%; }
          .content { flex-direction:column; gap:12px; }
          .logo { width:72px; height:72px; }
          .name { font-size:18px; }
          .role { font-size:12px; }
          .desc { font-size:12px; }
          .badge { font-size:10px; padding:4px 8px; }
        }
      `}</style>
    </div>
  );
};

export default Page;
