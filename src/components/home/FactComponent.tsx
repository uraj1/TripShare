export function FactComponent() {
  return (
    <section className="relative py-20 bg-black text-center">
      <div className="container mx-auto px-6">
        {/* Main Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Expense Management{" "}
          <span className="text-yellow-400 sm:text-4xl md:text-5xl">
            Made Easy
          </span>
        </h2>

        {/* Key Statistic */}
        <p className="text-xl sm:text-2xl font-medium text-gray-300 mb-6 sm:mb-10">
          "Over{" "}
          <span className="text-4xl sm:text-5xl font-extrabold text-yellow-400">
            1,000+
          </span>{" "}
          trips tracked and
          <span className="text-4xl sm:text-6xl font-extrabold text-yellow-400">
            {" "}
            300+
          </span>{" "}
          group expenses settled!"
        </p>

        {/* Secondary Tagline */}
        <p className="text-lg sm:text-lg italic text-gray-200 mb-4 max-w-2xl mx-auto">
          "Track every penny, split expenses, and enjoy stress-free travel
          planning."
        </p>

        {/* Divider Line */}
        <div className="w-16 sm:w-24 h-1 bg-yellow-400 mx-auto my-8 rounded"></div>
      </div>
      
    </section>
  );
}
