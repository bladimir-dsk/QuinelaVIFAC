export default function Section({ id, title, children, className = "" }) {
  return (
    <section id={id} className={`py-16 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            <div className="inline-block relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-cyan-500 rounded-tl-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-2xl"></div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 mb-3 px-8">
                {title}
              </h2>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-12 h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-12 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
