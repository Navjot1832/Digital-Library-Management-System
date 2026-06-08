function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function Avatar({ src, alt, className = '' }) {
  if (src) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <div
      aria-label={alt}
      className={`flex items-center justify-center bg-brand-100 font-semibold text-brand-700 ${className}`}
    >
      {getInitials(alt)}
    </div>
  );
}

export default Avatar;
