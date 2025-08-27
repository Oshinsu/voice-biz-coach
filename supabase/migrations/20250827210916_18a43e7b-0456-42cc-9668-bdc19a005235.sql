-- Clean duplicate products and replace with unique ones
DELETE FROM products WHERE name = 'SportAI Personal Shopper' AND scenario_id != 'retail-personalization';
DELETE FROM products WHERE name = 'TalentFlow Pro' AND scenario_id != 'hr-transformation';

-- Add unique products for scenarios that had duplicates
INSERT INTO products (scenario_id, name, description, pricing_starter, pricing_professional, pricing_enterprise, key_features, competitive_advantages, roi, implementation_time) VALUES
('fintech-startup', 'FinFlow Analytics', 'Advanced financial analytics and reporting platform with real-time dashboards', '€2,500/month', '€8,500/month', '€25,000/month', ARRAY['Real-time financial dashboards', 'Predictive cash flow modeling', 'Automated compliance reporting', 'Multi-currency support'], ARRAY['AI-powered financial forecasting', 'Regulatory compliance automation', 'Real-time risk assessment'], '300% ROI in first year', '6-8 weeks'),
('manufacturing-iot', 'IndustryConnect IoT', 'Industrial IoT platform for smart manufacturing and predictive maintenance', '€5,000/month', '€15,000/month', '€50,000/month', ARRAY['Real-time equipment monitoring', 'Predictive maintenance alerts', 'Production optimization', 'Energy efficiency tracking'], ARRAY['AI-driven predictive analytics', 'Edge computing capabilities', 'Industry 4.0 compliance'], '250% ROI in 18 months', '12-16 weeks'),
('byss-vns-school', 'EduFlow Management', 'Comprehensive school management system with student tracking and performance analytics', '€800/month', '€2,500/month', '€8,000/month', ARRAY['Student information system', 'Grade management', 'Parent communication portal', 'Analytics dashboard'], ARRAY['Integrated learning analytics', 'Mobile-first design', 'GDPR compliant'], '200% ROI in 2 years', '8-12 weeks');

-- Add second product for kpi-performance scenario
INSERT INTO products (scenario_id, name, description, pricing_starter, pricing_professional, pricing_enterprise, key_features, competitive_advantages, roi, implementation_time) VALUES
('kpi-performance', 'AttributionMax Pro', 'Advanced marketing attribution and performance tracking solution', '€3,500/month', '€12,000/month', '€35,000/month', ARRAY['Multi-touch attribution modeling', 'Cross-channel campaign tracking', 'ROI optimization engine', 'Customer journey analytics'], ARRAY['Machine learning attribution models', 'Real-time optimization', 'Unified data platform'], '400% ROI in first year', '10-14 weeks');

-- Add missing SWOT analyses for byss-vns-school
INSERT INTO swot_analyses (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats) VALUES
('byss-vns-school', 'company', 
  '{"Strong educational expertise": {"score": 85, "impact": "high", "probability": 90}, "Government partnerships": {"score": 80, "impact": "high", "probability": 85}, "Proven track record": {"score": 75, "impact": "medium", "probability": 80}}',
  '{"Limited tech budget": {"score": 70, "impact": "high", "probability": 85}, "Change resistance": {"score": 65, "impact": "medium", "probability": 75}, "Complex procurement": {"score": 60, "impact": "medium", "probability": 70}}',
  '{"Digital transformation": {"score": 90, "impact": "high", "probability": 95}, "Remote learning demand": {"score": 85, "impact": "high", "probability": 90}, "Data-driven education": {"score": 80, "impact": "medium", "probability": 85}}',
  '{"Budget constraints": {"score": 75, "impact": "high", "probability": 80}, "Competing priorities": {"score": 70, "impact": "medium", "probability": 75}, "Privacy concerns": {"score": 65, "impact": "medium", "probability": 70}}'
),
('byss-vns-school', 'competitive',
  '{"Education specialization": {"score": 85, "impact": "high", "probability": 90}, "Local market knowledge": {"score": 80, "impact": "medium", "probability": 85}, "Compliance expertise": {"score": 75, "impact": "high", "probability": 80}}',
  '{"Limited resources": {"score": 75, "impact": "high", "probability": 85}, "Brand recognition": {"score": 70, "impact": "medium", "probability": 80}, "Feature gaps": {"score": 65, "impact": "medium", "probability": 75}}',
  '{"Market expansion": {"score": 85, "impact": "high", "probability": 80}, "Partnership opportunities": {"score": 80, "impact": "medium", "probability": 85}, "AI integration": {"score": 75, "impact": "high", "probability": 70}}',
  '{"Big tech competitors": {"score": 80, "impact": "high", "probability": 85}, "Open source solutions": {"score": 75, "impact": "medium", "probability": 80}, "Economic uncertainty": {"score": 70, "impact": "medium", "probability": 75}}'
);

-- Add missing SWOT analyses for fintech-startup
INSERT INTO swot_analyses (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats) VALUES
('fintech-startup', 'company',
  '{"Innovation agility": {"score": 90, "impact": "high", "probability": 95}, "Tech expertise": {"score": 85, "impact": "high", "probability": 90}, "Growth potential": {"score": 80, "impact": "high", "probability": 85}}',
  '{"Limited resources": {"score": 80, "impact": "high", "probability": 90}, "Brand recognition": {"score": 75, "impact": "medium", "probability": 85}, "Regulatory complexity": {"score": 70, "impact": "high", "probability": 80}}',
  '{"Digital adoption": {"score": 95, "impact": "high", "probability": 90}, "Market disruption": {"score": 85, "impact": "high", "probability": 85}, "Partnership potential": {"score": 80, "impact": "medium", "probability": 80}}',
  '{"Regulatory changes": {"score": 85, "impact": "high", "probability": 80}, "Established competitors": {"score": 80, "impact": "high", "probability": 85}, "Economic volatility": {"score": 75, "impact": "medium", "probability": 75}}'
),
('fintech-startup', 'competitive',
  '{"Advanced analytics": {"score": 85, "impact": "high", "probability": 90}, "User experience": {"score": 80, "impact": "medium", "probability": 85}, "API integration": {"score": 75, "impact": "medium", "probability": 80}}',
  '{"Market penetration": {"score": 75, "impact": "high", "probability": 85}, "Enterprise sales": {"score": 70, "impact": "medium", "probability": 80}, "Compliance costs": {"score": 65, "impact": "high", "probability": 75}}',
  '{"Niche specialization": {"score": 80, "impact": "high", "probability": 85}, "Technology partnerships": {"score": 75, "impact": "medium", "probability": 80}, "Global expansion": {"score": 70, "impact": "high", "probability": 70}}',
  '{"Big bank competition": {"score": 85, "impact": "high", "probability": 80}, "Regulatory barriers": {"score": 80, "impact": "high", "probability": 85}, "Market saturation": {"score": 70, "impact": "medium", "probability": 75}}'
);

-- Add missing SWOT analyses for manufacturing-iot
INSERT INTO swot_analyses (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats) VALUES
('manufacturing-iot', 'company',
  '{"Industrial expertise": {"score": 85, "impact": "high", "probability": 90}, "Operational efficiency": {"score": 80, "impact": "high", "probability": 85}, "Quality processes": {"score": 75, "impact": "medium", "probability": 80}}',
  '{"Technology gaps": {"score": 75, "impact": "high", "probability": 85}, "Digital skills": {"score": 70, "impact": "medium", "probability": 80}, "Legacy systems": {"score": 65, "impact": "high", "probability": 75}}',
  '{"Industry 4.0 adoption": {"score": 90, "impact": "high", "probability": 85}, "Predictive maintenance": {"score": 85, "impact": "high", "probability": 90}, "Supply chain optimization": {"score": 80, "impact": "medium", "probability": 80}}',
  '{"Cybersecurity risks": {"score": 80, "impact": "high", "probability": 75}, "Technology complexity": {"score": 75, "impact": "medium", "probability": 80}, "Investment costs": {"score": 70, "impact": "high", "probability": 85}}'
),
('manufacturing-iot', 'competitive',
  '{"IoT specialization": {"score": 85, "impact": "high", "probability": 90}, "Industry knowledge": {"score": 80, "impact": "high", "probability": 85}, "Scalable platform": {"score": 75, "impact": "medium", "probability": 80}}',
  '{"Market education": {"score": 70, "impact": "medium", "probability": 80}, "Integration complexity": {"score": 65, "impact": "high", "probability": 75}, "Customization needs": {"score": 60, "impact": "medium", "probability": 70}}',
  '{"Digital transformation": {"score": 90, "impact": "high", "probability": 85}, "Edge computing": {"score": 80, "impact": "high", "probability": 80}, "AI integration": {"score": 75, "impact": "high", "probability": 75}}',
  '{"Tech giants": {"score": 85, "impact": "high", "probability": 80}, "Open standards": {"score": 75, "impact": "medium", "probability": 75}, "Economic downturns": {"score": 70, "impact": "medium", "probability": 70}}'
);

-- Add missing SWOT analyses for kpi-performance
INSERT INTO swot_analyses (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats) VALUES
('kpi-performance', 'company',
  '{"Marketing expertise": {"score": 85, "impact": "high", "probability": 90}, "Data-driven culture": {"score": 80, "impact": "high", "probability": 85}, "Growth focus": {"score": 75, "impact": "medium", "probability": 80}}',
  '{"Attribution complexity": {"score": 75, "impact": "high", "probability": 80}, "Tool fragmentation": {"score": 70, "impact": "medium", "probability": 85}, "Measurement gaps": {"score": 65, "impact": "medium", "probability": 75}}',
  '{"Privacy-first marketing": {"score": 90, "impact": "high", "probability": 85}, "AI-driven insights": {"score": 85, "impact": "high", "probability": 80}, "Omnichannel tracking": {"score": 80, "impact": "medium", "probability": 85}}',
  '{"Privacy regulations": {"score": 80, "impact": "high", "probability": 90}, "Cookie deprecation": {"score": 85, "impact": "high", "probability": 95}, "Platform changes": {"score": 75, "impact": "medium", "probability": 80}}'
),
('kpi-performance', 'competitive',
  '{"Advanced attribution": {"score": 85, "impact": "high", "probability": 90}, "Real-time optimization": {"score": 80, "impact": "high", "probability": 85}, "Cross-platform tracking": {"score": 75, "impact": "medium", "probability": 80}}',
  '{"Market education": {"score": 70, "impact": "medium", "probability": 80}, "Implementation complexity": {"score": 65, "impact": "high", "probability": 75}, "Data quality dependencies": {"score": 60, "impact": "medium", "probability": 70}}',
  '{"First-party data focus": {"score": 90, "impact": "high", "probability": 85}, "AI/ML advancement": {"score": 85, "impact": "high", "probability": 80}, "Privacy compliance": {"score": 80, "impact": "medium", "probability": 85}}',
  '{"Big tech dominance": {"score": 85, "impact": "high", "probability": 80}, "In-house solutions": {"score": 75, "impact": "medium", "probability": 75}, "Economic uncertainty": {"score": 70, "impact": "medium", "probability": 70}}'
);

-- Add missing interlocutors for retail-personalization
INSERT INTO interlocutors (scenario_id, name, role, personality, communication_style, decision_power, priorities, concerns, motivations, experience) VALUES
('retail-personalization', 'Emma Rodriguez', 'Chief Technology Officer', 'Analytical and forward-thinking', 'Technical and data-focused', 'High', ARRAY['Technology scalability', 'Data security', 'Innovation'], ARRAY['Technical complexity', 'Integration challenges', 'Security risks'], ARRAY['Digital transformation', 'Competitive advantage', 'Operational efficiency'], '8 years in retail technology'),
('retail-personalization', 'David Kim', 'VP of Customer Experience', 'Customer-centric and strategic', 'Collaborative and relationship-focused', 'High', ARRAY['Customer satisfaction', 'Personalization', 'User experience'], ARRAY['Customer privacy', 'Implementation timeline', 'ROI measurement'], ARRAY['Enhanced customer experience', 'Competitive differentiation', 'Revenue growth'], '6 years in customer experience');

-- Remove excess stakeholders from retail-personalization (keeping only essential ones)
DELETE FROM stakeholders WHERE scenario_id = 'retail-personalization' AND name IN ('Regional Store Managers', 'Customer Service Team', 'Legal Department');

-- Add stakeholders for scenarios that need them
INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('fintech-startup', 'Regulatory Affairs Manager', 'Compliance Officer', 'Medium', 'Neutral', ARRAY['Regulatory compliance', 'Data protection'], 'Focus on compliance benefits and risk mitigation'),
('manufacturing-iot', 'Plant Manager', 'Operations Lead', 'High', 'Supportive', ARRAY['Production disruption', 'Training needs'], 'Emphasize operational benefits and phased implementation'),
('byss-vns-school', 'Parent Representative', 'Stakeholder', 'Medium', 'Cautious', ARRAY['Student privacy', 'Data security'], 'Address privacy concerns and demonstrate benefits'),
('kpi-performance', 'Data Protection Officer', 'Compliance', 'Medium', 'Neutral', ARRAY['Privacy compliance', 'Data governance'], 'Highlight privacy-first approach and compliance features');