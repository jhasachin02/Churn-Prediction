import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, ArrowRight } from "lucide-react";

interface CTASectionProps {
  onOpenModal: () => void;
}

export function CTASection({ onOpenModal }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <Card className="border-0 shadow-elegant bg-gradient-to-br from-primary to-accent text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <CardContent className="p-12 relative z-10">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="flex justify-center">
                <div className="p-4 bg-white/20 rounded-full">
                  <TrendingDown className="h-12 w-12" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Ready to Reduce Customer Churn?</h2>
                <p className="text-xl opacity-90 leading-relaxed">
                  Join thousands of businesses using ChurnGuard to predict customer behavior and improve retention rates.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={onOpenModal} 
                  size="lg" 
                  variant="secondary" 
                  className="text-base px-8 bg-white text-primary hover:bg-white/90"
                >
                  Try Free Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base px-8 border-white/30 text-white hover:bg-white/10"
                >
                  Contact Sales
                </Button>
              </div>
              
              <div className="pt-8 border-t border-white/20">
                <p className="text-sm opacity-75">
                  No credit card required • 14-day free trial • Setup in minutes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}