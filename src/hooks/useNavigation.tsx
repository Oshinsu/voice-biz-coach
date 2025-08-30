import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NavigationItem {
  id: string;
  name: string;
  href: string;
  order_index: number;
  is_active: boolean;
}

interface SiteConfig {
  [key: string]: string;
}

export const useNavigation = () => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default navigation items as fallback
  const defaultNavigationItems: NavigationItem[] = [
    { id: '1', name: 'Accueil', href: '/', order_index: 1, is_active: true },
    { id: '2', name: 'Scénarios', href: '/scenarios', order_index: 2, is_active: true },
    { id: '3', name: 'Services', href: '/services', order_index: 3, is_active: true },
    { id: '4', name: 'À propos', href: '/about', order_index: 4, is_active: true },
    { id: '5', name: 'Contact', href: '/contact', order_index: 5, is_active: true },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch navigation items
        const { data: navData, error: navError } = await supabase
          .from('navigation_items')
          .select('*')
          .eq('is_active', true)
          .order('order_index');

        if (navError) {
          console.warn('Navigation table not found, using defaults:', navError);
          // Use default navigation items if table doesn't exist
          setNavigationItems(defaultNavigationItems);
          setSiteConfig({});
          setLoading(false);
          return;
        }

        // Try to fetch site configuration
        const { data: configData, error: configError } = await supabase
          .from('site_config')
          .select('key, value');

        if (configError) {
          console.warn('Site config table not found:', configError);
        }

        // Transform config data - fix JSON parsing
        const config: SiteConfig = {};
        configData?.forEach((item) => {
          try {
            // Handle string values that are already strings
            const value = typeof item.value === 'string' ? item.value : String(item.value);
            config[item.key] = value.startsWith('"') ? JSON.parse(value) : value;
          } catch (e) {
            // If JSON parsing fails, use the raw value
            config[item.key] = String(item.value);
          }
        });

        setNavigationItems(navData && navData.length > 0 ? navData : defaultNavigationItems);
        setSiteConfig(config);
      } catch (err) {
        console.error('Error fetching navigation data:', err);
        // Use defaults on any error
        setNavigationItems(defaultNavigationItems);
        setSiteConfig({});
        setError(err instanceof Error ? err.message : 'Failed to fetch navigation data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    navigationItems,
    siteConfig,
    loading,
    error,
  };
};