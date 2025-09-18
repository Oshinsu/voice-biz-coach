import { useState, useEffect } from "react";
import { Brain, Menu, X, ChevronDown, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { TestButton } from "@/components/ui/test-button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";

export function EnhancedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { navigationItems } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use Supabase navigation items with current state
  const navigation = navigationItems.map(item => ({
    ...item,
    current: location.pathname === item.href
  }));

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg" 
        : "bg-background/60 backdrop-blur-lg border-b border-border/30"
    )}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="p-2 bg-accent rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110">
                <Brain className="h-7 w-7 text-accent-foreground" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                Byss VNS
              </h1>
              <p className="text-xs text-muted-foreground leading-none">
                Virtual Negotiation Simulator
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-all duration-300 group",
                  item.current
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300",
                  item.current ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <TestButton 
                variant="outline" 
                className="border-border hover:border-accent hover:text-accent transition-all duration-300"
                asChild
              >
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Mon profil
                </Link>
              </TestButton>
            ) : (
              <>
                <TestButton 
                  variant="outline" 
                  className="border-border hover:border-accent hover:text-accent transition-all duration-300"
                  asChild
                >
                  <Link to="/auth">Connexion</Link>
                </TestButton>
                <TestButton className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300" asChild>
                  <Link to="/auth">Essai gratuit</Link>
                </TestButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <TestButton
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </TestButton>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 p-4 bg-background/95 backdrop-blur-xl rounded-xl border border-border shadow-xl">
            <nav className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                    item.current
                      ? "bg-secondary text-accent border border-border"
                      : "text-foreground hover:bg-secondary hover:text-accent"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-6 pt-4 border-t border-border space-y-3">
              {user ? (
                <TestButton 
                  variant="outline" 
                  className="w-full border-border hover:border-accent"
                  asChild
                >
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Mon profil
                  </Link>
                </TestButton>
              ) : (
                <>
                  <TestButton 
                    variant="outline" 
                    className="w-full border-border hover:border-accent"
                    asChild
                  >
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
                  </TestButton>
                  <TestButton className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Essai gratuit</Link>
                  </TestButton>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}