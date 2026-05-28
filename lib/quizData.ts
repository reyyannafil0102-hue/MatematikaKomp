export type QuizPart = { type: 'text'; value: string } | { type: 'math'; value: string }

export interface QuizQuestion {
  id: number
  question: QuizPart[]   // mixed text + math
  options: string[]      // options are pure LaTeX (short formulas)
  correctIndex: number
  explanation: string
  difficulty: 'mudah' | 'sedang' | 'sulit'
}

const t = (value: string): QuizPart => ({ type: 'text', value })
const m = (value: string): QuizPart => ({ type: 'math', value })

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    difficulty: 'mudah',
    question: [t('Jika '), m('f(x) = x + 2'), t(' dan '), m('g(x) = 3x'), t(', maka '), m('(f \\circ g)(x)'), t(' = …')],
    options: ['3x + 2', '3x + 6', 'x + 6', '3(x+2)'],
    correctIndex: 0,
    explanation: 'g(x) = 3x, lalu f(g(x)) = f(3x) = 3x + 2',
  },
  {
    id: 2,
    difficulty: 'mudah',
    question: [t('Jika '), m('f(x) = 2x - 1'), t(' dan '), m('g(x) = x + 3'), t(', maka '), m('(g \\circ f)(2)'), t(' = …')],
    options: ['6', '7', '8', '9'],
    correctIndex: 0,
    explanation: 'f(2) = 2(2) − 1 = 3, lalu g(f(2)) = g(3) = 3 + 3 = 6',
  },
  {
    id: 3,
    difficulty: 'mudah',
    question: [t('Diketahui '), m('f(x) = x^2 + 1'), t(' dan '), m('g(x) = 2x'), t('. Nilai '), m('(f \\circ g)(3)'), t(' = …')],
    options: ['19', '37', '13', '10'],
    correctIndex: 1,
    explanation: 'g(3) = 6, lalu f(6) = 36 + 1 = 37',
  },
  {
    id: 4,
    difficulty: 'sedang',
    question: [t('Jika '), m('(f \\circ g)(x) = 4x + 3'), t(' dan '), m('g(x) = 2x + 1'), t(', maka '), m('f(x)'), t(' = …')],
    options: ['2x + 1', '2x - 1', '4x + 1', '2x + 3'],
    correctIndex: 0,
    explanation: 'Misalkan u = 2x+1, maka x = (u−1)/2. f(u) = 4·(u−1)/2 + 3 = 2u + 1, jadi f(x) = 2x + 1',
  },
  {
    id: 5,
    difficulty: 'sedang',
    question: [t('Domain '), m('(f \\circ g)(x)'), t(' jika '), m('f(x) = \\sqrt{x}'), t(' dan '), m('g(x) = x - 3'), t(' adalah …')],
    options: ['x \\geq 0', 'x \\geq 3', 'x > 3', 'x \\leq 3'],
    correctIndex: 1,
    explanation: 'g(x) = x − 3 harus ≥ 0 agar √(x−3) terdefinisi, sehingga x ≥ 3',
  },
  {
    id: 6,
    difficulty: 'sedang',
    question: [t('Jika '), m('f(x) = \\dfrac{1}{x}'), t(' dan '), m('g(x) = x + 1'), t(', maka '), m('(f \\circ g)(x)'), t(' = …')],
    options: ['\\dfrac{1}{x+1}', '\\dfrac{1}{x} + 1', '\\dfrac{x+1}{x}', '\\dfrac{1}{x+1} + 1'],
    correctIndex: 0,
    explanation: 'f(g(x)) = f(x+1) = 1/(x+1)',
  },
  {
    id: 7,
    difficulty: 'mudah',
    question: [t('Apakah '), m('(f \\circ g)(x) = (g \\circ f)(x)'), t(' selalu berlaku?')],
    options: ['Ya, selalu', 'Tidak, umumnya tidak sama', 'Ya, jika f = g', 'Tidak pernah sama'],
    correctIndex: 1,
    explanation: 'Komposisi fungsi tidak bersifat komutatif. Umumnya (f∘g)(x) ≠ (g∘f)(x).',
  },
  {
    id: 8,
    difficulty: 'sulit',
    question: [
      t('Jika '), m('f(x) = 3x + 2'), t(', '), m('g(x) = x^2 - 1'), t(', '), m('h(x) = 2x'),
      t(', maka '), m('(f \\circ (g \\circ h))(1)'), t(' = …'),
    ],
    options: ['5', '8', '11', '14'],
    correctIndex: 2,
    explanation: 'h(1) = 2, g(2) = 3, f(3) = 11',
  },
  {
    id: 9,
    difficulty: 'sulit',
    question: [t('Jika '), m('f(x) = 2x + 1'), t(' dan '), m('(f \\circ g)(x) = 2x^2 + 1'), t(', maka '), m('g(x)'), t(' = …')],
    options: ['x^2', 'x^2 + 1', '2x^2', 'x^2 - 1'],
    correctIndex: 0,
    explanation: '2g(x) + 1 = 2x² + 1, sehingga g(x) = x²',
  },
  {
    id: 10,
    difficulty: 'sulit',
    question: [t('Domain '), m('(f \\circ g)(x)'), t(' jika '), m('f(x) = \\sqrt{x-1}'), t(' dan '), m('g(x) = x^2'), t(' adalah …')],
    options: ['x \\geq 1', 'x \\leq -1 \\text{ atau } x \\geq 1', 'x \\geq 0', 'x \\in \\mathbb{R}'],
    correctIndex: 1,
    explanation: 'x² ≥ 1 berarti x ≤ −1 atau x ≥ 1',
  },
]
