"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToAbout = () => {
    const element = document.querySelector("#about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-background via-background to-muted/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            {/* Social Links */}
            <div className="flex space-x-4 lg:hidden">
              <a
                href="https://github.com/sougata-sarkar10"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/sougatasarkar10"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:Sarkarsougata15@gmail.com"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>

            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Hi, I'm Sougata Sarkar
              </h1>
              <p className="text-lg lg:text-xl text-primary font-semibold mb-6">SOFTWARE DEVELOPER</p>
              <p className="text-base lg:text-lg text-muted-foreground max-w-lg leading-relaxed">
                Motivated and detail-oriented Computer Science student with strong foundations in software development,
                programming, and problem-solving. Currently pursuing B.Tech (CSE) at Brainware University.
              </p>
            </div>

            <Button onClick={scrollToContact} size="lg" className="w-fit hover:scale-105 transition-transform">
              Contact Me
            </Button>
          </div>

          {/* Right Side - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-primary/20 dark:border-primary/30">
                <Image
                  src="/images/profile.png"
                  alt="Sougata Sarkar - Software Developer"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Links - Desktop */}
        <div className="hidden lg:flex fixed left-8 top-1/2 transform -translate-y-1/2 flex-col space-y-4">
          <a
            href="https://github.com/sougata-sarkar10"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/sougatasarkar10"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:Sarkarsougata15@gmail.com"
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-sm">Scroll down</span>
            <ChevronDown className="h-5 w-5 animate-bounce group-hover:animate-pulse" />
          </button>
        </div>
      </div>
    </section>
  )
}
