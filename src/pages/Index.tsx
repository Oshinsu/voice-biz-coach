import { VoiceCoach } from "@/components/VoiceCoach";
import { ScenarioSelector } from "@/components/ScenarioSelector";
import { CoachPanel } from "@/components/CoachPanel";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSalesStore } from "@/store/salesStore";
import { MessageSquare, Settings, BarChart3 } from "lucide-react";

const Index = () => {
  const { mode, setMode } = useSalesStore();

  return (
    <div className="h-screen bg-background">
      <div className="h-full flex flex-col">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Sales Coach AI</h1>
              <Tabs value={mode} onValueChange={(value: any) => setMode(value)}>
                <TabsList>
                  <TabsTrigger value="roleplay" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Jeu de rôle
                  </TabsTrigger>
                  <TabsTrigger value="coach" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Coach
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </header>

        {/* Main content - 3 panneaux */}
        <div className="flex-1 flex overflow-hidden">
          {/* Panneau gauche - Sélecteur de scénario */}
          <div className="w-80 border-r bg-card p-4 overflow-y-auto">
            <ScenarioSelector />
          </div>

          {/* Panneau centre - Chat/VoiceCoach */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4">
              <Card className="h-full">
                <VoiceCoach />
              </Card>
            </div>
          </div>

          {/* Panneau droit - Coach Panel */}
          <div className="w-80 border-l bg-card p-4 overflow-y-auto">
            <CoachPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
