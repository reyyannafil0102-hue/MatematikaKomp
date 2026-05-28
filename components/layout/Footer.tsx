import { BookOpen } from 'lucide-react'

function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4) }
function smoothScrollTo(href: string) {
  const el = document.querySelector(href)
  if (!el) return
  const targetY = el.getBoundingClientRect().top + window.scrollY - 64
  const startY = window.scrollY
  const distance = targetY - startY
  const startTime = performance.now()
  function step(now: number) {
    const p = Math.min((now - startTime) / 900, 1)
    window.scrollTo(0, startY + distance * easeOutQuart(p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-10 mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-black text-gray-900">f ∘ g</span>
          </div>

          <p className="text-sm text-gray-400 text-center">
            Materi Fungsi Komposisi untuk SMA/SMK — Matematika Interaktif
          </p>

          <p className="text-sm text-gray-400">
            Dibuat oleh Reyyan Nafil Adiarsa, Kelas XI SIJA 1, SMK Negeri 7 Semarang
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-6 text-xs text-gray-400">
          {['Pengertian', 'Domain', 'Cara Hitung', 'Sifat', 'Grafik', 'Contoh Soal', 'Kuis'].map(item => (
            <button
              key={item}
              onClick={() => smoothScrollTo(`#${item.toLowerCase().replace(' ', '-')}`)}
              className="hover:text-gray-700 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}
