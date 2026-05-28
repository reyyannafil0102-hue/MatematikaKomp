import GlassCard from '@/components/ui/GlassCard'
import FormulaBlock from '@/components/ui/FormulaBlock'
import { Printer, BookMarked } from 'lucide-react'

const summaryCards = [
  {
    title: 'Definisi',
    formula: '(f \\circ g)(x) = f(g(x))',
    description: 'Output g menjadi input f. Proses dari dalam ke luar.',
  },
  {
    title: 'Urutan Berbeda',
    formula: '(g \\circ f)(x) = g(f(x))',
    description: 'Output f menjadi input g. Hasilnya umumnya berbeda.',
  },
  {
    title: 'Domain',
    formula: 'D_{f \\circ g} = \\{x \\in D_g \\mid g(x) \\in D_f\\}',
    description: 'x harus di domain g, dan g(x) harus di domain f.',
  },
  {
    title: 'Tidak Komutatif',
    formula: 'f \\circ g \\neq g \\circ f',
    description: 'Urutan komposisi sangat berpengaruh pada hasil.',
  },
  {
    title: 'Asosiatif',
    formula: 'f \\circ (g \\circ h) = (f \\circ g) \\circ h',
    description: 'Pengelompokan tidak mempengaruhi hasil akhir.',
  },
  {
    title: 'Fungsi Invers',
    formula: 'f \\circ f^{-1} = f^{-1} \\circ f = I',
    description: 'Komposisi dengan invers menghasilkan fungsi identitas.',
  },
]

export default function RangkumanSection() {
  return (
    <section id="rangkuman" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <BookMarked size={16} className="text-gray-400" />
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Ringkasan Materi</p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Rangkuman Fungsi Komposisi
          </h2>
          <p className="text-gray-500 max-w-xl mb-6">
            Semua konsep penting dalam satu halaman. Simpan atau cetak untuk belajar.
          </p>
          <button
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all text-sm font-medium"
          >
            <Printer size={16} />
            Print / Simpan PDF
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {summaryCards.map((card, i) => (
            <GlassCard key={i} hover={false}>
              <h3 className="font-bold text-gray-900 mb-3">{card.title}</h3>
              <div className="p-3 rounded-lg bg-gray-900 text-white mb-3 overflow-x-auto">
                <FormulaBlock math={card.formula} display size="sm" />
              </div>
              <p className="text-sm text-gray-500">{card.description}</p>
            </GlassCard>
          ))}
        </div>

        {/* Quick reference table */}
        <div className="mt-10">
          <GlassCard hover={false}>
            <h3 className="font-bold text-gray-900 mb-4">Tabel Referensi Cepat</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-gray-500 font-semibold">Konsep</th>
                    <th className="text-left py-2 pr-4 text-gray-500 font-semibold">Notasi</th>
                    <th className="text-left py-2 text-gray-500 font-semibold">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { concept: 'f komposisi g', notation: '(f ∘ g)(x)', note: 'Masukkan x ke g, hasilnya ke f' },
                    { concept: 'g komposisi f', notation: '(g ∘ f)(x)', note: 'Masukkan x ke f, hasilnya ke g' },
                    { concept: 'Domain komposisi', notation: 'D(f∘g)', note: 'Irisan syarat domain g dan f' },
                    { concept: 'Sifat komutatif', notation: 'f∘g ≠ g∘f', note: 'Umumnya tidak sama' },
                    { concept: 'Sifat asosiatif', notation: 'f∘(g∘h) = (f∘g)∘h', note: 'Pengelompokan bebas' },
                    { concept: 'Fungsi identitas', notation: 'f∘I = I∘f = f', note: 'I(x) = x tidak mengubah fungsi' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="py-2.5 pr-4 text-gray-800 font-medium">{row.concept}</td>
                      <td className="py-2.5 pr-4 text-gray-600 font-mono text-xs">{row.notation}</td>
                      <td className="py-2.5 text-gray-500">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
