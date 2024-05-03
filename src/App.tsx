import { useState } from "react"
import { Loading } from "./components/Loading"

export default function App() {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState<any>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleConvert = async () => {
        setLoading(true)
        const formData = new FormData()

        formData.append("docx", file as any)

        const res = await fetch(import.meta.env.VITE_API_URL, {
            method: "POST",
            body: formData,
        })

        const blob = new Blob([await res.blob()], { type: "application/pdf" })
        const url = URL.createObjectURL(blob)

        setUrl(url)
        setLoading(false)
    }

    return (
        <main className="grid min-h-screen place-items-center bg-slate-700 p-24 text-slate-50">
            {loading ? (
                <Loading />
            ) : url ? (
                <div className="w-full">
                    <iframe src={url} className="h-[50rem] w-full"></iframe>

                    <button
                        className="mx-auto mt-4 block w-1/4 rounded bg-blue-700 px-4 py-2 font-bold text-slate-50"
                        onClick={() => setUrl(null)}
                    >
                        Convert again
                    </button>
                </div>
            ) : (
                <div>
                    <h1 className="text-4xl font-bold">
                        DOCX to PDF Converter
                    </h1>

                    <input
                        className="mt-8"
                        type="file"
                        name="file"
                        accept=".docx"
                        onChange={handleFileChange}
                    />

                    <button
                        className="mt-4 block w-full rounded bg-blue-700 px-4 py-2 font-bold text-slate-50"
                        type="submit"
                        onClick={handleConvert}
                    >
                        Convert
                    </button>
                </div>
            )}
        </main>
    )
}
