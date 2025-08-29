import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, PhoneCall, Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudentVoiceInterfaceProps {
  scenario: any;
  onConnect: () => void;
  onDisconnect: () => void;
  isConnected: boolean;
  isConnecting: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  sessionDuration: number;
  exchanges: number;
}

export function StudentVoiceInterface({
  scenario,
  onConnect,
  onDisconnect,
  isConnected,
  isConnecting,
  isSpeaking,
  isListening,
  sessionDuration,
  exchanges
}: StudentVoiceInterfaceProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPersonaName = () => {
    if (scenario?.id === 'kpi-performance') return 'Sophie Martin';
    return 'Assistant Commercial';
  };

  const getCompanyName = () => {
    if (scenario?.id === 'kpi-performance') return 'ModaStyle';
    return 'Entreprise Cliente';
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-6">
            {/* Avatar et Status */}
            <div className="space-y-4">
              <div className={cn(
                "w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl transition-all duration-300",
                isConnected 
                  ? isSpeaking 
                    ? "bg-primary animate-pulse text-primary-foreground" 
                    : "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}>
                👩‍💼
              </div>
              
              <div>
                <h2 className="text-xl font-semibold">{getPersonaName()}</h2>
                <p className="text-sm text-muted-foreground">{getCompanyName()}</p>
              </div>
            </div>

            {/* Status de l'appel */}
            <div className="space-y-2">
              {!isConnected && !isConnecting && (
                <p className="text-sm text-muted-foreground">
                  Prêt à démarrer votre négociation
                </p>
              )}
              
              {isConnecting && (
                <p className="text-sm text-primary animate-pulse">
                  Connexion en cours...
                </p>
              )}
              
              {isConnected && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    {isListening ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Mic className="w-4 h-4" />
                        <span className="text-sm">Vous pouvez parler</span>
                      </div>
                    ) : isSpeaking ? (
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" />
                        <span className="text-sm">{getPersonaName()} parle</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MicOff className="w-4 h-4" />
                        <span className="text-sm">En écoute</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Durée: {formatTime(sessionDuration)} • Échanges: {exchanges}
                  </div>
                </div>
              )}
            </div>

            {/* Contrôles */}
            <div className="space-y-4">
              {!isConnected ? (
                <Button 
                  onClick={onConnect}
                  disabled={isConnecting}
                  className="w-full"
                  size="lg"
                >
                  <PhoneCall className="w-5 h-5 mr-2" />
                  {isConnecting ? 'Connexion...' : 'Démarrer l\'appel'}
                </Button>
              ) : (
                <Button 
                  onClick={onDisconnect}
                  variant="destructive"
                  className="w-full"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Raccrocher
                </Button>
              )}
            </div>

            {/* Instructions */}
            {!isConnected && (
              <div className="bg-muted/50 rounded-lg p-4 text-left">
                <h3 className="font-medium text-sm mb-2">Instructions:</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Parlez naturellement après le signal</li>
                  <li>• Écoutez attentivement les réponses</li>
                  <li>• Appliquez vos techniques de négociation</li>
                  <li>• Restez professionnel et courtois</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}