import { useCallback, useEffect, useRef, useState } from "react";

export function useImageUpload({ onUpload } = {}) {
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState(null);

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(async (event) => {
    const selected = event.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setFileName(selected.name);
    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);
    previewRef.current = url;

    // If PDF, try to extract text client-side using pdfjs-dist
    if (selected.type === "application/pdf") {
      try {
        // // dynamic import so other pages don't pay cost unless needed
        // const pdfjs = await import("pdfjs-dist/legacy/build/pdf");
        // // worker entry for bundlers
        // try {
        //   pdfjs.GlobalWorkerOptions.workerSrc =
        //     // vite + pdfjs recommends this entry
        //     "//unpkg.com/pdfjs-dist@3.11.172/legacy/build/pdf.worker.min.js";
        // } catch (e) {
        //   // ignore
        // }

        const arrayBuffer = await selected.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
  let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((s) => s.str).join(" ");
          text += `\n\n--- Page ${i} ---\n${pageText}`;
        }

        // persist extracted text in hook state and call onUpload with detailed object for PDF
        setExtractedText(text);
        onUpload?.({ url, file: selected, text });
      } catch (err) {
        // fallback: call onUpload with url and file
        setExtractedText(null);
        onUpload?.({ url, file: selected, text: null });
      }
    } else {
      // images and other files: call onUpload with url string for backwards compatibility
      onUpload?.(url);
    }
  }, [onUpload]);

  const handleRemove = useCallback(() => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
    }
    setPreviewUrl(null);
    setFileName(null);
  setFile(null);
  setExtractedText(null);
    previewRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  return {
    previewUrl,
    fileName,
    fileInputRef,
    file,
    extractedText,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  };
}