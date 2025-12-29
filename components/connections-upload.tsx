"use client"

import { Upload, Loader2 } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { trackFileUpload } from "@/lib/analytics"

interface ConnectionsUploadProps {
    file: File | null
    onFileChange: (file: File) => void
    uploading?: boolean
    showFilePreview?: boolean
    hasConnections?: boolean
    connectionsCount?: number
    usingSavedConnections?: boolean
    show?: boolean
    className?: string
}

/**
 * File upload component for LinkedIn connections CSV
 * Supports both preview mode (main page) and immediate processing mode (profile page)
 */
export function ConnectionsUpload({
    file,
    onFileChange,
    uploading = false,
    showFilePreview = true,
    hasConnections = false,
    connectionsCount,
    usingSavedConnections = false,
    show = true,
    className = "",
}: ConnectionsUploadProps) {
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0 && !uploading) {
            const newFile = acceptedFiles[0]
            onFileChange(newFile)
            trackFileUpload(newFile.name)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [".csv"],
        },
        maxFiles: 1,
        disabled: uploading,
    })

    if (!show) {
        return null
    }

    return (
        <div className={`mb-6 ${className}`}>
            <label className="flex items-center gap-2 text-slate-300 mb-3 text-lg font-medium">
                <Upload className="w-5 h-5 text-purple-400" />
                LinkedIn Connections
                {hasConnections && connectionsCount !== undefined && (
                    <span className="ml-2 text-xs text-green-400 font-normal">
                        (Loaded: {connectionsCount} connections
                        {usingSavedConnections && " - from saved"}
                        {!usingSavedConnections && file && " - from new upload"}
                        )
                    </span>
                )}
            </label>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${isDragActive
                    ? "border-purple-500 bg-purple-950/20"
                    : "border-slate-700 hover:border-slate-600 bg-slate-900/30"
                    } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <input {...getInputProps()} disabled={uploading} />
                {uploading ? (
                    <div className="space-y-2">
                        <Loader2 className="w-12 h-12 mx-auto text-purple-400 animate-spin" />
                        <p className="text-slate-300 font-medium">Uploading and processing...</p>
                    </div>
                ) : showFilePreview && file ? (
                    <div className="space-y-2">
                        <Upload className="w-12 h-12 mx-auto text-purple-400" />
                        <p className="text-slate-200 font-medium">{file.name}</p>
                        <p className="text-sm text-slate-400">Click or drag to replace</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Upload className="w-12 h-12 mx-auto text-slate-500" />
                        <div>
                            <p className="text-slate-300 font-medium mb-1">
                                {isDragActive
                                    ? "Drop your CSV file here"
                                    : "Drag & drop your Connections.csv file"}
                            </p>
                            <p className="text-sm text-slate-500">or click to browse</p>
                        </div>
                        <p className="text-xs text-slate-600 mt-4">
                            Expected format: First Name, Last Name, Company, Position, Connected On
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
