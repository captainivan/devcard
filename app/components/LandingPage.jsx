import React from 'react'
import styles from "@/app/styles/LandingPage.module.css"
import Link from 'next/link'
import { Briefcase, Cat, Code, Palette, Rocket, Star, StarHalf, User } from 'lucide-react'
import Image from 'next/image'
import leafLeft from "@/app/images/leaves-left.webp"
import leafRight from "@/app/images/leaves-right.webp"
import Icon from "@/app/images/icon.png"

const LandingPage = () => {
  const date = new Date;
  return (
    <div className={styles.container}>
      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center text-white/50 bg-[#242933] overflow-hidden">
        {/* LEFT SIDE */}
        <div className="w-full  md:w-1/2 flex items-center justify-center md:justify-start px-6 md:px-12 py-10">
          <div className="flex flex-col items-center md:items-start justify-center max-w-lg text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold">Your Dev Identity,</h1>
            <p className="text-5xl md:text-7xl font-bold text-green-400 mt-2">Instantly.</p>

            <p className="mt-5 text-sm md:text-base text-gray-300">
              Instantly create beautiful, expert developer and business cards without having to sign up.
              Display your abilities, completed projects, and contact details in an eye-catching,
              easily shareable manner.
            </p>

            <Link href="/devcarddev">
              <button className="mt-5 px-6 md:px-8 py-3 md:py-4 bg-green-400 text-white font-bold rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
                CREATE MY DEVCARD
              </button>
            </Link>

            {/* Ratings & Icons */}
            <div className="flex mt-7 flex-wrap items-center justify-center md:justify-start">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-400 text-black z-30">
                <Code size={18} />
              </div>
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-400 text-black -ml-3 z-20">
                <User size={18} />
              </div>
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-400 text-black -ml-3 z-10">
                <Briefcase size={18} />
              </div>
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-400 text-black -ml-3 z-0">
                <Cat size={18} />
              </div>

              <div className="flex ml-3 flex-col mt-3 md:mt-0">
                <div className="flex">
                  <Star className="text-yellow-400" size={20} />
                  <Star className="text-yellow-400" size={20} />
                  <Star className="text-yellow-400" size={20} />
                  <Star className="text-yellow-400" size={20} />
                  <StarHalf className="text-yellow-400" size={20} />
                </div>
                <p className="text-xs md:text-sm">4.9/5 from 10,000+ achievers</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-0 py-6 md:py-0 overflow-hidden">
          <iframe
            src="https://getdevcard.vercel.app/devcard/1AP7Lufb39OqPNXZbJFY"
            style={{ backgroundColor: "transparent" }}
            frameborder="0"
            allowtransparency="true"
            className="w-full max-w-[600px] h-[400px] md:h-[450px] rounded-lg  overflow-hidden"
          ></iframe>
        </div>
      </div>

      <div className="min-h-screen w-full flex flex-col items-center justify-center text-white/50 bg-[#242933] px-4 py-12">
        {/* Heading */}
        <div className="text-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold">
            Building <span className="text-green-400">Premium</span> Cards Is Hard
          </h1>
          <p className="mt-4 text-base md:text-xl text-gray-300">
            Designing a card that looks professional and stands out isn’t easy.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-6">
          {/* Step 1 */}
          <div className="bg-black/50 h-56 w-72 md:h-60 md:w-80 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-4">💡</div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-100">
              Think of your identity
            </h2>
            <p className="text-gray-400 mt-2 text-sm italic">
              “I want to stand out as a developer” <br />
              “I need a digital business card”
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center text-3xl text-gray-500">→</div>

          {/* Step 2 */}
          <div className="bg-black/50 h-56 w-72 md:h-60 md:w-80 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-100">
              Create instantly
            </h2>
            <p className="text-gray-400 mt-2 text-sm italic">
              No signup required <br />
              Customize in seconds
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center text-3xl text-gray-500">→</div>

          {/* Step 3 */}
          <div className="bg-black/50 h-56 w-72 md:h-60 md:w-80 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-100">
              Share everywhere
            </h2>
            <p className="text-gray-400 mt-2 text-sm italic">
              Showcase your skills <br />
              Share with recruiters &amp; clients
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-full bg-[#242933] flex flex-col items-center justify-center px-6 py-12">
        {/* Heading */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white/50">
            Creating <span className="text-green-400">Premium</span> Cards Made Easy
          </h1>
          <p className="text-white/50 text-base md:text-xl mt-5">
            We make your problems simple with our solution, DevCard.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 w-full max-w-6xl">
          {/* LEFT - Iframe */}
          <div className="w-full md:w-1/2 flex justify-center items-center  md:px-0 py-6 md:py-0 overflow-hidden">
            <iframe
              id="devcard-frame"
              src="https://getdevcard.vercel.app/devcard/jPz53L1vRFmmQ3IGo50B"
              style={{ backgroundColor: "transparent" }}
              frameborder="0"
              allowtransparency="true"
              className="w-full  h-[400px] md:h-[470px]  overflow-hidden"
            />
          </div>

          {/* RIGHT - Steps */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 p-4 md:p-6 rounded-2xl">
            {/* STEP 1 */}
            <div className="p-6 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-500/20 text-green-400">
                  <User size={20} />
                </div>
                <h2 className="text-lg md:text-2xl font-bold text-green-400">
                  Step 1: Enter Your Details
                </h2>
              </div>
              <p className="text-gray-300/70 mt-3 text-sm md:text-base leading-relaxed">
                Start by filling in your name, profession, skills, and links.
                The more accurate your details, the more professional and impactful your DevCard will look.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="p-6 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <Palette size={20} />
                </div>
                <h2 className="text-lg md:text-2xl font-bold text-blue-400">
                  Step 2: Select Your Theme
                </h2>
              </div>
              <p className="text-gray-300/70 mt-3 text-sm md:text-base leading-relaxed">
                Choose from a collection of modern, clean, and stylish templates.
                Customize fonts, layouts, and colors to perfectly match your personality or brand.
              </p>
            </div>

            {/* STEP 3 */}
            <div className="p-6 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <Rocket size={20} />
                </div>
                <h2 className="text-lg md:text-2xl font-bold text-purple-400">
                  Step 3: Publish &amp; Share
                </h2>
              </div>
              <p className="text-gray-300/70 mt-3 text-sm md:text-base leading-relaxed">
                Once ready, publish your DevCard instantly and share the link anywhere.
                Impress recruiters, clients, or collaborators with your professional identity in seconds.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center text-white/50 bg-[#242933] px-6 py-12">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start">
          <div className="flex flex-col items-center md:items-start justify-center p-6 md:p-8 md:ml-20 text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#963c5c]">Wine Ruby,</h1>
            <p className="text-5xl md:text-7xl font-bold mt-2">LUXE.</p>

            <p className="w-full md:w-[80%] text-sm md:text-md mt-5 leading-relaxed">
              Opulence wrapped in deep ruby passion.
              Luxurious tones with a romantic edge.
              Striking elegance that captivates instantly.
              For dreamers, artists, and bold innovators.
            </p>

            <Link href="/devcarddev">
              <button className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-[#963c5c] text-white font-bold rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
                CREATE MY DEVCARD
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0 overflow-hidden">
          <iframe
            src="https://getdevcard.vercel.app/devcard/ozlKVipGuCY5V7rDueCO"
            style={{ backgroundColor: "transparent" }}
            frameborder="0"
            allowtransparency="true"
            className="w-full max-w-[600px] h-[400px] md:h-[450px]   overflow-hidden"
          ></iframe>
        </div>
      </div>

      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center text-white/50 bg-[#242933] px-6 py-12">
        {/* LEFT SIDE - Iframe */}
        <div className="w-full md:w-1/2 flex items-center justify-center overflow-hidden">
          <iframe
            src="https://getdevcard.vercel.app/devcard/8aiYou9qOLVHaO740fhS"
            style={{ backgroundColor: "transparent" }}
            frameborder="0"
            allowtransparency="true"
            className="w-full max-w-[600px] h-[400px] md:h-[450px]   overflow-hidden"
          ></iframe>
        </div>

        {/* RIGHT SIDE - Text */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start mt-10 md:mt-0">
          <div className="flex flex-col items-center md:items-start justify-center p-6 md:p-8 md:ml-20 text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#623d94]">Royal Amethyst,</h1>
            <p className="text-5xl md:text-7xl font-bold mt-2">MAJESTY.</p>

            <p className="w-full md:w-[80%] text-sm md:text-md mt-5 leading-relaxed">
              Regal tones glowing with divine aura.
              A palette that feels royal and commanding.
              Rich purples that radiate sophistication.
              For those who stand out with grace.
            </p>

            <Link href="/devcarddev">
              <button className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-[#623d94] text-white font-bold rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
                CREATE MY DEVCARD
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center text-white/50 bg-[#242933] px-6 py-12">
        {/* LEFT SIDE - Text */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start">
          <div className="flex flex-col items-center md:items-start justify-center p-6 md:p-8 md:ml-20 text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#3d7a5c]">Emerald Dark,</h1>
            <p className="text-5xl md:text-7xl font-bold mt-2">ENIGMA.</p>

            <p className="w-full md:w-[80%] text-sm md:text-md mt-5 leading-relaxed">
              Mystical tones inspired by rare gemstones.
              Deep greens with an aura of secrecy.
              A blend of power, elegance, and rarity.
              For enigmatic thinkers and creative visionaries.
            </p>

            <Link href="/devcarddev">
              <button className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-[#3d7a5c] text-white font-bold rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
                CREATE MY DEVCARD
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE - Iframe */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0 overflow-hidden">
          <iframe
            src="https://getdevcard.vercel.app/devcard/1AP7Lufb39OqPNXZbJFY"
            style={{ backgroundColor: "transparent" }}
            frameborder="0"
            allowtransparency="true"
            className="w-full max-w-[600px] h-[400px] md:h-[450px]   overflow-hidden"
          ></iframe>
        </div>
      </div>

      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center text-white/50 bg-[#242933] px-6 py-12">
        {/* LEFT SIDE - Iframe */}
        <div className="w-full md:w-1/2 flex items-center justify-center overflow-hidden">
          <iframe
            src="https://getdevcard.vercel.app/devcard/NXRP1CfnjMeq4smLh0Wf"
            style={{ backgroundColor: "transparent" }}
            frameborder="0"
            allowtransparency="true"
            className="w-full max-w-[600px] h-[400px] md:h-[450px]   overflow-hidden"
          ></iframe>
        </div>

        {/* RIGHT SIDE - Text */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start mt-8 md:mt-0">
          <div className="flex flex-col items-center md:items-start justify-center p-6 md:p-8 md:ml-20 text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#bf8049]">Bronze Glow,</h1>
            <p className="text-5xl md:text-7xl font-bold mt-2">HERITAGE.</p>

            <p className="w-full md:w-[80%] text-sm md:text-md mt-5 leading-relaxed">
              Classic strength forged through tradition.
              Warm bronze tones echo resilience and trust.
              A design that feels grounded yet bold.
              Built to showcase heritage and character.
            </p>

            <Link href="/devcarddev">
              <button className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-[#bf8049] text-white font-bold rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
                CREATE MY DEVCARD
              </button>
            </Link>
          </div>
        </div>
      </div>


      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center text-white/50 bg-[#242933] px-6 py-12">
        {/* LEFT SIDE - Text */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start">
          <div className="flex flex-col items-center md:items-start justify-center p-6 md:p-8 md:ml-20 text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#ebf0f5]">Platinum Silver,</h1>
            <p className="text-5xl md:text-7xl font-bold mt-2">LEGEND.</p>

            <p className="w-full md:w-[80%] text-sm md:text-md mt-5 leading-relaxed">
              Rare, polished, and enduring brilliance.
              Shines with clarity, strength, and balance.
              A look that feels rare and refined.
              For legends who leave a lasting impact.
            </p>

            <Link href="/devcarddev">
              <button className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-[#ebf0f5] text-black font-bold rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
                CREATE MY DEVCARD
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE - Iframe */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0 overflow-hidden">
          <iframe
            src="https://getdevcard.vercel.app/devcard/FYOEhhw7V2SIh9UqQNUh"
            style={{ backgroundColor: "transparent" }}
            frameborder="0"
            allowtransparency="true"
            className="w-full max-w-[600px] h-[400px] md:h-[450px]   overflow-hidden"
          ></iframe>
        </div>
      </div>

      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center text-white/50 bg-[#242933] px-6 py-12">
        {/* LEFT SIDE - Iframe */}
        <div className="w-full md:w-1/2 flex items-center justify-center overflow-hidden">
          <iframe
            src="https://getdevcard.vercel.app/devcard/6JzrGhGpgO6zVDtMowPs"
            style={{ backgroundColor: "transparent" }}
            frameborder="0"
            allowtransparency="true"
            className="w-full max-w-[600px] h-[400px] md:h-[450px]   overflow-hidden"
          ></iframe>
        </div>

        {/* RIGHT SIDE - Text */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start mt-8 md:mt-0">
          <div className="flex flex-col items-center md:items-start justify-center p-6 md:p-8 md:ml-20 text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#c9a54b]">Royal Gold,</h1>
            <p className="text-5xl md:text-7xl font-bold mt-2">ELITE.</p>

            <p className="w-full md:w-[80%] text-sm md:text-md mt-5 leading-relaxed">
              Luxury, authority, and prestige in one design.
              Golden warmth meets commanding presence.
              Your identity feels engraved in excellence.
              For leaders, founders, and top-tier achievers.
            </p>

            <Link href="/devcarddev">
              <button className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-[#c9a54b] text-white font-bold rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
                CREATE MY DEVCARD
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center text-white/50 bg-[#242933] px-6 py-12">
        {/* LEFT SIDE - Text */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start">
          <div className="flex flex-col items-center md:items-start justify-center p-6 md:p-8 md:ml-20 text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#5c5c5c]">Obsidian Steel,</h1>
            <p className="text-5xl md:text-7xl font-bold mt-2">PREMIUM.</p>

            <p className="w-full md:w-[80%] text-sm md:text-md mt-5 leading-relaxed">
              Dark, sleek, and timeless.
              Inspired by polished stone and forged steel.
              A card that radiates quiet power and focus.
              Perfect for professionals who value minimalism.
            </p>

            <Link href="/devcarddev">
              <button className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-[#5c5c5c] text-black font-bold rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
                CREATE MY DEVCARD
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE - Iframe */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0 overflow-hidden">
          <iframe
            src="https://getdevcard.vercel.app/devcard/jPz53L1vRFmmQ3IGo50B"
            style={{ backgroundColor: "transparent" }}
            frameborder="0"
            allowtransparency="true"
            className="w-full max-w-[600px] h-[400px] md:h-[450px]   overflow-hidden"
          ></iframe>
        </div>
      </div>


      <div className="min-h-screen flex flex-col items-center justify-between text-white/50 bg-[#242933]">
        {/* TOP SECTION */}
        <div className="flex flex-col items-center justify-center flex-grow px-6 text-center">
          <h1 className="mb-12 text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
            Create Your <span className="text-green-400">DevCard.</span> Today for Free
          </h1>

          {/* Rating + Leaves */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Image
              src={leafLeft}
              draggable={false}
              height={80}
              width={80}
              alt="leaf-left"
              className="opacity-20 hidden sm:block"
            />
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <StarHalf className="text-yellow-500" />
              </div>
              <p className="mt-1 text-base sm:text-lg font-bold">4.9/5 on DevCard.</p>
              <p className="mt-1 text-base sm:text-lg font-bold">10,000+ Happy Users</p>
            </div>
            <Image
              src={leafRight}
              draggable={false}
              height={80}
              width={80}
              alt="leaf-right"
              className="opacity-20 hidden sm:block"
            />
          </div>
          <Link href="/devcarddev">
            <button className="mt-10 px-6 md:px-8 py-3 md:py-4 bg-green-600 text-white font-bold rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
              CREATE MY DEVCARD
            </button>
          </Link>
        </div>

        {/* FOOTER BAR */}
        <div className="w-full bg-black p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2">
            <Image src={Icon} height={40} width={40} alt="logo" />
            <h1 className="text-white font-bold text-lg sm:text-xl">DevCard.</h1>
          </div>
          <span className="font-light text-xs sm:text-sm">
            DevCard. © {date.getFullYear()} All rights reserved.
          </span>
        </div>
      </div>

    </div >

  )
}

export default LandingPage