-- Créer table pour stocker les sessions VNS
CREATE TABLE public.vns_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  scenario_id TEXT NOT NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('cold_call', 'rdv')),
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  exchange_count INTEGER NOT NULL DEFAULT 0,
  
  -- Scores finaux
  score_ouverture DECIMAL(3,1) NOT NULL DEFAULT 0 CHECK (score_ouverture >= 0 AND score_ouverture <= 5),
  score_ecoute_active DECIMAL(3,1) NOT NULL DEFAULT 0 CHECK (score_ecoute_active >= 0 AND score_ecoute_active <= 5),
  score_decouverte DECIMAL(3,1) NOT NULL DEFAULT 0 CHECK (score_decouverte >= 0 AND score_decouverte <= 5),
  score_objections DECIMAL(3,1) NOT NULL DEFAULT 0 CHECK (score_objections >= 0 AND score_objections <= 5),
  score_next_step DECIMAL(3,1) NOT NULL DEFAULT 0 CHECK (score_next_step >= 0 AND score_next_step <= 5),
  score_overall DECIMAL(3,1) NOT NULL DEFAULT 0 CHECK (score_overall >= 0 AND score_overall <= 5),
  
  -- Trust evolution
  trust_final_level INTEGER NOT NULL DEFAULT 0 CHECK (trust_final_level >= 0 AND trust_final_level <= 5),
  trust_evidence JSONB DEFAULT '[]',
  
  -- Moments clés et rapport
  moments_cles JSONB DEFAULT '[]',
  recap_1_phrase TEXT,
  actions_3 JSONB DEFAULT '[]',
  
  -- Métadonnées
  report_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vns_sessions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can view their own VNS sessions" 
ON public.vns_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own VNS sessions" 
ON public.vns_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own VNS sessions" 
ON public.vns_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Index pour performance
CREATE INDEX idx_vns_sessions_user_scenario ON public.vns_sessions(user_id, scenario_id);
CREATE INDEX idx_vns_sessions_created_at ON public.vns_sessions(created_at DESC);

-- Trigger pour updated_at
CREATE TRIGGER update_vns_sessions_updated_at
BEFORE UPDATE ON public.vns_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Créer table pour logs temps réel des événements VNS
CREATE TABLE public.vns_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.vns_sessions(id) ON DELETE CASCADE,
  timestamp_sec INTEGER NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('trust_change', 'phase_change', 'score_update', 'key_moment')),
  event_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS pour events
ALTER TABLE public.vns_events ENABLE ROW LEVEL SECURITY;

-- Politique RLS pour events (via session)
CREATE POLICY "Users can access VNS events through their sessions" 
ON public.vns_events 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.vns_sessions s 
    WHERE s.id = vns_events.session_id 
    AND s.user_id = auth.uid()
  )
);

-- Index pour performance events
CREATE INDEX idx_vns_events_session_timestamp ON public.vns_events(session_id, timestamp_sec);