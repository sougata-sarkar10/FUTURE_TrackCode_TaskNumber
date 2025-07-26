import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, MapPin } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground">My introduction</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="flex justify-center">
            <div className="w-80 h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <GraduationCap className="h-16 w-16 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Computer Science Student</p>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a third-year Computer Science undergraduate, passionate about technology and an avid learner. I have a
              self-motivated and can-do attitude, thriving in challenging and dynamic environments.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              With strong foundations in software development, programming, and problem-solving, I'm eager to apply my
              skills to real-world projects and grow as a software professional.
            </p>

            {/* Education Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">B.Tech (CSE)</h4>
                      <p className="text-sm text-muted-foreground">Brainware University</p>
                      <p className="text-xs text-muted-foreground">2023-2027</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Location</h4>
                      <p className="text-sm text-muted-foreground">Barasat, Kolkata</p>
                      <p className="text-xs text-muted-foreground">West Bengal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">4+</h3>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">5+</h3>
                <p className="text-sm text-muted-foreground">Technologies</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">2+</h3>
                <p className="text-sm text-muted-foreground">Years Learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
