import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Target, Clock, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ComponentType<any>;
  value: string | number;
  label: string;
  delay: number;
  color: string;
}

const StatCard = ({ icon: Icon, value, label, delay, color }: StatCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (isVisible && typeof value === 'number') {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <Card 
      ref={cardRef}
      className={`relative overflow-hidden bg-gradient-feature border-0 shadow-lg hover:shadow-xl transition-all duration-500 group ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-full ${color} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
        </div>
        <div className={`text-3xl font-bold mb-2 transition-all duration-500 ${isVisible ? 'text-foreground' : 'text-muted-foreground'}`}>
          {typeof value === 'number' ? animatedValue : value}
        </div>
        <div className="text-sm text-muted-foreground font-medium">{label}</div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </CardContent>
    </Card>
  );
};

interface EnhancedStatsProps {
  totalCompanies: number;
  totalRevenue: number;
  avgSuccessRate: number;
}

export function EnhancedStats({ totalCompanies, totalRevenue, avgSuccessRate }: EnhancedStatsProps) {
  return (
    <section className="py-20 px-6 bg-gradient-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-orange-500/20 backdrop-blur-sm"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Performances en temps réel
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up">
            Des résultats concrets pour l'apprentissage commercial moderne
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            icon={Target}
            value={totalCompanies}
            label="Scénarios B2B disponibles"
            delay={100}
            color="bg-primary"
          />
          <StatCard
            icon={TrendingUp}
            value={`${(totalRevenue/1000000).toFixed(1)}M€`}
            label="Valeur totale des deals"
            delay={200}
            color="bg-accent"
          />
          <StatCard
            icon={BarChart3}
            value={avgSuccessRate}
            label="Taux de réussite moyen"
            delay={300}
            color="bg-success"
          />
          <StatCard
            icon={Clock}
            value="24/7"
            label="Disponibilité plateforme"
            delay={400}
            color="bg-warning"
          />
        </div>
      </div>
    </section>
  );
}