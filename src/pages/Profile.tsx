import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedHeader } from '@/components/EnhancedHeader';
import { 
  User, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Target, 
  BarChart3,
  Calendar,
  Settings,
  LogOut,
  GraduationCap,
  Users,
  Shield
} from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  school_name?: string;
  organization?: string;
  created_at: string;
}

interface UserRole {
  role: 'admin' | 'school' | 'user';
}

interface UserStats {
  total_sessions: number;
  average_score: number;
  total_duration_minutes: number;
  best_score: number;
  completed_scenarios: string[];
  preferred_scenarios: string[];
  improvement_rate: number;
  last_session_date?: string;
}

interface TrainingSession {
  id: string;
  scenario_id: string;
  conversation_type: string;
  phase: string;
  score: number;
  duration_seconds: number;
  created_at: string;
  feedback?: string;
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [recentSessions, setRecentSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editedProfile, setEditedProfile] = useState({
    first_name: '',
    last_name: '',
    school_name: '',
    organization: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchProfileData();
  }, [user, navigate]);

  const fetchProfileData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      
      // Fetch user role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (roleError) throw roleError;
      
      // Fetch user stats
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsError) throw statsError;
      
      // Fetch recent sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('training_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (sessionsError) throw sessionsError;

      setProfile(profileData);
      setUserRole(roleData);
      setUserStats(statsData);
      setRecentSessions(sessionsData || []);
      
      setEditedProfile({
        first_name: profileData.first_name || '',
        last_name: profileData.last_name || '',
        school_name: profileData.school_name || '',
        organization: profileData.organization || ''
      });
      
    } catch (error: any) {
      console.error('Error fetching profile data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    
    try {
      setUpdating(true);
      setError(null);
      
      const { error } = await supabase
        .from('profiles')
        .update(editedProfile)
        .eq('id', user.id);

      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, ...editedProfile } : null);
      alert('Profil mis à jour avec succès!');
      
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'school': return <GraduationCap className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive text-destructive-foreground';
      case 'school': return 'bg-warning text-warning-foreground';
      default: return 'bg-accent text-accent-foreground';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'school': return 'École';
      default: return 'Utilisateur';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <EnhancedHeader />
        <div className="container mx-auto px-6 py-32">
          <div className="text-center">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
              <p className="text-muted-foreground">
                Gérez votre compte et consultez vos statistiques
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-cta rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-accent-foreground">
                        {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">
                      {profile?.first_name} {profile?.last_name}
                    </h3>
                    <p className="text-muted-foreground">{profile?.email}</p>
                    {userRole && (
                      <Badge className={`mt-2 ${getRoleColor(userRole.role)}`}>
                        {getRoleIcon(userRole.role)}
                        {getRoleLabel(userRole.role)}
                      </Badge>
                    )}
                  </div>
                  
                  {profile?.school_name && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-muted-foreground">École</p>
                      <p className="text-sm">{profile.school_name}</p>
                    </div>
                  )}
                  
                  {profile?.organization && (
                    <div className="pt-2">
                      <p className="text-sm font-medium text-muted-foreground">Organisation</p>
                      <p className="text-sm">{profile.organization}</p>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <p className="text-sm font-medium text-muted-foreground">Membre depuis</p>
                    <p className="text-sm">
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fr-FR') : '-'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="stats" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="stats">Statistiques</TabsTrigger>
                  <TabsTrigger value="history">Historique</TabsTrigger>
                  <TabsTrigger value="settings">Paramètres</TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Trophy className="h-6 w-6 text-accent mx-auto mb-2" />
                        <div className="text-2xl font-bold">{userStats?.total_sessions || 0}</div>
                        <div className="text-xs text-muted-foreground">Sessions</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
                        <div className="text-2xl font-bold">{userStats?.average_score?.toFixed(1) || '0.0'}</div>
                        <div className="text-xs text-muted-foreground">Score moyen</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Clock className="h-6 w-6 text-warning mx-auto mb-2" />
                        <div className="text-2xl font-bold">{Math.floor((userStats?.total_duration_minutes || 0) / 60)}h</div>
                        <div className="text-xs text-muted-foreground">Temps total</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Target className="h-6 w-6 text-accent mx-auto mb-2" />
                        <div className="text-2xl font-bold">{userStats?.best_score?.toFixed(1) || '0.0'}</div>
                        <div className="text-xs text-muted-foreground">Meilleur score</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Progress */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Progression
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Taux d'amélioration</span>
                            <span className="text-sm font-medium">{userStats?.improvement_rate?.toFixed(1) || 0}%</span>
                          </div>
                          <Progress value={userStats?.improvement_rate || 0} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Scénarios complétés</span>
                            <span className="text-sm font-medium">{userStats?.completed_scenarios?.length || 0}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {userStats?.completed_scenarios?.map((scenario, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {scenario}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Sessions récentes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {recentSessions.length > 0 ? (
                        <div className="space-y-4">
                          {recentSessions.map((session) => (
                            <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex-1">
                                <p className="font-medium">{session.scenario_id}</p>
                                <p className="text-sm text-muted-foreground">
                                  {session.conversation_type} - Phase: {session.phase}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(session.created_at).toLocaleDateString('fr-FR')} - 
                                  {Math.floor(session.duration_seconds / 60)}min
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge variant={session.score >= 70 ? 'default' : 'secondary'}>
                                  {session.score}/100
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          Aucune session enregistrée
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Modifier le profil
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-first-name">Prénom</Label>
                          <Input
                            id="edit-first-name"
                            value={editedProfile.first_name}
                            onChange={(e) => setEditedProfile(prev => ({ ...prev, first_name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-last-name">Nom</Label>
                          <Input
                            id="edit-last-name"
                            value={editedProfile.last_name}
                            onChange={(e) => setEditedProfile(prev => ({ ...prev, last_name: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      {userRole?.role === 'school' && (
                        <div className="space-y-2">
                          <Label htmlFor="edit-school-name">Nom de l'école</Label>
                          <Input
                            id="edit-school-name"
                            value={editedProfile.school_name}
                            onChange={(e) => setEditedProfile(prev => ({ ...prev, school_name: e.target.value }))}
                          />
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="edit-organization">Organisation</Label>
                        <Input
                          id="edit-organization"
                          value={editedProfile.organization}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, organization: e.target.value }))}
                        />
                      </div>
                      
                      <Button 
                        onClick={updateProfile} 
                        disabled={updating}
                        className="bg-gradient-cta hover:shadow-lg hover:shadow-accent/30"
                      >
                        {updating ? 'Mise à jour...' : 'Mettre à jour'}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}