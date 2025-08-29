import { AgentsVoiceCoach } from './AgentsVoiceCoach';

interface UnifiedVoiceCoachProps {
  scenario?: any;
  open?: boolean;
  onToggle?: () => void;
}

export function UnifiedVoiceCoach({ scenario, open = true, onToggle }: UnifiedVoiceCoachProps) {
  // ⚡ CACHE BREAK - NOUVEAU CODE WebRTC Direct - Pas d'Edge Function !
  console.log('🔄 UnifiedVoiceCoach: Redirection vers AgentsVoiceCoach WebRTC');
  return <AgentsVoiceCoach scenario={scenario} open={open} onToggle={onToggle} />;
}