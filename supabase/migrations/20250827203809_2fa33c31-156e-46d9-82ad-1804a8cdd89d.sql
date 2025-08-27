-- Create interlocutors table for detailed contact information
CREATE TABLE public.interlocutors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id TEXT NOT NULL REFERENCES public.scenarios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  personality TEXT,
  communication_style TEXT,
  decision_power TEXT,
  priorities TEXT[],
  concerns TEXT[],
  motivations TEXT[],
  experience TEXT,
  background TEXT,
  psychology_profile JSONB,
  decision_process TEXT,
  linkedin_profile JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table for detailed product information
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id TEXT NOT NULL REFERENCES public.scenarios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  pricing_starter TEXT,
  pricing_professional TEXT,
  pricing_enterprise TEXT,
  key_features TEXT[],
  competitive_advantages TEXT[],
  roi TEXT,
  implementation_time TEXT,
  technical_specs JSONB,
  market_positioning JSONB,
  target_segments TEXT[],
  marketing_plan JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create swot_analyses table for comprehensive analysis
CREATE TABLE public.swot_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id TEXT NOT NULL REFERENCES public.scenarios(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL, -- 'company', 'product', 'market'
  strengths JSONB,
  weaknesses JSONB,
  opportunities JSONB,
  threats JSONB,
  porter_analysis JSONB,
  pestel_analysis JSONB,
  market_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create stakeholders table for stakeholder mapping
CREATE TABLE public.stakeholders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id TEXT NOT NULL REFERENCES public.scenarios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  influence TEXT,
  support TEXT,
  concerns TEXT[],
  approach TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.interlocutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swot_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stakeholders ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Interlocutors are publicly readable" ON public.interlocutors FOR SELECT USING (true);
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (true);
CREATE POLICY "SWOT analyses are publicly readable" ON public.swot_analyses FOR SELECT USING (true);
CREATE POLICY "Stakeholders are publicly readable" ON public.stakeholders FOR SELECT USING (true);

-- Create policies for admin management
CREATE POLICY "Admins can manage interlocutors" ON public.interlocutors FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage swot analyses" ON public.swot_analyses FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage stakeholders" ON public.stakeholders FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create triggers for timestamp updates
CREATE TRIGGER update_interlocutors_updated_at
  BEFORE UPDATE ON public.interlocutors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_swot_analyses_updated_at
  BEFORE UPDATE ON public.swot_analyses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_stakeholders_updated_at
  BEFORE UPDATE ON public.stakeholders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();