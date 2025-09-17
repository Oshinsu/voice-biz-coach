import { Shield, Users, Clock, Award, CheckCircle, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const partnerLogos = [
  { name: "ESCP Business School", domain: "escp.eu" },
  { name: "HEC Paris", domain: "hec.fr" },
  { name: "ESSEC Business School", domain: "essec.edu" },
  { name: "EDHEC Business School", domain: "edhec.edu" },
  { name: "Skema Business School", domain: "skema.edu" },
  { name: "Audencia Business School", domain: "audencia.com" }
];

const achievements = [
  { icon: Users, value: "3", label: "Scénarios développés", color: "text-primary" },
  { icon: Clock, value: "24h", label: "Setup garanti", color: "text-accent" },
  { icon: Award, value: "GPT-4o", label: "Technologie Realtime", color: "text-success" },
  { icon: Zap, value: "RGPD", label: "Conformité garantie", color: "text-warning" }
];

const certifications = [
  { name: "Conformité RGPD", icon: Shield, status: "Certifié" },
  { name: "Sécurité ISO 27001", icon: Shield, status: "En cours" },
  { name: "Partenaire OpenAI", icon: CheckCircle, status: "Officiel" }
];

export function TrustElements() {
  return (
    <section className="py-20 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* Achievements */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card 
                key={achievement.label}
                className="text-center bg-background/70 hover:bg-background border-border/50 hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <Icon className={`h-8 w-8 mx-auto mb-3 ${achievement.color}`} />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {achievement.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}