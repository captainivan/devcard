"use client";
import styles from "@/app/styles/DevCard.module.css"
import { Button } from "@/components/ui/button";
import { Plus, SendHorizonal, Trash, X } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Icon from "@/app/images/icon.png"
import { db } from "../configs/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from 'react-google-recaptcha'
import { CardData } from "./data";

const Page = () => {


  const [data, setData] = useState({
    title: "DevCard.",
    shortTitle: [
      "PREMIUM",
      "STYLISH",
      "RELATABLE"
    ],
    desc: "Design stunning premium developer & business cards instantly for free no signup needed. Customize, brand",
    badges: [
      "Web",
      "Portfolio",
      "project"
    ],
    contact: {
      contactName: "devcard.com",
      contactLink: "https://devcard.com"
    },
    image: "/images/icon.png",
    theme: {
      name: "Obsidian Steel",
      cardBgColor: "linear-gradient(135deg, rgb(21, 21, 21), rgb(90, 90, 90))",
      cardShine: `linear-gradient(90deg,rgba(255, 255, 255, 0) 0%,rgba(200, 200, 200, 0.15) 40%,rgba(255, 255, 255, 0.35) 50%,rgba(200, 200, 200, 0.15) 60%,rgba(255, 255, 255, 0) 100%)`,
      cardTextColor: "#f5f5f5",
      cardName: "PREMIUM"
    }
  })
  const cardRef = useRef(null);
  const glossRef = useRef(null);
  const shineRef = useRef(null);
  const cardShadowRef = useRef(null);
  const [puch, setPunch] = useState("")
  const [badge, setBadge] = useState("")
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [generatedCardId, setGeneratedCardId] = useState("");
  const [limit, setLimit] = useState(false);
  const [verifyed, setVerified] = useState(false);

  const theme = {
    bg: "#0b0b0d",
    glassBorder: "rgba(255,255,255,0.06)",
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  };


  useEffect(() => {
    if (!cardRef.current) return;

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
  }, []);



  const submitcard = async () => {
    setLoading(true);

    if (
      !data.title || data.title.length < 1 ||
      !data.shortTitle || data.shortTitle.length < 1 ||
      !data.desc || data.desc.length < 10 ||
      !data.badges || data.badges.length < 1 ||
      !data.contact.contactName || data.contact.contactName.length < 1 ||
      !data.contact.contactLink || data.contact.contactLink.length < 1 ||
      !data.image || data.image.length < 1
    ) {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const count = Number(localStorage.getItem("GOOGLE_ANALYTICS_COUNTSCORE") || 0);

      if (count >= 3) {
        alert("You have reached the limit of 3 cards");
        setLimit(true)
        return;
      }

      const docRef = await addDoc(collection(db, "cards"), data);
      console.log("Document written with ID:", docRef.id);

      setGeneratedCardId(docRef.id);
      alert("Card generated successfully 🎉");
      setIsOpen(true);

      localStorage.setItem("GOOGLE_ANALYTICS_COUNTSCORE", count + 1);
    } catch (e) {
      console.error("Error adding document:", e);
      alert("Error adding document");
    } finally {
      setLoading(false);
    }
  };

  const verifyCaptcha = async (token) => {
    try {
      const api = await fetch("/api/captchaverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const res = await api.json();
      console.log(res);
      if (res.data.success == true) {
        setVerified(true)
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <div className={styles.container}>
        <nav className="w-full h-[8%] flex items-center justify-between px-4 bg-black">
          <div className="flex items-center gap-2">
            <Image src={Icon} alt="logo" width={50} height={50} />
            <h1 className="text-white font-bold text-3xl">DevCard.</h1>
          </div>
          <Button
            onClick={() => { submitcard() }}
            className="bg-white text-black cursor-pointer hover:bg-black hover:text-white px-4 py-2 flex items-center gap-2"
          >
            {loading ? <Spinner variant="circle" /> : <>Publish <SendHorizonal /></>}
          </Button>
        </nav>
        <div className={styles.bossContainer}>

          <div className={styles.sceneLeft}>

            <h2 className={styles.panelTitle}>Card Settings</h2>

            <div className={styles.settingBox}>
              <Label htmlFor="title">Card Title</Label>
              <Input id="title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
            </div>

            <div className={styles.settingBox}>
              <Label>Tagline</Label>
              <div className={styles.inlineInput}>
                <Input placeholder="Add tagline" onChange={(e) => setPunch(e.target.value)} />
                <Button className="cursor-pointer" size="icon" variant="outline" onClick={() => setData({ ...data, shortTitle: [...data.shortTitle, puch] })}>
                  <Plus />
                </Button>
              </div>
              <div className={styles.badgePreview}>
                {data.shortTitle.map((e, i) => (
                  <span key={i} className={styles.badge}>
                    {e}
                    <Trash size={14} className={styles.trashIcon} onClick={() => setData({ ...data, shortTitle: data.shortTitle.filter((_, j) => j !== i) })} />
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.settingBox}>
              <Label htmlFor="desc">Description</Label>
              <textarea
                id="desc"
                className={styles.textarea}
                value={data.desc}
                onChange={(e) => setData({ ...data, desc: e.target.value })}
              />
            </div>

            <div className={styles.settingBox}>
              <Label>Badges</Label>
              <div className={styles.inlineInput}>
                <Input placeholder="Add badge" onChange={(e) => setBadge(e.target.value)} />
                <Button className="cursor-pointer" size="icon" variant="outline" onClick={() => setData({ ...data, badges: [...data.badges, badge] })}>
                  <Plus />
                </Button>
              </div>
              <div className={styles.badgePreview}>
                {data.badges.map((e, i) => (
                  <span key={i} className={styles.badge}>
                    {e}
                    <Trash size={14} className={styles.trashIcon} onClick={() => setData({ ...data, badges: data.badges.filter((_, j) => j !== i) })} />
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.settingBox}>
              <Label htmlFor="contactName">Contact Name</Label>
              <Input id="contactName" value={data.contact.contactName} onChange={(e) => setData({ ...data, contact: { ...data.contact, contactName: e.target.value } })} />

              <Label htmlFor="contactLink">Contact Link</Label>
              <Input id="contactLink" value={data.contact.contactLink} onChange={(e) => setData({ ...data, contact: { ...data.contact, contactLink: e.target.value } })} />
            </div>

            <div className={styles.settingBox}>
              <Label htmlFor="image">Image</Label>
              <Input id="image" value={data.image} onChange={(e) => setData({ ...data, image: e.target.value })} />
            </div>

            <div className={styles.settingBox}>
              <Label htmlFor="theme">Select Theme</Label>
              <div className="mt-5 grid grid-cols-4 gap-4">
                {CardData.map((theme, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full shadow-md cursor-pointer border border-transparent hover:border-white hover:scale-110 transition-all duration-300 ease-in-out"
                    style={{ background: theme.bg }}
                    onClick={() =>
                      setData({
                        ...data,
                        theme: {
                          name: theme.name,
                          cardBgColor: theme.bg,
                          cardTextColor: theme.text,
                          cardName: theme.cardName,
                          cardShine: theme.cardShine,
                        },
                      })
                    }
                    title={`${theme.name} (${theme.cardName})`}
                  ></div>
                ))}
              </div>

            </div>

          </div>

          <div className={styles.sceneRight}>
            <div className="scene">
              <div className="card" ref={cardRef}>
                <div className="tile" />
                <div className="gloss" ref={glossRef} />
                <div className="shine" ref={shineRef} />

                <div className="face front">
                  <div className="content">
                    <div className="logo" draggable={false}>
                      <img src={data.image || Icon} draggable={false} alt="logo" width={60} height={60}></img>
                    </div>

                    <div className="meta">
                      <div className="name">{data.title}</div>
                      <div className="role">
                        {data.shortTitle.map((e, i) => (
                          <span key={i} className="role">
                            {e}{i < data.shortTitle.length - 1 && " • "}
                          </span>
                        ))}
                      </div>
                      <div className="desc">
                        {data.desc}
                      </div>
                      <div className="badges">
                        {data.badges.map((e, i) => (
                          <div className="badge" key={i}>{e}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="footer">
                    <a className="code" rel="noreferrer" href={data.contact.contactLink} target="_blank">{data.contact.contactName}</a>
                    <div style={{ opacity: 0.9, fontWeight: 700, letterSpacing: "1px" }}>{data.theme.cardName}</div>
                  </div>
                </div>

                <div className="card-shadow" ref={cardShadowRef} />
              </div>
              <style jsx>{`
        .scene {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background-color: transparent !important;
          color: ${data.theme.cardTextColor};
          -webkit-font-smoothing: antialiased;
          font-family: ${theme.fontFamily};
        }

        .card {
          width: 420px;
          height: 240px;
          border-radius: 18px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 300ms ease, box-shadow 300ms ease;
          background: ${data.theme.cardBgColor};
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
        background:${data.theme.cardShine} ;
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
        .role { font-size:13px; color: ${data.theme.cardTextColor}; margin-bottom:12px; opacity:0.8; }
        .desc { font-size:13px; line-height:1.2; color:${data.theme.cardTextColor}; }
        .badges { display:flex; gap:8px; margin-top:12px; flex-wrap:wrap; }
        .badge { padding:6px 10px; border-radius:999px; font-size:12px; font-weight:600; background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.008)); border:1px solid ${data.theme.cardTextColor}; opacity:0.8; }
        .footer { position:absolute; left:22px; right:22px; bottom:10px; display:flex; align-items:center; justify-content:space-between; }
        .code { font-family:monospace; font-size:12px; color:${data.theme.cardTextColor}; }
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
          </div>

        </div>
      </div>
      {isOpen && (
        <AnimatePresence>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`${styles.popupContainer} flex flex-col md:flex-row w-full md:max-w-5xl max-h-[90vh] overflow-y-auto`}
            >
              {/* Left Side (full width on mobile) */}
              <div className="popupId flex flex-col justify-between w-full md:w-[40%] md:pr-6 mb-6 md:mb-0">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">🎉 Congratulations!</h1>
                  <p className="text-base md:text-lg text-zinc-300">
                    You’ve successfully generated your DevCard.
                  </p>
                  <p className="text-sm mt-4 text-zinc-400 leading-relaxed">
                    Copy the iframe code below and embed it anywhere — your portfolio,
                    profile, or even your SaaS website.
                  </p>

                  {/* Code Box */}
                  <div className="mt-6 rounded-lg overflow-hidden border border-white/10 bg-black/60 w-full">
                    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800 text-sm text-zinc-400 font-mono">
                      <span className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="ml-2">devcard.html</span>
                    </div>

                    <pre className="p-4 text-xs md:text-sm font-mono text-zinc-200/80 overflow-x-auto bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
                      <code>{`<iframe
      src="https://your-domain.com/devcard/${generatedCardId}"
      style="background: transparent;overflow:hidden"
      frameborder="0"
      allowtransparency="true"
      height="400"
      width="600"
    ></iframe>`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Right Side (hidden on mobile) */}
              <div className="hidden md:flex flex-col w-[55%]">
                {/* Close Button */}
                <div className="flex justify-end mb-2">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-red-500 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-red-600 transition"
                  >
                    <X />
                  </Button>
                </div>

                {/* Preview Frame */}
                <div className="flex-1 rounded-lg overflow-hidden border border-white/10">
                  <iframe
                    className="h-full w-full"
                    src={`https://3000-firebase-card-1756884857407.cluster-y75up3teuvc62qmnwys4deqv6y.cloudworkstations.dev/devcard/${generatedCardId}`}
                    style={{ background: "transparent" }}
                    allowtransparency="true"
                    frameBorder="0"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

      )}
      {limit && (
        <div className="fixed inset-0 p-5 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="p-5 rounded-lg bg-black text-white relative"
            style={{
              boxShadow: `
             0 0 40px rgba(59, 130, 246, 0.6),   /* blue */
             0 0 80px rgba(139, 92, 246, 0.5),   /* purple */
             0 0 120px rgba(236, 72, 153, 0.4)   /* pink */
           `,
            }}
          >
            <h1 className="text-3xl font-bold mb-2">Sorry! 😔</h1>
            <p className="text-lg text-zinc-300">
              You’ve Reached Your Cards Creating Limit.
            </p>
            <p className="text-sm mt-4 text-zinc-400 leading-relaxed">
              DevCard is free for everyone today 🎉
              To protect our platform from spam, we currently allow up to three cards per user.
              We’re exploring premium options in the future for those who want to create unlimited cards.
            </p>
          </div>
        </div>

      )}
      {verifyed ? <></> :
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 ">
          <div className="p-5 rounded-lg bg-black text-white"
            style={{
              boxShadow: `
             0 0 40px rgba(59, 130, 246, 0.6),   /* blue */
             0 0 80px rgba(139, 92, 246, 0.5),   /* purple */
             0 0 120px rgba(236, 72, 153, 0.4)   /* pink */
           `,
            }}
          >
            <h1 className="mb-5 font-bold">Please Fill The ReCaptcha</h1>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
              onChange={(token) => verifyCaptcha(token)}
            />
          </div>
        </div>
      }

    </>
  );
};

export default Page;
