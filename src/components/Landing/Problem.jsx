import React from 'react'
import { motion } from 'framer-motion'
import { XCircle, TrendingDown, Brain, TrendingUp, DollarSign } from 'lucide-react'

const Problem = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Orange Accent Elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* Problem Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-orange-500"></div>
            <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm">The Problem</span>
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-7xl font-bold dark:text-white text-black mb-8 leading-tight">
            The Critical Gap in<br />
            <span className="text-orange-500">
              Career Planning
            </span>
          </h2>

          {/* Problem Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {/* Main Problem Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative p-8 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10"
            >
              <div className="absolute top-4 right-4 text-gray-300 dark:text-gray-600 opacity-40">
                <XCircle size={48} />
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Generic Advice Overload</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                "Traditional career tools and influencers flood you with generic advice. They all fail to answer the most critical question: 'What is the actual financial return on learning a specific skill?'"
              </p>
            </motion.div>

            {/* Secondary Problem Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-8 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10"
            >
              <div className="absolute top-4 right-4 text-orange-300 dark:text-orange-600 opacity-40">
                <TrendingDown size={48} />
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Costly Mistakes</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                "This lack of transparency leads to costly mistakes—professionals invest time and money in skills without knowing the real ROI."
              </p>
            </motion.div>
          </div>

          {/* Problem Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">68%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Feel Lost in Career Planning</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">₹ 12K</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Average Wasted on Wrong Skills</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">3 Years</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Lost Career Growth Time</div>
            </div>
          </div>
        </motion.div>

        {/* Transition Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-32"
        >
        </motion.div>

        {/* Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-orange-500"></div>
            <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm">The Solution</span>
          </div>

          {/* Headline with Apex Logo */}
          <div className="mb-8">
            <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-4 leading-tight">
              Introducing{" "}
              <span className="relative inline-block">
                <span className="text-orange-500">
                  Apex
                </span>
                <motion.div
                  className="absolute -inset-2 bg-orange-500/20 blur-xl -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light">
              Your Data-Driven Navigator
            </p>
          </div>

          {/* Solution Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {/* Feature Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative p-8 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-gray-400/50 overflow-hidden"
            >
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="text-orange-500 mb-4">
                <Brain size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">AI-Powered Intelligence</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Advanced algorithms analyze real-time market data to provide personalized insights
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-8 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-gray-400/50 overflow-hidden"
            >
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <div className="text-orange-500 mb-4">
                <TrendingUp size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Personalized Growth Paths</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Custom roadmaps tailored to your unique skills and career goals
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative p-8 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-gray-400/50 overflow-hidden"
            >
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <div className="text-orange-500 mb-4">
                <DollarSign size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Crystal-Clear Projections</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                See exactly how each skill impacts your future earnings potential
              </p>
            </motion.div>
          </div>

          {/* Key Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 p-10 rounded-3xl bg-gray-100 dark:bg-white/5 border-2 border-gray-400/50 text-center"
          >
            <p className="text-2xl md:text-3xl text-black dark:text-white font-medium leading-relaxed">
              "Apex bridges this gap. We turn your career decisions into{" "}
              <span className="text-orange-500 font-bold">
                data-driven investments
              </span>
              . Using AI-powered intelligence and real-time market data, we provide personalized growth paths and crystal-clear projections on your future earnings."
            </p>
            <motion.div
              className="inline-block mt-8 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg cursor-pointer transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              No More Guesswork →
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Problem
