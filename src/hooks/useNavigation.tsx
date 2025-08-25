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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch navigation items
        const { data: navData, error: navError } = await supabase
          .from('navigation_items')
          .select('*')
          .eq('is_active', true)
          .order('order_index');

        if (navError) {
          throw navError;
        }

        // Fetch site configuration
        const { data: configData, error: configError } = await supabase
          .from('site_config')
          .select('key, value');

        if (configError) {
          throw configError;
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

        setNavigationItems(navData || []);
        setSiteConfig(config);
      } catch (err) {
        console.error('Error fetching navigation data:', err);
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