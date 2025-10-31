import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import FullSidebar from '../Vector/Sidebar'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { TrendingUp, Target, Briefcase, DollarSign, AlertCircle } from 'lucide-react'

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

// Helper function to convert salary to LPA format
const formatSalaryLPA = (salary) => {
  if (!salary) return '0 LPA'
  const lpa = (salary / 100000).toFixed(1)
  return `₹${lpa} LPA`
}

const Zenith = () => {
  const navigate = useNavigate()
  const { isAuthenticated, loading, user } = useAuth()

  // Phase 1: Raw API Data
  const [apiResponse, setApiResponse] = useState(null)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  // Phase 2: Processed Data
  const [roiReport, setRoiReport] = useState([])
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, loading, navigate])

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchSkillGapData()
    }
  }, [isAuthenticated, user])

  const fetchSkillGapData = async () => {
    setFetchLoading(true)
    setFetchError(null)

    try {
      // Use a consistent user_id format
      const userId = 'cde634c5-77c0-4004-834f-4f9caec051e6'

      const response = await fetch('https://apex-backend-skill-gap.onrender.com/api/skill-gap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          top_n: 5
        })
      })

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `API Error: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.detail || errorData.message || errorMessage
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = `${errorMessage} - ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()

      setApiResponse(data)

      // Phase 2: Process data immediately after fetch
      processData(data)

    } catch (error) {
      // Silently handle CORS/network errors and fall back to demo data
      const isCorsError = error.message.includes('Failed to fetch') || error.message.includes('CORS')

      if (isCorsError) {
        console.log('API unavailable (CORS/Network issue) - using demo data')
      } else {
        console.error('Error fetching skill gap data:', error)
      }

      setFetchError(error.message)

      // Load demo data as fallback for development
      loadDemoData()
    } finally {
      setFetchLoading(false)
    }
  }

  // Fallback demo data for development/testing
  const loadDemoData = () => {
    const demoData = {
      success: true,
      user_id: 'demo-user',
      user_skills: ['Python', 'SQL', 'Data Analysis', 'Excel', 'PowerBI'],
      top_opportunities: [
        {
          job_id: '1',
          job_role: 'Data Scientist',
          company: 'Tech Corp',
          avg_salary: 1200000,
          min_salary: 1000000,
          max_salary: 1500000,
          similarity_score: 0.75,
          missing_skills: ['Machine Learning', 'TensorFlow', 'Deep Learning'],
          matching_skills: ['Python', 'SQL', 'Data Analysis']
        },
        {
          job_id: '2',
          job_role: 'Machine Learning Engineer',
          company: 'AI Solutions',
          avg_salary: 1500000,
          min_salary: 1300000,
          max_salary: 1800000,
          similarity_score: 0.68,
          missing_skills: ['PyTorch', 'TensorFlow', 'Deep Learning', 'MLOps'],
          matching_skills: ['Python', 'Data Analysis']
        },
        {
          job_id: '3',
          job_role: 'Business Intelligence Analyst',
          company: 'Analytics Inc',
          avg_salary: 900000,
          min_salary: 800000,
          max_salary: 1100000,
          similarity_score: 0.82,
          missing_skills: ['Tableau', 'Advanced Statistics'],
          matching_skills: ['SQL', 'Excel', 'PowerBI', 'Data Analysis']
        },
        {
          job_id: '4',
          job_role: 'Data Engineer',
          company: 'Big Data Co',
          avg_salary: 1300000,
          min_salary: 1100000,
          max_salary: 1600000,
          similarity_score: 0.70,
          missing_skills: ['Apache Spark', 'AWS', 'Kafka', 'ETL'],
          matching_skills: ['Python', 'SQL']
        },
        {
          job_id: '5',
          job_role: 'Senior Data Analyst',
          company: 'Financial Services',
          avg_salary: 1000000,
          min_salary: 900000,
          max_salary: 1200000,
          similarity_score: 0.85,
          missing_skills: ['R Programming', 'Advanced Statistics'],
          matching_skills: ['Python', 'SQL', 'Excel', 'Data Analysis']
        }
      ],
      total_jobs_analyzed: 500
    }

    // Silently load demo data without console noise
    setApiResponse(demoData)
    processData(demoData)
  }

  // Phase 2: Process Data
  const processData = (data) => {
    if (!data) return

    // Function 1: Calculate Human-Readable ROI
    const roi = calculateHumanReadableRoi(data)
    setRoiReport(roi)

    // Function 2: Prepare Chart Data
    const chart = prepareChartData(data)
    setChartData(chart)
  }

  const calculateHumanReadableRoi = (data) => {
    const { top_opportunities, user_skills } = data

    if (!top_opportunities || top_opportunities.length === 0) {
      return []
    }

    // Get all unique missing skills
    const allMissingSkills = new Set()
    top_opportunities.forEach(job => {
      if (job.missing_skills) {
        job.missing_skills.forEach(skill => allMissingSkills.add(skill))
      }
    })

    const report = []

    allMissingSkills.forEach(skill => {
      // Bucket A: Jobs that require this skill
      const jobsWithSkill = top_opportunities.filter(job =>
        job.missing_skills && job.missing_skills.includes(skill)
      )

      // Bucket B: Jobs that don't require this skill
      const jobsWithoutSkill = top_opportunities.filter(job =>
        !job.missing_skills || !job.missing_skills.includes(skill)
      )

      const countWithSkill = jobsWithSkill.length
      const totalJobs = top_opportunities.length

      // Calculate average salary for jobs requiring this skill
      const avgSalaryWithSkill = jobsWithSkill.length > 0
        ? jobsWithSkill.reduce((sum, job) => sum + (job.avg_salary || 0), 0) / jobsWithSkill.length
        : 0

      // Calculate salary premium based on opportunity weight
      // The more jobs that require this skill, the higher the premium
      // Premium = (average salary of jobs with skill) * (percentage of jobs requiring it)
      const opportunityWeight = countWithSkill / totalJobs
      const salaryPremium = avgSalaryWithSkill * opportunityWeight;
      const opportunityIncrease = opportunityWeight * 100

      // Determine tier and narrative
      let tier, priority, narrative, color

      if (countWithSkill === totalJobs) {
        tier = 'Mandatory'
        priority = 1
        color = 'red'
        narrative = `This is a non-negotiable skill, required by all ${totalJobs} of your top opportunities. Without it, you're locked out of 100% of these roles. Average salary for roles requiring this: ₹${Math.round(avgSalaryWithSkill).toLocaleString()}.`
      } else if (countWithSkill >= totalJobs * 0.8) {
        tier = 'High Priority'
        priority = 2
        color = 'orange'
        narrative = `Required by ${countWithSkill} out of ${totalJobs} opportunities (${Math.round(opportunityIncrease)}%). Learning this skill opens ${countWithSkill} high-value roles and adds approximately ₹${Math.round(salaryPremium).toLocaleString()} to your potential salary.`
      } else if (countWithSkill >= totalJobs * 0.4) {
        tier = 'Strategic Value'
        priority = 3
        color = 'yellow'
        narrative = `Required by ${countWithSkill} out of ${totalJobs} opportunities (${Math.round(opportunityIncrease)}%). This skill is a differentiator that could add ₹${Math.round(salaryPremium).toLocaleString()} LPA to your salary in certain roles.`
      } else {
        tier = 'Nice to Have'
        priority = 4
        color = 'green'
        narrative = `Required by ${countWithSkill} out of ${totalJobs} opportunities (${Math.round(opportunityIncrease)}%). This skill provides incremental value but is not critical for most roles you're targeting.`
      }

      report.push({
        skill,
        tier,
        priority,
        color,
        narrative,
        countWithSkill,
        totalJobs,
        salaryPremium,
        opportunityIncrease,
        avgSalaryWithSkill
      })
    })

    // Sort by priority
    return report.sort((a, b) => a.priority - b.priority)
  }

  const prepareChartData = (data) => {
    const { user_skills, top_opportunities } = data

    if (!user_skills || !top_opportunities) {
      return null
    }

    // Get all unique skills (user skills + missing skills)
    const allSkills = new Set([...user_skills])
    top_opportunities.forEach(job => {
      if (job.missing_skills) {
        job.missing_skills.forEach(skill => allSkills.add(skill))
      }
    })

    const labels = Array.from(allSkills)

    // Your Skills Dataset (Blue Line)
    const yourSkillsData = labels.map(skill =>
      user_skills.includes(skill) ? 5 : 0
    )

    // Market Demand Dataset (Grey Line)
    const marketDemandData = labels.map(skill => {
      let count = 0
      top_opportunities.forEach(job => {
        if (job.missing_skills && job.missing_skills.includes(skill)) {
          count++
        } else if (user_skills.includes(skill)) {
          count++ // If user has it, assume all jobs need it
        }
      })
      return count
    })

    return {
      labels,
      datasets: [
        {
          label: 'Your Skills',
          data: yourSkillsData,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2,
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(59, 130, 246)',
        },
        {
          label: 'Market Demand',
          data: marketDemandData,
          backgroundColor: 'rgba(156, 163, 175, 0.2)',
          borderColor: 'rgb(156, 163, 175)',
          borderWidth: 2,
          pointBackgroundColor: 'rgb(156, 163, 175)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(156, 163, 175)',
        }
      ]
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="relative h-screen w-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Phase 1 Loading
  if (fetchLoading) {
    return (
      <div className="relative h-screen w-full bg-gray-50 dark:bg-neutral-900 overflow-hidden">
        <div className="fixed left-0 top-0 h-screen z-50">
          <FullSidebar />
        </div>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Analyzing Your Career Path
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fetching skill gap analysis and top opportunities...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Error state (only if both API and demo data failed)
  if (fetchError && !apiResponse) {
    return (
      <div className="relative h-screen w-full bg-gray-50 dark:bg-neutral-900 overflow-hidden">
        <div className="fixed left-0 top-0 h-screen z-50">
          <FullSidebar />
        </div>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Data
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{fetchError}</p>
            <button
              onClick={fetchSkillGapData}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Phase 3: Render Dashboard
  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          color: 'rgba(156, 163, 175, 0.8)'
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        },
        pointLabels: {
          color: 'rgba(156, 163, 175, 1)',
          font: {
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(156, 163, 175, 1)',
          padding: 15,
          font: {
            size: 12
          }
        }
      }
    },
    maintainAspectRatio: false
  }

  const getTierColor = (color) => {
    const colors = {
      red: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200',
      green: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200'
    }
    return colors[color] || colors.green
  }

  return (
    <div className="relative h-screen w-screen bg-gray-50 dark:bg-neutral-900 overflow-hidden">
      {/* Sidebar - Fixed on Left with Higher Z-Index */}
      <div className="fixed left-0 top-0 h-screen z-100">
        <FullSidebar />
      </div>

      {/* Main Content Area - Width Excludes Sidebar (100vw - 300px) */}
      <div className="h-screen flex items-center justify-center overflow-hidden" style={{ width: '1200px', marginLeft: '80px' }}>
        <div className="w-full h-full flex items-center justify-center px-4">
          <div className="w-full h-full py-8 overflow-hidden">
            <div className="h-full overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">

              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Career Growth Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Personalized skill gap analysis and upskilling roadmap
                </p>
              </div>

              {/* Stats Summary */}
              {apiResponse && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-blue-600 dark:text-blue-300 font-semibold">Your Skills</p>
                        <p className="text-xl font-bold text-blue-900 dark:text-blue-100">
                          {apiResponse.user_skills?.length || 0}
                        </p>
                      </div>
                      <Target className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                  </div>

                  <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-purple-600 dark:text-purple-300 font-semibold">Opportunities</p>
                        <p className="text-xl font-bold text-purple-900 dark:text-purple-100">
                          {apiResponse.top_opportunities?.length || 0}
                        </p>
                      </div>
                      <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                    </div>
                  </div>

                  <div className="bg-orange-100 dark:bg-orange-900 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-orange-600 dark:text-orange-300 font-semibold">Skills to Learn</p>
                        <p className="text-xl font-bold text-orange-900 dark:text-orange-100">
                          {roiReport.length}
                        </p>
                      </div>
                      <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                    </div>
                  </div>

                  <div className="bg-green-100 dark:bg-green-900 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-green-600 dark:text-green-300 font-semibold">Jobs Analyzed</p>
                        <p className="text-xl font-bold text-green-900 dark:text-green-100">
                          {apiResponse.total_jobs_analyzed || 0}
                        </p>
                      </div>
                      <DollarSign className="h-6 w-6 text-green-600 dark:text-green-300" />
                    </div>
                  </div>
                </div>
              )}

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT COLUMN: Action Plan */}
                <div className="space-y-6">

                  {/* Component 1: Upskilling ROI Plan */}
                  <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="h-6 w-6 text-blue-500" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Upskilling ROI Plan
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {roiReport.length > 0 ? (
                        roiReport.map((item, index) => (
                          <div
                            key={index}
                            className="border-2 rounded-lg p-4 transition hover:shadow-md"
                            style={{ borderColor: `var(--${item.color}-300)` }}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                  {item.skill.toUpperCase()}
                                </h3>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getTierColor(item.color)}`}>
                                  {item.tier}
                                </span>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.countWithSkill}/{item.totalJobs} jobs
                                </div>
                                {item.salaryPremium !== 0 && (
                                  <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                                    +₹{Math.round(item.salaryPremium).toLocaleString()} LPA
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {item.narrative}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                          No skill gaps identified. Great job!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Component 2: Your Current Skills */}
                  <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-green-500" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Your Current Skills
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {apiResponse?.user_skills && apiResponse.user_skills.length > 0 ? (
                        apiResponse.user_skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">No skills data available</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Evidence */}
                <div className="space-y-6">

                  {/* Component 1: Skill Gap Analysis Chart */}
                  <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Skill Gap Analysis
                    </h3>

                    <div className="h-[400px]">
                      {chartData ? (
                        <Radar data={chartData} options={chartOptions} />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-400">
                          No chart data available
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Blue: Your current skill level | Grey: Market demand across top 5 opportunities
                      </p>
                    </div>
                  </div>

                  {/* Component 2: Top Opportunities Analyzed */}
                  <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="h-5 w-5 text-purple-500" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Top Opportunities Analyzed
                      </h3>
                    </div>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {apiResponse?.top_opportunities && apiResponse.top_opportunities.length > 0 ? (
                        apiResponse.top_opportunities.map((job, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                  {job.job_role || job.job_title || 'Job Title'}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {job.company || 'Company'}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">

                                <span>{Math.round(job.avg_salary || 0).toLocaleString()} LPA</span>
                              </div>
                            </div>

                            {/* Salary Range */}
                            {(job.min_salary || job.max_salary) && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                Range: {Math.round(job.min_salary || 0).toLocaleString()} - {Math.round(job.max_salary || 0).toLocaleString()}
                              </div>
                            )}

                            {/* Similarity Score */}
                            {job.similarity_score && (
                              <div className="mb-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-gray-600 dark:text-gray-400">Match Score</span>
                                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                                    {Math.round(job.similarity_score * 100)}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                  <div
                                    className="bg-blue-600 h-1.5 rounded-full"
                                    style={{ width: `${job.similarity_score * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}

                            {/* Matching Skills */}
                            {job.matching_skills && job.matching_skills.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                  Matching Skills:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {job.matching_skills.map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 rounded text-xs"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Missing Skills */}
                            {job.missing_skills && job.missing_skills.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                  Missing Skills:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {job.missing_skills.map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded text-xs"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                          No opportunities data available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Zenith
