import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Brain, TrendingUp, Users, Target } from 'lucide-react';

interface GlossaryTerm {
  term: string;
  definition: string;
  example?: string;
  category: 'technique' | 'commercial' | 'analyse' | 'general';
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Intelligence Artificielle (IA)",
    definition: "Technologie qui permet à un ordinateur de simuler l'intelligence humaine, comme comprendre le langage et tenir une conversation.",
    example: "Sophie (notre IA) peut comprendre vos questions et y répondre comme une vraie personne.",
    category: "technique"
  },
  {
    term: "Simulateur de conversation",
    definition: "Outil qui vous permet de pratiquer des discussions commerciales avec un client virtuel.",
    example: "Vous pouvez négocier un contrat avec Sophie sans risque.",
    category: "commercial"
  },
  {
    term: "Objection commerciale",
    definition: "Quand un client exprime une hésitation ou un refus face à votre proposition.",
    example: "Le client dit : 'C'est trop cher' - c'est une objection prix.",
    category: "commercial"
  },
  {
    term: "ROI (Retour sur Investissement)",
    definition: "Mesure qui montre si un investissement rapporte plus qu'il ne coûte.",
    example: "Si EDHEC dépense 300 000€ et économise 500 000€, le ROI est positif.",
    category: "analyse"
  },
  {
    term: "SWOT",
    definition: "Méthode d'analyse qui étudie les Forces, Faiblesses, Opportunités et Menaces d'une entreprise.",
    example: "Forces d'EDHEC : réputation excellente. Faiblesse : formation trop théorique.",
    category: "analyse"
  },
  {
    term: "Stakeholder",
    definition: "Personne qui a un intérêt dans le projet (client, utilisateur, décideur).",
    example: "Sophie Hennion-Moreau est un stakeholder clé car elle décide des achats.",
    category: "general"
  },
  {
    term: "B2B (Business to Business)",
    definition: "Vente d'une entreprise à une autre entreprise (pas aux particuliers).",
    example: "Byss vend à EDHEC (école) = B2B. Amazon vend aux étudiants = B2C.",
    category: "commercial"
  },
  {
    term: "Persona client",
    definition: "Portrait-type d'un client idéal avec ses caractéristiques et besoins.",
    example: "Sophie : 45 ans, directrice innovation, passionnée par les nouvelles technologies.",
    category: "commercial"
  }
];

export const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const icons = {
      technique: Brain,
      commercial: Users,
      analyse: TrendingUp,
      general: Target
    };
    return icons[category as keyof typeof icons] || Target;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      technique: 'bg-blue-100 text-blue-800',
      commercial: 'bg-green-100 text-green-800',
      analyse: 'bg-purple-100 text-purple-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'technique', label: 'Technique' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'analyse', label: 'Analyse' },
    { value: 'general', label: 'Général' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Glossaire BTS - Termes Essentiels
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Définitions simples des termes techniques utilisés dans ce scénario
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un terme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <Badge
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="space-y-4">
          {filteredTerms.map((term, index) => {
            const CategoryIcon = getCategoryIcon(term.category);
            return (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CategoryIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{term.term}</h4>
                      <Badge className={getCategoryColor(term.category)}>
                        {term.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {term.definition}
                    </p>
                    {term.example && (
                      <div className="p-3 bg-accent/10 rounded-lg border-l-4 border-accent">
                        <p className="text-sm">
                          <span className="font-medium text-accent">Exemple :</span> {term.example}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Aucun terme trouvé pour "{searchTerm}"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};