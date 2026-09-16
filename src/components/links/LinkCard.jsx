import { useState } from 'react';
import { ExternalLink, Trash2, Edit3, CheckCircle2, Globe } from 'lucide-react';
import { formatFriendlyDate } from '../../utils/dateUtils';

export function LinkCard({
  link,
  onEdit,
  onDelete,
  onToggleVisited,
  showDate = false,
}) {
  const [imgError, setImgError] = useState(false);

  // Extraer dominio para fallback o favicon
  let domain = '';
  try {
    const urlObj = new URL(link.url.startsWith('http') ? link.url : `https://${link.url}`);
    domain = urlObj.hostname.replace('www.', '');
  } catch {
    domain = link.url;
  }

  // Favicon usando Google s2 service
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;

  // Número o etiqueta en la esquina superior izquierda (igual que 81, 44, 77 en la captura)
  const badgeText =
    link.chapter ||
    (link.date ? link.date.split('-')[2] : '1');

  // Imagen de portada o fallback
  const hasCover = Boolean(link.coverImage) && !imgError;

  return (
    <div
      onClick={() => {
        window.open(link.url.startsWith('http') ? link.url : `https://${link.url}`, '_blank', 'noopener,noreferrer');
      }}
      className={`group relative aspect-[2/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
        link.visited ? 'opacity-75 grayscale-[20%]' : ''
      }`}
    >
      {/* 1. IMAGEN DE PORTADA O FONDO ESTILO MANGA/ANIME */}
      {hasCover ? (
        <img
          src={link.coverImage}
          alt={link.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 border border-white/10 group-hover:scale-110 transition-transform">
            <img
              src={faviconUrl}
              alt=""
              className="w-6 h-6 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <span className="text-[11px] font-medium text-slate-400 truncate max-w-full px-2">
            {domain}
          </span>
        </div>
      )}

      {/* 2. BADGE SUPERIOR IZQUIERDO (Estilo Tachiyomi: 81, 44, 77...) */}
      <div className="relative z-10 p-2 flex items-start justify-between">
        <span
          title={`Capítulo o Fecha: ${badgeText}`}
          className="px-2 py-0.5 rounded-lg text-xs font-black tracking-wide bg-blue-600 text-white shadow-md shadow-black/40"
        >
          {badgeText}
        </span>

        {/* Botones de acción compactos con iconos limpios */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md rounded-xl p-1"
        >
          <button
            type="button"
            onClick={() => onToggleVisited(link.id)}
            title={link.visited ? 'Marcar no leído' : 'Marcar leído'}
            className={`p-1 rounded-lg transition-colors cursor-pointer ${
              link.visited ? 'text-emerald-400' : 'text-white/80 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onEdit(link)}
            title="Editar"
            className="p-1 text-white/80 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(link.id)}
            title="Eliminar"
            className="p-1 text-rose-400 hover:text-rose-300 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. DEGRADADO INFERIOR CON TÍTULO LIMPIO (Estilo portada anime/manga) */}
      <div className="relative z-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-10 pb-2.5 px-2.5">
        <h3
          className={`text-xs sm:text-sm font-semibold text-white line-clamp-2 leading-snug drop-shadow-sm ${
            link.visited ? 'line-through text-slate-300' : ''
          }`}
          title={link.title}
        >
          {link.title}
        </h3>

        {/* Fecha o notas mínimas si se solicita */}
        {showDate && link.date && (
          <p className="text-[10px] text-slate-400 mt-0.5 truncate">
            {formatFriendlyDate(link.date)}
          </p>
        )}
      </div>
    </div>
  );
}
