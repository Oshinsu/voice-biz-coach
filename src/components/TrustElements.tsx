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
  { icon: Users, value: "500+", label: "Étudiants formés", color: "text-primary" },
  { icon: Clock, value: "10K+", label: "Heures de simulation", color: "text-accent" },
  { icon: Award, value: "98%", label: "Satisfaction écoles", color: "text-success" },
  { icon: Zap, value: "45", label: "Universités partenaires", color: "text-warning" }
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
        {/* Partner Schools */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Écoles partenaires
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Ils nous font confiance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partnerLogos.map((partner, index) => (
              <div 
                key={partner.name}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="p-6 bg-background/50 hover:bg-background border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-accent rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-lg font-bold text-accent-foreground">
                          {partner.name.split(' ')[0].charAt(0)}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-foreground group-hover:text-accent transition-colors">
                        {partner.name}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

        {/* Certifications */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-8">
            Sécurité et conformité
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div 
                  key={cert.name}
                  className="flex items-center gap-3 bg-background/70 px-4 py-3 rounded-full border border-border/50 animate-slide-in-left"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Icon className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium text-foreground">{cert.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {cert.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}