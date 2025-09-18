import React, { useState } from "react"
import { motion } from "framer-motion"
import { TestButton } from "@/components/ui/test-button"
import { DialogRadix } from "@/components/ui/dialog-radix"
import { MagicSpotlight } from "@/components/ui/magic-spotlight"
import { Sparkles, Zap, Star } from "lucide-react"

const Playground = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-12"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h1 
            className="text-4xl font-bold text-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            🎨 Playground UI Components
          </motion.h1>
          <p className="text-xl text-muted-foreground">
            Test des composants safelisted pour Lovable
          </p>
        </div>

        {/* Section 1: Test Buttons */}
        <MagicSpotlight>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Zap className="w-6 h-6 text-accent" />
              Test Buttons (shadcn-like)
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <TestButton variant="default">Default</TestButton>
              <TestButton variant="secondary">Secondary</TestButton>
              <TestButton variant="outline">Outline</TestButton>
              <TestButton variant="ghost">Ghost</TestButton>
              <TestButton variant="destructive">Destructive</TestButton>
              <TestButton variant="magic">Magic ✨</TestButton>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tailles :</p>
              <div className="flex items-center gap-4">
                <TestButton size="sm">Small</TestButton>
                <TestButton size="default">Default</TestButton>
                <TestButton size="lg">Large</TestButton>
              </div>
            </div>
          </div>
        </MagicSpotlight>

        {/* Section 2: Dialog Radix */}
        <MagicSpotlight>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Star className="w-6 h-6 text-accent" />
              Dialog Radix (avec @radix-ui/themes)
            </h2>
            
            <div className="space-y-4">
              <TestButton 
                onClick={() => setDialogOpen(true)}
                variant="magic"
              >
                Ouvrir Dialog Test
              </TestButton>

              <DialogRadix
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Dialog de Test"
                description="Ceci est un dialog basé sur Radix UI avec overlay, focus trap et animations."
              >
                <div className="space-y-4">
                  <p className="text-sm">
                    Ce dialog utilise @radix-ui/react-dialog avec des styles Tailwind
                    personnalisés et des animations fluides.
                  </p>
                  
                  <div className="flex gap-2 justify-end">
                    <TestButton 
                      variant="outline" 
                      onClick={() => setDialogOpen(false)}
                    >
                      Annuler
                    </TestButton>
                    <TestButton 
                      variant="default"
                      onClick={() => setDialogOpen(false)}
                    >
                      Confirmer
                    </TestButton>
                  </div>
                </div>
              </DialogRadix>
            </div>
          </div>
        </MagicSpotlight>

        {/* Section 3: Magic Spotlight Effect */}
        <MagicSpotlight>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              Magic Spotlight (Aceternity-style)
            </h2>
            
            <p className="text-muted-foreground">
              Composant avec effet spotlight au survol, utilisant framer-motion
              pour les animations et un dégradé radial qui suit le curseur.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <MagicSpotlight className="bg-card">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Card 1</h3>
                  <p className="text-sm text-muted-foreground">
                    Cette card utilise l'effet spotlight avec une animation
                    de scale au hover.
                  </p>
                </div>
              </MagicSpotlight>

              <MagicSpotlight className="bg-secondary">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Card 2</h3>
                  <p className="text-sm text-muted-foreground">
                    L'effet spotlight suit votre curseur et crée un halo
                    lumineux autour du pointeur.
                  </p>
                </div>
              </MagicSpotlight>
            </div>
          </div>
        </MagicSpotlight>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center space-y-4 py-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            Installation safelist réussie !
          </div>
          
          <p className="text-sm text-muted-foreground">
            ✅ framer-motion, @headlessui/react, @radix-ui/themes installés<br/>
            ✅ daisyUI configuré en plugin Tailwind v4<br/>
            ✅ 3 composants test créés et fonctionnels
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Playground