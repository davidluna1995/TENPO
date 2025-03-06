import { useEffect } from 'react';
import * as bootstrap from 'bootstrap';

/**
 * Hook personalizado para inicializar tooltips de Bootstrap
 * Se encarga de crear y limpiar los tooltips automáticamente
 */
export const useTooltip = () => {
  useEffect(() => {
    // Inicializa todos los tooltips en el documento
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipInstances = Array.from(tooltipTriggerList).map(
      element => new bootstrap.Tooltip(element, {
        trigger: 'hover focus', // Activar en hover y focus
        placement: 'auto',      // Colocación automática
        html: false,            // No permitir HTML en el tooltip
        delay: {               // Configurar delays
          show: 200,
          hide: 100
        }
      })
    );

    // Limpia los tooltips cuando el componente se desmonta
    return () => {
      tooltipInstances.forEach(tooltip => {
        if (tooltip && typeof tooltip.dispose === 'function') {
          tooltip.dispose();
        }
      });
    };
  }, []);
};