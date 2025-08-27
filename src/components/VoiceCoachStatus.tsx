import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Activity, Clock, Users } from "lucide-react";

interface VoiceCoachStatusProps {
  isConnected: boolean;
  isRecording: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
  trustLevel: number;
  currentPhase: string;
  conversationType: 'cold-call' | 'rdv' | null;
  selectedVoice: string;
  scenario?: any;
  compact?: boolean;
}

export function VoiceCoachStatus({
  isConnected,
  isRecording,
  isSpeaking,
  isMuted,
  trustLevel,
  currentPhase,
  conversationType,
  selectedVoice,
  scenario,
  compact = false
}: VoiceCoachStatusProps) {

  const getTrustLevelColor = (level: number) => {
    if (level < 25) return "bg-red-500";
    if (level < 50) return "bg-yellow-500"; 
    if (level < 75) return "bg-orange-500";
    return "bg-green-500";
  };

  const getTrustLevelText = (level: number) => {
    if (level < 25) return "Méfiant";
    if (level < 50) return "Prudent";
    if (level < 75) return "Intéressé"; 
    return "Convaincu";
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
        <span className="text-muted-foreground">
          {isConnected ? 'En ligne' : 'Hors ligne'}
        </span>
        {isConnected && (
          <>
            {isRecording && <Badge variant="secondary" className="text-xs bg-red-100 text-red-800">Parle</Badge>}
            {isSpeaking && <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">Écoute</Badge>}
          </>
        )}
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        {/* Status de connexion */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="font-medium">
              {isConnected ? 'Contact connecté' : 'Déconnecté'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {isMuted ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4 text-green-500" />}
            {isSpeaking ? <Volume2 className="h-4 w-4 text-blue-500" /> : <VolumeX className="h-4 w-4 text-gray-400" />}
          </div>
        </div>

        {/* Informations de session */}
        {isConnected && scenario && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{scenario.company?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              <span>Voix: {selectedVoice}</span>
            </div>
          </div>
        )}

        {/* Type de conversation et phase */}
        {conversationType && (
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={conversationType === 'cold-call' ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}
            >
              {conversationType === 'cold-call' ? 'Cold Call' : 'RDV'}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Phase: {currentPhase}
            </Badge>
          </div>
        )}

        {/* Niveau de confiance */}
        {isConnected && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Niveau de confiance</span>
              <span className="font-medium">{trustLevel}% - {getTrustLevelText(trustLevel)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress 
                value={trustLevel} 
                className="flex-1 h-2"
              />
              <div className={`w-2 h-2 rounded-full ${getTrustLevelColor(trustLevel)}`} />
            </div>
          </div>
        )}

        {/* États de communication */}
        {isConnected && (
          <div className="flex items-center gap-2 justify-center">
            {isRecording && (
              <Badge className="bg-red-100 text-red-800 text-xs animate-pulse">
                <Mic className="h-3 w-3 mr-1" />
                Vous parlez
              </Badge>
            )}
            {isSpeaking && (
              <Badge className="bg-blue-100 text-blue-800 text-xs animate-pulse">
                <Volume2 className="h-3 w-3 mr-1" />
                Contact parle
              </Badge>
            )}
            {!isRecording && !isSpeaking && (
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                En attente
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}