import React from 'react'
import ResumeUploader from '../Vector/Resume'

const ResumeAnalysis = () => {
  return (
    <div className="p-6 flex justify-center flex-col items-center">
      <h2 className="text-4xl font-semibold mb-4">Resume Analysis</h2>
      <ResumeUploader />
    </div>
  )
}

export default ResumeAnalysis