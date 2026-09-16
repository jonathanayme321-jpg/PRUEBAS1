import { useState, useEffect } from 'react';
import { Globe, Calendar as CalendarIcon, Image, Hash, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useCalendar } from '../../hooks/useCalendar';
import { formatDateKey } from '../../utils/dateUtils';

export function AddLinkModal() {
  const { isModalOpen, closeModal, modalDate, modalTime, editingLink, saveLink, categories } =
    useCalendar();

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [chapter, setChapter] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Lectura');
  const [error, setError] = useState('');

  // Sincronizar formulario al abrir
  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title || '');
      setUrl(editingLink.url || '');
      setCoverImage(editingLink.coverImage || '');
      setChapter(editingLink.chapter || '');
      setDate(editingLink.date || formatDateKey(new Date()));
      setCategory(editingLink.category || 'Lectura');
    } else {
      setTitle('');
      setUrl('');
      setCoverImage('');
      setChapter('');
      setDate(modalDate || formatDateKey(new Date()));
      setCategory('Lectura');
    }
    setError('');
  }, [editingLink, modalDate, modalTime, isModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Ingresa la URL del enlace');
      return;
    }

    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    const finalTitle = title.trim() || finalUrl;

    saveLink({
      title: finalTitle,
      url: finalUrl,
      coverImage: coverImage.trim(),
      chapter: chapter.trim(),
      date: date || formatDateKey(new Date()),
      category: category || 'Lectura',
    });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={editingLink ? 'Editar Entrada' : 'Agregar Manga / Página Web'}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {error && (
          <div className="p-2.5 text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800">
            {error}
          </div>
        )}

        {/* URL */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            Enlace / URL *
          </label>
          <input
            type="text"
            required
            placeholder="https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Título */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Título
          </label>
          <input
            type="text"
            placeholder="ej. Wistoria: Wand And Sword"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Imagen de Portada & Capítulo */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5" />
              URL de Portada
            </label>
            <input
              type="text"
              placeholder="https://...imagen.jpg"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5" />
              Capítulo
            </label>
            <input
              type="text"
              placeholder="ej. 81"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-bold"
            />
          </div>
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            Fecha
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="ghost" size="sm" onClick={closeModal}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Guardar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
