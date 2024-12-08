import { CreditCard, PieChart, Users } from "lucide-react";
import { motion } from "framer-motion";

const FeatureSection = () => {
  return (
    <div className="space-y-20 mt-24 ">
      {/* Features Section */}
      <section className="py-10 bg-black text-gray-300">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-12 drop-shadow-lg">
            Why Choose <span className="text-yellow-300">TravelWise?</span>
          </h2>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FeatureCard
              icon={<Users className="h-12 w-12 text-yellow-400" />}
              title="Group Management"
              description="Add members easily, track individual expenses, and manage multiple trips simultaneously."
            />
            <FeatureCard
              icon={<PieChart className="h-12 w-12 text-yellow-400" />}
              title="Expense Analytics"
              description="Visualize spending patterns with interactive charts and detailed expense breakdowns."
            />
            <FeatureCard
              icon={<CreditCard className="h-12 w-12 text-yellow-400" />}
              title="Easy Settlements"
              description="Settle debts quickly with integrated payment solutions and real-time balance tracking."
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5 bg-black rounded-3xl">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-12 drop-shadow-lg">
            How It Works
          </h2>
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Step
              number={1}
              title="Create a Trip"
              description="Set up your trip with basic details and invite your travel companions."
            />
            <Step
              number={2}
              title="Add Expenses"
              description="Log expenses as you go, categorize them, and specify who paid."
            />
            <Step
              number={3}
              title="Track Balances"
              description="See who owes what in real-time with automatic calculations."
            />
            <Step
              number={4}
              title="Settle Up"
              description="Easily settle debts through integrated payment options."
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.05 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-yellow-300 mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="text-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-yellow-300 mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

export default FeatureSection;
