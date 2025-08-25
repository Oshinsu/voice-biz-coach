import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, Users, Shield, ArrowLeft } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [organization, setOrganization] = useState('');
  const [accountType, setAccountType] = useState<'user' | 'school'>('user');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userData = {
      first_name: firstName,
      last_name: lastName,
      account_type: accountType,
      ...(accountType === 'school' && { school_name: schoolName }),
      ...(organization && { organization })
    };

    const { error } = await signUp(email, password, userData);
    
    if (error) {
      if (error.message.includes('already registered')) {
        setError('Un compte avec cette adresse email existe déjà. Essayez de vous connecter.');
      } else {
        setError(error.message);
      }
    } else {
      setError(null);
      alert('Compte créé avec succès! Vérifiez votre email pour confirmer votre compte.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              Byss VNS
            </h1>
            <p className="text-primary-foreground/80">
              Accédez à votre simulateur de négociation
            </p>
          </div>

          <Card className="bg-card/90 backdrop-blur-lg border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center">
                {activeTab === 'signin' ? 'Connexion' : 'Créer un compte'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Connexion</TabsTrigger>
                  <TabsTrigger value="signup">S'inscrire</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Mot de passe</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-cta hover:shadow-lg hover:shadow-accent/30"
                      disabled={loading}
                    >
                      {loading ? 'Connexion...' : 'Se connecter'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    {/* Type de compte */}
                    <div className="space-y-3">
                      <Label>Type de compte</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant={accountType === 'user' ? 'default' : 'outline'}
                          className="h-auto p-4 flex flex-col items-center gap-2"
                          onClick={() => setAccountType('user')}
                        >
                          <Users className="h-5 w-5" />
                          <span className="text-sm">Utilisateur</span>
                        </Button>
                        <Button
                          type="button"
                          variant={accountType === 'school' ? 'default' : 'outline'}
                          className="h-auto p-4 flex flex-col items-center gap-2"
                          onClick={() => setAccountType('school')}
                        >
                          <GraduationCap className="h-5 w-5" />
                          <span className="text-sm">École</span>
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          placeholder="Prénom"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          placeholder="Nom"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Mot de passe</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        minLength={6}
                      />
                    </div>

                    {accountType === 'school' && (
                      <div className="space-y-2">
                        <Label htmlFor="schoolName">Nom de l'école</Label>
                        <Input
                          id="schoolName"
                          placeholder="École Supérieure de Commerce..."
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organisation (optionnel)</Label>
                      <Input
                        id="organization"
                        placeholder="Nom de votre organisation"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        disabled={loading}
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-cta hover:shadow-lg hover:shadow-accent/30"
                      disabled={loading}
                    >
                      {loading ? 'Création...' : 'Créer le compte'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}