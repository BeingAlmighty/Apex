import React from 'react'
import { motion } from 'framer-motion'
import { Calculator, Brain, Network, BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Features = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/vector')
    } else {
      navigate('/login')
    }
  }

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
        className="absolute top-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
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
        className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
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
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          {/* Section Label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-1 bg-orange-500"></div>
            <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm">Revolutionary Features</span>
            <div className="w-12 h-1 bg-orange-500"></div>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4 leading-tight">
            Revolutionary Features That
            <br />
            <span className="text-orange-500">Set You Apart</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transform your career decisions into strategic investments with our data-driven tools
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          
          {/* Feature 1: Upskilling ROI Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative p-8 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 group"
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-orange-500/10 mb-6">
                <Calculator className="text-orange-500" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                Upskilling ROI Calculator
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Don't just learn, <span className="text-orange-500 font-semibold">invest</span>. Our calculator quantifies the exact financial gains from learning any new skill, turning your career into a data-driven investment.
              </p>
            </div>
          </motion.div>

          {/* Feature 2: AI-Powered Skill Gap Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-8 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 group"
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-orange-500/10 mb-6">
                <Brain className="text-orange-500" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                AI-Powered Skill Gap Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our AI automatically detects your missing competencies for any target role by parsing your resume and comparing it against <span className="text-orange-500 font-semibold">real market intelligence</span>.
              </p>
            </div>
          </motion.div>

          {/* Feature 3: Skill Adjacency Engine */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative p-8 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 group"
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-orange-500/10 mb-6">
                <Network className="text-orange-500" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                Skill Adjacency Engine
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Not sure what to learn next? Our engine suggests the most strategic skills based on your current expertise to maximize your career's <span className="text-orange-500 font-semibold">growth velocity</span>.
              </p>
            </div>
          </motion.div>

          {/* Feature 4: Interactive Visualizations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative p-8 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 group"
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-orange-500/10 mb-6">
                <BarChart3 className="text-orange-500" size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                Interactive Visualizations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                See your entire career path with <span className="text-orange-500 font-semibold">crystal clarity</span>. Get real-time dashboards for skill gaps, ROI projections, and personalized job recommendations.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Ready to transform your career with data-driven decisions?
          </p>
          <motion.button
            className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-lg font-bold cursor-pointer transition-colors shadow-lg"
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
          >
            Get Started Today →
          </motion.button>
        </motion.div>

      </div>
    </div>
  )
}

export default Features
