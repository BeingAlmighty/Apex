import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useImageUpload } from "../../hooks/use-image-upload"
import { ImagePlus, X, Upload, Trash2 } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "../../lib/utils"
import api from "../../api/client"

export default function ResumeUploader() {
  const {
    previewUrl,
    fileName,
    fileInputRef,
    file,
    extractedText,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload({
    onUpload: (payload) => {
      console.log("onUpload payload:", payload)
    },
  })

  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)

  const submitUpload = async () => {
    setError(null)
    setAnalysis(null)
    const currentFile = file
    if (!currentFile) {
      setError('No file selected')
      return
    }

    const fd = new FormData()
    fd.append('file', currentFile)
    if (extractedText) {
      fd.append('extracted_text', extractedText)
    }

    try {
      setLoading(true)
      const res = await api.analyzeResume(fd)
      setAnalysis(res)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const f = e.dataTransfer.files?.[0]
      if (f) {
        const fakeEvent = { target: { files: [f] } }
        handleFileChange(fakeEvent)
      }
    },
    [handleFileChange],
  )

  return (
    <div className="w-full max-w-xl space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Upload Resume</h3>
        <p className="text-sm text-muted-foreground">Supported formats: PDF, DOCX, JPG, PNG</p>
      </div>

      <Input
        type="file"
        accept="image/*,application/pdf,.pdf,.doc,.docx"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {!previewUrl ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",
            isDragging && "border-primary/50 bg-primary/5",
          )}
        >
          <div className="rounded-full bg-background p-3 shadow-sm">
            <ImagePlus className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Click to select</p>
            <p className="text-xs text-muted-foreground">or drag and drop file here</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="group relative h-64 overflow-hidden rounded-lg border">
            {file?.type === 'application/pdf' ? (
              <object data={previewUrl} type="application/pdf" width="100%" height="100%">
                <p>Preview not available. Download the file to view.</p>
              </object>
            ) : (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}

            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button size="sm" variant="secondary" onClick={handleThumbnailClick} className="h-9 w-9 p-0">
                <Upload className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={handleRemove} className="h-9 w-9 p-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {fileName && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{fileName}</span>
              <button onClick={handleRemove} className="ml-auto rounded-full p-1 hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button onClick={submitUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Resume'}
        </Button>
        <Button variant="ghost" onClick={handleRemove}>Remove</Button>
      </div>

      {error && <div className="text-destructive">{error}</div>}

      {analysis && (
        <div className="mt-4 rounded-md border p-4">
          <h4 className="font-medium">Analysis Result</h4>
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(analysis, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
