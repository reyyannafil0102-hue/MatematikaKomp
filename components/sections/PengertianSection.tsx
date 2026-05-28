'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import FormulaBlock from '@/components/ui/FormulaBlock'
import FunctionMachine from '@/components/ui/FunctionMachine'
import { ArrowRight } from 'lucide-react'

export default function PengertianSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pengertian" ref={ref} className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Konsep Dasar</p>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Apa itu Fungsi Komposisi?
          </h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Fungsi komposisi adalah operasi menggabungkan dua fungsi sehingga output satu fungsi menjadi input fungsi lainnya.
          </p>
        </motion.div>

        {/* Row 1: Definisi + Mesin */}
        <div className="grid lg:grid-cols-5 gap-8 items-start mb-8">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 space-y-4"
          >
            <GlassCard hover={false}>
              <h3 className="text-base font-bold text-gray-900 mb-3">Definisi Formal</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Diberikan dua fungsi <strong>f</strong> dan <strong>g</strong>.
                Fungsi komposisi <strong>f ∘ g</strong> didefinisikan sebagai fungsi yang memetakan
                setiap nilai x ke nilai <strong>f(g(x))</strong>.
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-xs text-gray-400 mb-1">Notasi f komposisi g:</p>
                  <FormulaBlock math="(f \circ g)(x) = f(g(x))" display size="md" />
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-xs text-gray-400 mb-1">Notasi g komposisi f:</p>
                  <FormulaBlock math="(g \circ f)(x) = g(f(x))" display size="md" />
                </div>
              </div>
            </GlassCard>

            <GlassCard hover={false}>
              <h3 className="text-sm font-bold text-gray-900 mb-3">Cara Membaca Notasi</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">—</span>
                  <p><FormulaBlock math="f \circ g" /> dibaca "f komposisi g" atau "f bundaran g"</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">—</span>
                  <p>Simbol <strong>∘</strong> disebut operator komposisi</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">—</span>
                  <p>Masukkan x ke <strong>g</strong> dulu, hasilnya masukkan ke <strong>f</strong></p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">—</span>
                  <p>Urutan sangat penting: <FormulaBlock math="f \circ g \neq g \circ f" /> umumnya</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <GlassCard hover={false}>
              <h3 className="text-base font-bold text-gray-900 mb-2">Mesin Fungsi Interaktif</h3>
              <p className="text-sm text-gray-500 mb-5">
                Masukkan nilai x dan lihat bagaimana komposisi <FormulaBlock math="(f \circ g)(x)" /> bekerja langkah demi langkah.
              </p>
              <FunctionMachine />
            </GlassCard>
          </motion.div>
        </div>

        {/* Row 2: Analogi + Contoh */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard hover={false}>
              <h3 className="text-base font-bold text-gray-900 mb-3">Analogi Sehari-hari</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Bayangkan dua mesin pabrik yang bekerja secara berurutan:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">g</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Mesin g — Penggiling</p>
                    <p className="text-xs text-gray-500">Mengubah gandum mentah menjadi tepung</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">f</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Mesin f — Pembuat Roti</p>
                    <p className="text-xs text-gray-500">Mengubah tepung menjadi roti</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900 text-white border border-gray-900">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm font-bold text-white">f∘g</div>
                  <div>
                    <p className="text-sm font-semibold text-white">Hasil (f∘g) — Gandum ke Roti</p>
                    <p className="text-xs text-gray-300">Komposisi kedua mesin menghasilkan roti dari gandum</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3 italic">
                Jika urutannya dibalik (f dulu, baru g), hasilnya berbeda.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard hover={false}>
              <h3 className="text-base font-bold text-gray-900 mb-3">Contoh Konkret</h3>
              <p className="text-gray-500 text-sm mb-4">
                Misalkan <FormulaBlock math="f(x) = 2x + 1" /> dan <FormulaBlock math="g(x) = x^2" />.
                Hitung <FormulaBlock math="(f \circ g)(3)" />:
              </p>
              <div className="space-y-3">
                {[
                  { step: '1', label: 'Hitung g(3) terlebih dahulu', formula: 'g(3) = 3^2 = 9' },
                  { step: '2', label: 'Masukkan hasil ke f', formula: 'f(g(3)) = f(9) = 2(9) + 1' },
                  { step: '3', label: 'Hasil akhir', formula: '(f \\circ g)(3) = 19' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                      <FormulaBlock math={item.formula} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Row 3: Syarat + Perbedaan */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <GlassCard hover={false}>
              <h3 className="text-base font-bold text-gray-900 mb-3">Syarat Komposisi Terdefinisi</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Agar <FormulaBlock math="(f \circ g)(x)" /> terdefinisi, dua syarat harus dipenuhi:
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Syarat 1</p>
                  <p className="text-sm text-gray-600">Nilai x harus berada dalam domain g, agar g(x) dapat dihitung.</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Syarat 2</p>
                  <p className="text-sm text-gray-600">Hasil g(x) harus berada dalam domain f, agar f(g(x)) dapat dihitung.</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-900 text-white border border-gray-900">
                  <p className="text-xs text-gray-300 mb-1">Kesimpulan:</p>
                  <FormulaBlock math="D_{f \circ g} = \{x \in D_g \mid g(x) \in D_f\}" display size="sm" />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlassCard hover={false}>
              <h3 className="text-base font-bold text-gray-900 mb-3">Perbedaan f∘g dan g∘f</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Dengan <FormulaBlock math="f(x) = 2x + 1" /> dan <FormulaBlock math="g(x) = x^2" />:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-xs text-gray-500 font-semibold mb-2">(f∘g)(x)</p>
                  <p className="text-xs text-gray-400 mb-2">g dulu, baru f</p>
                  <FormulaBlock math="f(g(x)) = f(x^2)" display size="sm" />
                  <FormulaBlock math="= 2x^2 + 1" display size="sm" />
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-xs text-gray-500 font-semibold mb-2">(g∘f)(x)</p>
                  <p className="text-xs text-gray-400 mb-2">f dulu, baru g</p>
                  <FormulaBlock math="g(f(x)) = g(2x+1)" display size="sm" />
                  <FormulaBlock math="= (2x+1)^2" display size="sm" />
                </div>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-gray-900 text-white border border-gray-900">
                <p className="text-xs text-gray-300 font-semibold mb-1">Kesimpulan</p>
                <p className="text-xs text-gray-400">
                  <FormulaBlock math="2x^2 + 1 \neq (2x+1)^2" /> — hasilnya berbeda! Urutan komposisi sangat penting.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
