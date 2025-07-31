import { Button } from "@/components/ui/button";
import { TrendingDown, BarChart3, Shield, Users } from "lucide-react";

interface HeaderProps {
  onOpenModal: () => void;
}

export function Header({ onOpenModal }: HeaderProps) {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">ChurnGuard</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Customer Retention</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How it Works</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <Button onClick={onOpenModal} variant="hero" size="sm">
            Try Demo
          </Button>
        </div>
      </div>
    </header>
  );
}