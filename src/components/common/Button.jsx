export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon: Icon = null,
  title = '',
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500 shadow-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700',
    secondary:
      'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 shadow-sm focus:ring-blue-400 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/50',
    danger:
      'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 focus:ring-rose-400 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800 dark:hover:bg-rose-900/50',
    ghost:
      'hover:bg-blue-50 text-blue-600 focus:ring-blue-300 dark:text-blue-400 dark:hover:bg-blue-950/50',
    outline:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/50',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
    icon: 'p-2 text-sm',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
}
