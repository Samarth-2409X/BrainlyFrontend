import { Button } from "../Components/Button";
import { Logo } from "../Icons/Logo";
import { motion } from "framer-motion";
import step1Img from "../Images/1.photo.png";
import step2Img from "../images/2.photo.png";
import step3Img from "../images/4.photo.png";
import step4Img from "../Images/3.photo.png";
import heroImg from "../Images/6.photo.png";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-sm bg-white">
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="text-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-gray-400 bg-clip-text text-transparent font-bold">
            Second Brain
          </span>
        </div>
        <div className="flex gap-2">
          <a href="/signup" className="ml-2">
            <Button text="Get Started" variant="Primary" />
          </a>
          <a href="/signin">
            <Button text="Sign In" variant="Secondary" />
          </a>
        </div>
      </header>

      
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-28 bg-gradient-to-r from-purple-50 to-purple-100">
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Organize Your Ideas with{" "}
            <span className="text-purple-600">Second Brain</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            Capture, organize, and share your thoughts seamlessly. Your personal
            knowledge hub—always accessible.
          </p>
          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <a href="/signup">
              <Button text="Start for Free" variant="Primary" />
            </a>
            <a href="/signin">
              <Button text="Sign In" variant="Secondary" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.img
            src={heroImg}
            alt="Hero"
            className="mt-10 w-full max-w-md mx-auto rounded-3xl shadow-xl"
            whileHover={{
              scale: 1.05,
              rotate: 370,
              boxShadow: "0px 0px 25px rgba(168, 85, 247, 0.7)", 
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          
        </motion.div>
      </section>

  
      <section className="bg-gray-300 py-16 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Why Choose Second Brain?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 max-w-6xl mx-auto">
          {[
            { icon: "📝", title: "Capture Notes", desc: "Write and save your thoughts instantly, without distractions." },
            { icon: "🏷️", title: "Organize with Tags", desc: "Use tags to organize your knowledge base efficiently." },
            { icon: "📤", title: "Share Easily", desc: "Share your notes and resources with just one click." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
      <section className="bg-gray-300 py-16 px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 pb-3">
          How It Works
        </h1>
        <p className="text-lg text-center text-gray-400">
          Get Started in minutes with our Simple-4-Steps Process
        </p>

        <div className="mt-12 max-w-5xl mx-auto space-y-16">
          {[ 
            { img: step1Img, title: "Step 1: Click on 'Add content'", desc: "Start by clicking the Add content button in the top-right corner.", reverse: false },
            { img: step2Img, title: "Step 2: Fill the Create Card form", desc: "Enter title, link, tags and select type of content then submit.", reverse: true },
            { img: step3Img, title: "Step 3: Content appears in All Cards", desc: "Your new content shows instantly in your dashboard.", reverse: false },
            { img: step4Img, title: "Step 4: Share Easily", desc: "Share your knowledge with friends or colleagues using a single link.", reverse: true },
          ].map((step, i) => (
            <motion.div
              key={i}
              className={`flex flex-col md:flex-row ${step.reverse ? "md:flex-row-reverse" : ""} items-center gap-10`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={step.img}
                alt={step.title}
                className="w-full md:w-1/2 rounded-2xl shadow-xl"
              />
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

   
      <section className="bg-purple-100 text-black py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Build Your Second Brain?
        </h2>
        <p className="mb-8 text-lg text-gray-500">
          Join now and start organizing your ideas today.
        </p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <a href="/signup">
            <Button text="Get Started" variant="Primary" />
          </a>
        </motion.div>
      </section>

      
        <footer className="flex justify-between items-center bg-white text-gray-400 py-6 px-8 text-sm">
            
            <div className="flex items-center space-x-2">
              <Logo />
              <span className="text-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-gray-400 bg-clip-text text-transparent font-bold">
                Second Brain
              </span>
            </div>
        
            
            <div>
              © {new Date().getFullYear()} Second Brain. All rights reserved.
            </div>
        </footer>

    </div>
  );
}
