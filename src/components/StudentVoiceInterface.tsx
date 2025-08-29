import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  PhoneCall, 
  Mic, 
  MicOff, 
  Building2, 
  Target, 
  TrendingUp, 
  Users,
  Clock,
  MessageSquare,
  Zap,
  CheckCircle,
  AlertCircle,
  Award
} from 'lucide-react';
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
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
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
  exchanges,
  isMinimized = false,
  onToggleMinimize
}: StudentVoiceInterfaceProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getScenarioData = () => {
    // Données spécifiques par scénario avec fallback générique
    if (scenario?.id === 'digital-agency') {
      return {
        name: scenario.interlocutor?.name || 'Sarah Lambert',
        role: scenario.interlocutor?.role || 'COO - Chief Operating Officer',
        company: scenario.company?.name || 'Pixel Perfect Agency',
        sector: scenario.company?.sector || 'Agence Digitale',
        employee: scenario.company?.size || '12 employés',
        revenue: scenario.company?.revenue || '1.2M€/an',
        challenge: typeof scenario.company?.painPoints?.[0] === 'string' 
          ? scenario.company.painPoints[0] 
          : scenario.company?.painPoints?.[0]?.issue || 'Centralisation outils éparpillés',
        priority: scenario.interlocutor?.priorities?.[0] || 'Automatisation facturation',
        personality: scenario.interlocutor?.personality || 'Organisée et efficace',
        avatar: '👩‍💼',
        bgColor: 'from-blue-50 to-indigo-50',
        accentColor: 'blue'
      };
    }
    
    if (scenario?.id === 'kpi-performance') {
      return {
        name: 'Sophie Martin',
        role: 'Directrice Marketing Digital',
        company: 'ModaStyle',
        sector: 'E-commerce Mode Féminine',
        employee: '250 employés',
        revenue: '45M€ CA annuel',
        challenge: 'Optimiser le tracking et ROI publicitaire',
        priority: 'Analytics avancées & attribution multi-touch',
        personality: 'Pragmatique, orientée données, méfiante aux promesses',
        avatar: '👩‍💼',
        bgColor: 'from-purple-50 to-pink-50',
        accentColor: 'purple'
      };
    }
    
    // Fallback générique utilisant les données du scénario si disponibles
    return {
      name: scenario?.interlocutor?.name || 'Assistant Commercial',
      role: scenario?.interlocutor?.role || 'Décideur',
      company: scenario?.company?.name || 'Entreprise Cliente',
      sector: scenario?.company?.sector || 'Secteur d\'activité',
      employee: scenario?.company?.size || 'Taille équipe',
      revenue: scenario?.company?.revenue || 'CA estimé',
      challenge: typeof scenario?.company?.painPoints?.[0] === 'string' 
        ? scenario.company.painPoints[0] 
        : scenario?.company?.painPoints?.[0]?.issue || 'Défi principal',
      priority: scenario?.interlocutor?.priorities?.[0] || 'Priorité business',
      personality: scenario?.interlocutor?.personality || 'Profil de personnalité',
      avatar: '🤝',
      bgColor: 'from-blue-50 to-cyan-50',
      accentColor: 'blue'
    };
  };

  const data = getScenarioData();
  
  const getCallPhase = () => {
    if (!isConnected) return 'Préparation';
    if (sessionDuration < 30) return 'Ouverture';
    if (sessionDuration < 120) return 'Découverte';
    if (sessionDuration < 180) return 'Argumentation';
    return 'Négociation';
  };

  const getProgress = () => {
    if (!isConnected) return 0;
    return Math.min((sessionDuration / 300) * 100, 100); // Max 5 minutes
  };

  const getCallTips = () => {
    const phase = getCallPhase();
    switch (phase) {
      case 'Ouverture':
        return ['Présentez-vous clairement', 'Justifiez votre appel', 'Créez de l\'intérêt'];
      case 'Découverte':
        return ['Posez des questions ouvertes', 'Écoutez activement', 'Identifiez les enjeux'];
      case 'Argumentation':
        return ['Adaptez votre discours', 'Apportez de la valeur', 'Utilisez des preuves'];
      case 'Négociation':
        return ['Proposez des solutions', 'Gérez les objections', 'Cherchez l\'engagement'];
      default:
        return ['Préparez votre approche', 'Définissez votre objectif', 'Adoptez le bon mindset'];
    }
  };

  // Mode réduit pendant conversation
  if (isMinimized && isConnected) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-80 shadow-2xl border-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                  isSpeaking 
                    ? `bg-${data.accentColor}-100 animate-pulse`
                    : `bg-${data.accentColor}-50`
                )}>
                  {data.avatar}
                </div>
                <div>
                  <p className="font-medium text-sm">{data.name}</p>
                  <p className="text-xs text-muted-foreground">{getCallPhase()}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={onToggleMinimize}
                  className="h-6 w-6 p-0"
                >
                  ⬆️
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={onDisconnect}
                  className="h-6 w-6 p-0 text-destructive"
                >
                  ✕
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>{formatTime(sessionDuration)}</span>
                <span>{exchanges} échanges</span>
              </div>
              <Progress value={getProgress()} className="h-1" />
              <div className="text-center">
                {isListening ? (
                  <Badge variant="default" className="bg-green-600 text-xs">
                    <Mic className="w-3 h-3 mr-1" />
                    À vous
                  </Badge>
                ) : isSpeaking ? (
                  <Badge variant="default" className="bg-blue-600 animate-pulse text-xs">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {data.name} répond
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    <MicOff className="w-3 h-3 mr-1" />
                    En écoute
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Fond avec gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-50",
        data.bgColor
      )} />
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid gap-6 md:grid-cols-2">
          
          {/* Bouton pour minimiser */}
          {isConnected && onToggleMinimize && (
            <div className="absolute top-4 right-4">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={onToggleMinimize}
                className="bg-background/80 backdrop-blur-sm"
              >
                ⬇️ Réduire
              </Button>
            </div>
          )}
          
          {/* Panel Principal - Interlocuteur */}
          <Card className="shadow-2xl border-2">
            <CardHeader className="text-center pb-4">
              <div className="space-y-4">
                <div className={cn(
                  "w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl transition-all duration-500 border-4",
                  isConnected 
                    ? isSpeaking 
                      ? `bg-${data.accentColor}-100 border-${data.accentColor}-400 animate-pulse shadow-lg`
                      : `bg-${data.accentColor}-50 border-${data.accentColor}-200`
                    : "bg-muted border-muted-foreground/20"
                )}>
                  {data.avatar}
                </div>
                
                <div>
                  <CardTitle className="text-2xl">{data.name}</CardTitle>
                  <p className="text-muted-foreground font-medium">{data.role}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Building2 className="w-4 h-4" />
                    <span className="font-semibold text-lg">{data.company}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Informations Entreprise */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Secteur</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{data.sector}</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Équipe</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{data.employee}</p>
                </div>
              </div>

              {/* Status de l'appel */}
              <div className="space-y-3">
                <Separator />
                
                {!isConnected && !isConnecting && (
                  <div className="text-center space-y-3">
                    <Badge variant="outline" className="text-sm">
                      <Target className="w-4 h-4 mr-1" />
                      Prêt pour la négociation
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Appel commercial à froid - Soyez convaincant !
                    </p>
                  </div>
                )}
                
                {isConnecting && (
                  <div className="text-center space-y-2">
                    <Badge variant="default" className="animate-pulse">
                      <Zap className="w-4 h-4 mr-1" />
                      Connexion en cours...
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Préparation de l'appel vocal IA
                    </p>
                  </div>
                )}
                
                {isConnected && (
                  <div className="space-y-4">
                    <div className="text-center">
                      {isListening ? (
                        <Badge variant="default" className="bg-green-600">
                          <Mic className="w-4 h-4 mr-1" />
                          À vous de parler
                        </Badge>
                      ) : isSpeaking ? (
                        <Badge variant="default" className="bg-blue-600 animate-pulse">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {data.name} répond
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <MicOff className="w-4 h-4 mr-1" />
                          En écoute active
                        </Badge>
                      )}
                    </div>
                    
                    {/* Progression de l'appel */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Phase: <strong>{getCallPhase()}</strong></span>
                        <span className="text-muted-foreground">{formatTime(sessionDuration)}</span>
                      </div>
                      <Progress value={getProgress()} className="h-2" />
                    </div>
                    
                    {/* Stats session */}
                    <div className="flex justify-center gap-6 text-sm">
                      <div className="text-center">
                        <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="font-medium">{formatTime(sessionDuration)}</p>
                        <p className="text-xs text-muted-foreground">Durée</p>
                      </div>
                      <div className="text-center">
                        <MessageSquare className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="font-medium">{exchanges}</p>
                        <p className="text-xs text-muted-foreground">Échanges</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Contrôles */}
              <div className="space-y-3">
                <Separator />
                {!isConnected ? (
                  <Button 
                    onClick={onConnect}
                    disabled={isConnecting}
                    className="w-full"
                    size="lg"
                  >
                    <PhoneCall className="w-5 h-5 mr-2" />
                    {isConnecting ? 'Connexion...' : 'Lancer l\'Appel Commercial'}
                  </Button>
                ) : (
                  <Button 
                    onClick={onDisconnect}
                    variant="destructive"
                    className="w-full"
                    size="lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Terminer l'Appel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Panel Contextuel - Informations & Conseils */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Contexte Commercial
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Enjeux Client */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  Défi Principal
                </h3>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm text-orange-900">{data.challenge}</p>
                </div>
              </div>

              {/* Priorité Business */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Priorité Stratégique
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-900">{data.priority}</p>
                </div>
              </div>

              {/* Profil Personnalité */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  Profil Psychologique
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900">{data.personality}</p>
                </div>
              </div>

              <Separator />

              {/* Conseils Dynamiques */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  Conseils pour cette Phase
                </h3>
                <div className="space-y-2">
                  {getCallTips().map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions Techniques */}
              {!isConnected && (
                <>
                  <Separator />
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      Instructions Techniques
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-1.5 flex-shrink-0" />
                        <span>Parlez clairement après avoir vu le signal "À vous de parler"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-1.5 flex-shrink-0" />
                        <span>Écoutez attentivement les réponses de {data.name}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-1.5 flex-shrink-0" />
                        <span>Adaptez votre discours selon ses réactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-1.5 flex-shrink-0" />
                        <span>Visez un objectif concret avant de raccrocher</span>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}