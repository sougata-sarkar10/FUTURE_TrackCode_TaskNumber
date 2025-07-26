import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Globe, Wrench } from "lucide-react"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Python", "Java", "C", "JavaScript"],
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Web Technologies",
      icon: Globe,
      skills: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"],
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: "Database & Tools",
      icon: Database,
      skills: ["MySQL", "Git", "GitHub", "Visual Studio Code"],
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Concepts & Others",
      icon: Wrench,
      skills: ["Data Structures & Algorithms", "OOP", "API Integration", "Problem Solving"],
      color: "bg-orange-500/10 text-orange-600",
    },
  ]

  const softSkills = [
    "Problem Solving",
    "Teamwork",
    "Adaptability",
    "Critical Thinking",
    "Time Management",
    "Quick Learner",
    "Self-Motivated",
    "Positive Attitude",
  ]

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Skills</h2>
          <p className="text-muted-foreground">My technical expertise</p>
        </div>

        {/* Technical Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card key={index} className="h-full">
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Soft Skills */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Soft Skills & Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 justify-center">
              {softSkills.map((skill, index) => (
                <Badge key={index} variant="outline" className="px-4 py-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Languages</h3>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary">English</Badge>
            <Badge variant="secondary">Hindi</Badge>
            <Badge variant="secondary">Bengali</Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
