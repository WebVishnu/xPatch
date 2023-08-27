import FormSection from "@/components/FormSection"

export default function Home() {
  return (
    <main className="flex justify-center h-screen w-screen items-center">
      <div className="absolute top-10 left-12 bg-white w-[60vh] h-[60vh] rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-50 blur-[140px]"></div>
      <FormSection />
    </main>
  )
}
