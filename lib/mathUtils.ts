import * as math from 'mathjs'

export interface CompositionResult {
  gx: number
  fgx: number
  steps: Array<{ label: string; value: number | string }>
}

export function calcFoG(fExpr: string, gExpr: string, x: number): CompositionResult {
  const scope = { x }
  const gx = math.evaluate(gExpr, scope) as number
  const fgx = math.evaluate(fExpr, { x: gx }) as number
  return {
    gx,
    fgx,
    steps: [
      { label: `g(${x})`, value: gx },
      { label: `f(g(${x})) = f(${gx})`, value: fgx },
    ],
  }
}

export function calcGoF(fExpr: string, gExpr: string, x: number): CompositionResult {
  const scope = { x }
  const fx = math.evaluate(fExpr, scope) as number
  const gfx = math.evaluate(gExpr, { x: fx }) as number
  return {
    gx: fx,
    fgx: gfx,
    steps: [
      { label: `f(${x})`, value: fx },
      { label: `g(f(${x})) = g(${fx})`, value: gfx },
    ],
  }
}

export function generatePoints(
  expr: string,
  from: number = -5,
  to: number = 5,
  steps: number = 100
): Array<{ x: number; y: number | null }> {
  const points: Array<{ x: number; y: number | null }> = []
  const step = (to - from) / steps
  for (let i = 0; i <= steps; i++) {
    const x = from + i * step
    try {
      const y = math.evaluate(expr, { x }) as number
      if (isFinite(y) && !isNaN(y) && Math.abs(y) < 1000) {
        points.push({ x: parseFloat(x.toFixed(4)), y: parseFloat(y.toFixed(4)) })
      } else {
        points.push({ x: parseFloat(x.toFixed(4)), y: null })
      }
    } catch {
      points.push({ x: parseFloat(x.toFixed(4)), y: null })
    }
  }
  return points
}

export function getComposedExpression(fExpr: string, gExpr: string): string {
  try {
    // Substitute g into f symbolically
    const gNode = math.parse(gExpr)
    const fNode = math.parse(fExpr)
    // Replace x in f with g(x)
    const substituted = fNode.transform((node) => {
      if (node.type === 'SymbolNode' && (node as math.SymbolNode).name === 'x') {
        return gNode
      }
      return node
    })
    const simplified = math.simplify(substituted)
    return simplified.toString()
  } catch {
    return `f(${gExpr})`
  }
}

export function validateExpression(expr: string): boolean {
  try {
    math.parse(expr)
    math.evaluate(expr, { x: 1 })
    return true
  } catch {
    return false
  }
}

export function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toString()
  return parseFloat(n.toFixed(4)).toString()
}
