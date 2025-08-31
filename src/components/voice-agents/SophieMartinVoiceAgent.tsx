import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VoiceInterface from '@/components/VoiceInterface';
import { SophiePsychologicalStateManager } from '@/lib/cognitive/sophie-psychological-state';

interface SophieMartinVoiceAgentProps {
  conversationType: 'cold-call' | 'rdv';
  open?: boolean;
  onToggle?: () => void;
}

export function SophieMartinVoiceAgent({ 
  conversationType = 'cold-call', 
  open = true, 
  onToggle 
}: SophieMartinVoiceAgentProps) {
  const [selectedConversationType, setSelectedConversationType] = useState<'cold-call' | 'rdv'>(conversationType);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!open) return null;

  // Interface active avec nouvelle VoiceInterface
  if (isConnected) {
    return (
      <VoiceInterface
        conversationType={selectedConversationType}
        onSpeakingChange={setIsSpeaking}
        onStateChange={setIsConnected}
      />
    );
  }

  // Interface de démarrage avec sélecteur
  return (
    <Card className="fixed bottom-6 right-6 w-96 p-6 bg-card/95 backdrop-blur-sm border shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="font-medium">Sophie Martin</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            ModaStyle
          </Badge>
        </div>

        {/* Debug état psychologique en cold call */}
        {selectedConversationType === 'cold-call' && (
          <div className="text-xs text-muted-foreground space-y-1">
            <div>🧠 Mode psychologique dynamique activé</div>
            <div>⚡ Nouvel état généré à chaque session</div>
            <div>🎯 Difficulté adaptative et imprévisible</div>
          </div>
        )}

        {/* Sélecteur type de conversation */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Type de conversation</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={selectedConversationType === 'cold-call' ? 'default' : 'outline'}
              onClick={() => setSelectedConversationType('cold-call')}
              size="sm"
              className="text-xs"
            >
              🔥 Cold Call
            </Button>
            <Button
              variant={selectedConversationType === 'rdv' ? 'default' : 'outline'}
              onClick={() => setSelectedConversationType('rdv')}
              size="sm"
              className="text-xs"
            >
              📅 RDV
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p><strong>Cold Call:</strong> Sophie ne vous connaît pas, défenses maximales</p>
          <p><strong>RDV:</strong> Entretien planifié, plus structuré</p>
        </div>

        {/* Bouton de démarrage */}
        <VoiceInterface
          conversationType={selectedConversationType}
          onSpeakingChange={setIsSpeaking}
          onStateChange={setIsConnected}
        />
      </div>
    </Card>
  );
}