import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

export function ProjectsSection() {
  const projects = [
    {
      title: "Currency Converter",
      description:
        "Created a web-based tool to convert amounts between different currencies using real-time exchange rates fetched from a public API. Designed an intuitive user interface for smooth interaction.",
      technologies: ["HTML", "CSS", "JavaScript", "ExchangeRate API", "CountryFlags API"],
      githubUrl: "https://github.com/sougata-sarkar10",
      liveUrl: "#",
      image: "/images/currency-converter.jpg",
    },
    {
      title: "Amazon Website Clone (UI/UX)",
      description:
        "Developed a user-friendly clone of Amazon E-commerce website for developing skills on languages and gain more knowledge about projects.",
      technologies: ["HTML", "CSS"],
      githubUrl: "https://github.com/sougata-sarkar10",
      liveUrl: "#",
      image: "/images/amazon-clone.jpg",
    },
    {
      title: "Rock Paper Scissors Game",
      description:
        "Developed an interactive web-based Rock Paper Scissors game where users play against the computer. The computer's choices are randomized, and the result is displayed instantly after each round.",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/sougata-sarkar10",
      liveUrl: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Tic Tac Toe Game",
      description:
        "Created a browser-based Tic Tac Toe game for two players with a simple, responsive layout. Integrated game logic to check win/draw conditions after each move and reset functionality.",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/sougata-sarkar10",
      liveUrl: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground">My recent work</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <a href="https://github.com/sougata-sarkar10" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
