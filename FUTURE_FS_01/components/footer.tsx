import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Sougata Sarkar</h3>
          <p className="text-muted-foreground mb-6">Software Developer</p>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com/sougata-sarkar10"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/sougatasarkar10"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:Sarkarsougata15@gmail.com"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>

          <div className="border-t pt-8">
            <p className="text-sm text-muted-foreground">© 2024 Sougata Sarkar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
