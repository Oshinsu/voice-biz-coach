import { ArrowRight, Brain, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestButton } from "@/components/ui/test-button";
import { MagicSpotlight } from "@/components/ui/magic-spotlight";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { motion } from "framer-motion";

const contactSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  institution: z.string().min(2, "Le nom de l'institution est requis"),
  role: z.string().min(1, "Veuillez sélectionner votre fonction"),
  students: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const { 
    register, 
    handleSubmit, 
    setValue, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const formattedData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone || '',
        institution: data.institution,
        role: data.role,
        studentCount: data.students || '',
        timeline: data.timeline || '',
        message: data.message || '',
      };

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formattedData
      });

      if (error) throw error;

      toast({
        title: "Message envoyé !",
        description: "Nous vous contacterons dans les plus brefs délais.",
      });
      
      reset();
    } catch (error) {
      console.error('Error sending contact email:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation Premium */}
      <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                className="p-2 bg-accent rounded-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Brain className="h-6 w-6 text-accent-foreground" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">Byss VNS</h1>
                <p className="text-xs text-muted-foreground">Virtual Negotiation Simulator</p>
              </div>
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-8">
            {[
              { to: "/", label: "Accueil" },
              { to: "/services", label: "Services" },
              { to: "/about", label: "Qui sommes-nous" },
              { to: "/contact", label: "Contact", active: true }
            ].map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Link 
                  to={item.to} 
                  className={`${item.active ? 'text-accent font-medium' : 'text-muted-foreground hover:text-accent'} transition-colors duration-300 relative group`}
                >
                  {item.label}
                  {item.active && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TestButton variant="outline" asChild>
              <Link to="/auth">Connexion</Link>
            </TestButton>
            <TestButton variant="magic" asChild>
              <Link to="/auth">Essai gratuit</Link>
            </TestButton>
          </motion.div>
        </div>
      </header>

      {/* Hero Section Ultra-Moderne */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-accent/20 via-transparent to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/10 via-transparent to-transparent rounded-full blur-3xl"
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contactez-nous
          </motion.h1>
          <motion.p 
            className="text-xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Prêt à révolutionner l'enseignement commercial dans votre établissement ? 
            Notre équipe d'experts est là pour répondre à toutes vos questions.
          </motion.p>
        </div>
      </section>

      {/* Contact Content Ultra Moderne */}
      <section className="py-20 px-6 bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form Premium */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <MagicSpotlight>
                <Card className="bg-card/90 backdrop-blur-lg border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <CardHeader className="pb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <CardTitle className="text-2xl text-foreground">Demander une démonstration</CardTitle>
                      <p className="text-muted-foreground mt-2">
                        Remplissez ce formulaire et nous vous recontacterons rapidement 
                        pour planifier une présentation personnalisée.
                      </p>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom *</Label>
                          <Input 
                            id="firstName" 
                            {...register('firstName')}
                            placeholder="Votre prénom" 
                            className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                          />
                          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom *</Label>
                          <Input 
                            id="lastName" 
                            {...register('lastName')}
                            placeholder="Votre nom"
                            className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                          />
                          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                        </div>
                      </motion.div>

                      {/* Email Field */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <Label htmlFor="email">Email professionnel *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          {...register('email')}
                          placeholder="votre.email@etablissement.edu"
                          className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                      </motion.div>

                      {/* Phone Field */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          {...register('phone')}
                          placeholder="+33 1 23 45 67 89"
                          className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                        />
                      </motion.div>

                      {/* Institution Field */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                      >
                        <Label htmlFor="institution">Établissement *</Label>
                        <Input 
                          id="institution" 
                          {...register('institution')}
                          placeholder="Nom de votre école/université"
                          className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                        />
                        {errors.institution && <p className="text-sm text-destructive">{errors.institution.message}</p>}
                      </motion.div>

                      {/* Role Selection */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                      >
                        <Label htmlFor="role">Votre fonction *</Label>
                        <Select onValueChange={(value) => setValue('role', value)}>
                          <SelectTrigger className="transition-all duration-300 hover:scale-[1.02]">
                            <SelectValue placeholder="Sélectionnez votre fonction" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="director">Directeur/Directrice</SelectItem>
                            <SelectItem value="dean">Doyen</SelectItem>
                            <SelectItem value="professor">Professeur/Enseignant</SelectItem>
                            <SelectItem value="coordinator">Coordinateur pédagogique</SelectItem>
                            <SelectItem value="it">Responsable IT</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
                      </motion.div>

                      {/* Students Field */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, rotate: -2 }}
                        whileInView={{ opacity: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                      >
                        <Label htmlFor="students">Nombre d'étudiants concernés</Label>
                        <Select onValueChange={(value) => setValue('students', value)}>
                          <SelectTrigger className="transition-all duration-300 hover:scale-[1.02]">
                            <SelectValue placeholder="Estimez le nombre d'étudiants" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50">Moins de 50</SelectItem>
                            <SelectItem value="200">50 - 200</SelectItem>
                            <SelectItem value="500">200 - 500</SelectItem>
                            <SelectItem value="1000">500 - 1000</SelectItem>
                            <SelectItem value="1000+">Plus de 1000</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      {/* Timeline Field */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9 }}
                      >
                        <Label htmlFor="timeline">Calendrier de déploiement souhaité</Label>
                        <Select onValueChange={(value) => setValue('timeline', value)}>
                          <SelectTrigger className="transition-all duration-300 hover:scale-[1.02]">
                            <SelectValue placeholder="Quand souhaitez-vous déployer ?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immédiatement</SelectItem>
                            <SelectItem value="q1">Prochain trimestre</SelectItem>
                            <SelectItem value="semester">Prochain semestre</SelectItem>
                            <SelectItem value="year">Année prochaine</SelectItem>
                            <SelectItem value="exploring">En phase d'exploration</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      {/* Message Field */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.0 }}
                      >
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          {...register('message')}
                          placeholder="Décrivez-nous vos besoins spécifiques, vos objectifs pédagogiques, ou toute question particulière..."
                          className="min-h-[120px] transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                        />
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <TestButton 
                          type="submit"
                          disabled={isSubmitting}
                          variant="magic"
                          className="w-full text-lg py-3"
                        >
                          {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                          {!isSubmitting && <Send className="ml-2 h-5 w-5" />}
                        </TestButton>
                      </motion.div>
                    </form>

                    <motion.p 
                      className="text-xs text-muted-foreground text-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 }}
                    >
                      En envoyant ce formulaire, vous acceptez que nous utilisions vos données 
                      pour vous recontacter concernant votre demande. 
                      <Link to="/privacy" className="text-accent hover:underline transition-colors duration-300">
                        Politique de confidentialité
                      </Link>
                    </motion.p>
                  </CardContent>
                </Card>
              </MagicSpotlight>
            </motion.div>

            {/* Contact Information Ultra Premium */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Direct Contact Premium */}
              <MagicSpotlight>
                <Card className="bg-card/90 backdrop-blur-lg border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <CardContent className="p-8">
                    <motion.h3 
                      className="text-2xl font-bold mb-6 text-foreground"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      Contacts Directs
                    </motion.h3>
                    <div className="space-y-6">
                      {[
                        {
                          icon: Mail,
                          title: "Email",
                          value: "hello@byss-vns.com",
                          subtitle: "Réponse sous 24h en jour ouvré",
                          delay: 0
                        },
                        {
                          icon: Phone,
                          title: "Téléphone", 
                          value: "+33 1 23 45 67 89",
                          subtitle: "Du lundi au vendredi, 9h-18h",
                          delay: 0.1
                        },
                        {
                          icon: MapPin,
                          title: "Adresse",
                          value: "123 Avenue de l'Innovation\n75001 Paris, France",
                          subtitle: "",
                          delay: 0.2
                        }
                      ].map((contact, index) => (
                        <motion.div 
                          key={contact.title}
                          className="flex items-start gap-4 group"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + contact.delay }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <motion.div 
                            className="p-3 bg-secondary rounded-lg group-hover:bg-accent/20 transition-all duration-300"
                            whileHover={{ rotate: 5, scale: 1.1 }}
                          >
                            <contact.icon className="h-6 w-6 text-accent" />
                          </motion.div>
                          <div>
                            <h4 className="font-semibold mb-1 text-foreground group-hover:text-accent transition-colors duration-300">{contact.title}</h4>
                            <p className="text-muted-foreground whitespace-pre-line">{contact.value}</p>
                            {contact.subtitle && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {contact.subtitle}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </MagicSpotlight>

              {/* Business Hours Premium */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <MagicSpotlight>
                  <Card className="bg-card/90 backdrop-blur-lg border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <motion.div 
                          className="p-2 bg-secondary rounded-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Clock className="h-6 w-6 text-accent" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-foreground">Horaires de Support</h3>
                      </div>
                      
                      <div className="space-y-3">
                        {[
                          { day: "Lundi - Vendredi", hours: "9h00 - 18h00" },
                          { day: "Samedi", hours: "10h00 - 16h00" },
                          { day: "Dimanche", hours: "Fermé" }
                        ].map((schedule, index) => (
                          <motion.div 
                            key={schedule.day}
                            className="flex justify-between hover:bg-secondary/50 p-2 rounded-lg transition-all duration-300"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <span className="text-muted-foreground">{schedule.day}</span>
                            <span className={`font-medium ${schedule.day === "Dimanche" ? "text-muted-foreground" : "text-foreground"}`}>
                              {schedule.hours}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div 
                        className="mt-6 p-4 bg-secondary/50 rounded-lg backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-sm text-muted-foreground">
                          <strong>Support d'urgence :</strong> Disponible 24/7 pour les clients 
                          avec contrat de support premium
                        </p>
                      </motion.div>
                    </CardContent>
                  </Card>
                </MagicSpotlight>
              </motion.div>

              {/* Quick Actions Premium */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <MagicSpotlight>
                  <Card className="bg-card/90 backdrop-blur-lg border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
                    <CardContent className="p-8">
                      <motion.h3 
                        className="text-xl font-bold mb-6 text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                      >
                        Actions Rapides
                      </motion.h3>
                      <div className="space-y-4">
                        {[
                          { icon: Mail, label: "Télécharger la brochure complète" },
                          { icon: Phone, label: "Planifier un appel découverte" },
                          { icon: Brain, label: "Accéder à la démo en ligne" }
                        ].map((action, index) => (
                          <motion.div
                            key={action.label}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <TestButton variant="outline" className="w-full justify-start group">
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <action.icon className="mr-3 h-5 w-5 group-hover:text-accent transition-colors duration-300" />
                              </motion.div>
                              {action.label}
                            </TestButton>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </MagicSpotlight>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Questions Fréquentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <Card className="bg-card border border-border shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-foreground">Quelle est la durée de déploiement ?</h4>
                <p className="text-sm text-muted-foreground">
                  Le déploiement complet prend généralement entre 2 et 4 semaines, 
                  incluant la formation de vos équipes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border border-border shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-foreground">Proposez-vous une période d'essai ?</h4>
                <p className="text-sm text-muted-foreground">
                  Oui, nous offrons une période d'essai de 30 jours gratuite 
                  pour évaluer la plateforme avec vos étudiants.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border border-border shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-foreground">L'intégration LMS est-elle possible ?</h4>
                <p className="text-sm text-muted-foreground">
                  Absolument ! Nous supportons les principales plateformes 
                  LMS (Moodle, Canvas, Blackboard, etc.).
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border border-border shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-foreground">Quels sont les prérequis techniques ?</h4>
                <p className="text-sm text-muted-foreground">
                  Simple navigateur web moderne et connexion internet. 
                  Aucune installation logicielle requise.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Prêt à démarrer ?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Planifions ensemble la transformation digitale de votre enseignement commercial
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TestButton variant="magic" size="lg" className="text-lg px-8 py-4">
              Planifier une démo personnalisée
              <ArrowRight className="ml-2 h-5 w-5" />
            </TestButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}