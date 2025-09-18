import React from 'react';
import { Shield, Users, Clock, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const achievements = [
  { icon: Users, value: "3", label: "Scénarios", color: "text-primary" },
  { icon: Clock, value: "24h", label: "Setup", color: "text-accent" },
  { icon: Award, value: "GPT-4o", label: "Realtime", color: "text-success" },
  { icon: Shield, value: "RGPD", label: "Conforme", color: "text-warning" }
];

export function ConsolidatedTrustSection() {
  return (
    <section className="py-12 px-6 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card key={achievement.label} className="text-center bg-background/70 border-border/50">
                <CardContent className="p-4">
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${achievement.color}`} />
                  <div className="text-lg font-bold">{achievement.value}</div>
                  <div className="text-xs text-muted-foreground">{achievement.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}