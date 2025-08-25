import { useState, useEffect } from "react";
import { Brain, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EnhancedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Accueil", href: "/", current: location.pathname === "/" },
    { name: "Services", href: "/services", current: location.pathname === "/services" },
    { name: "Qui sommes-nous", href: "/about", current: location.pathname === "/about" },
    { name: "Contact", href: "/contact", current: location.pathname === "/contact" }
  ];

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg" 
        : "bg-background/60 backdrop-blur-lg border-b border-border/30"
    )}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="p-2 bg-accent rounded-xl shadow-lg group-hover:shadow-accent/25 transition-all duration-300 group-hover:scale-110">
                <Brain className="h-7 w-7 text-accent-foreground" />
              </div>
              <div className="absolute inset-0 bg-accent rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
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
                key={item.name}
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
            <Button 
              variant="outline" 
              className="border-border/50 hover:border-accent/50 hover:text-accent transition-all duration-300"
            >
              Connexion
            </Button>
            <Button className="bg-gradient-cta hover:shadow-lg hover:shadow-accent/25 text-accent-foreground transition-all duration-300 hover:scale-105">
              Essai gratuit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
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
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 p-4 bg-background/95 backdrop-blur-xl rounded-xl border border-border/50 shadow-xl animate-slide-up">
            <nav className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                    item.current
                      ? "bg-accent/10 text-accent border border-accent/20"
                      : "text-foreground hover:bg-accent/5 hover:text-accent"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-6 pt-4 border-t border-border/50 space-y-3">
              <Button 
                variant="outline" 
                className="w-full border-border/50 hover:border-accent/50"
              >
                Connexion
              </Button>
              <Button className="w-full bg-gradient-cta text-accent-foreground">
                Essai gratuit
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}