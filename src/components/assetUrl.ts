// Resuelve assets de public/ tanto en el deck (rutas relativas ./) como dentro
// de Remotion (que expone window.remotion_staticBase). Evita importar 'remotion'
// en código compartido para no arrastrarlo al bundle web.
export function assetUrl(path: string): string {
  if (typeof window !== 'undefined') {
    const base = (window as unknown as { remotion_staticBase?: string }).remotion_staticBase
    if (base) return `${base}/${path}`
  }
  return `./${path}`
}
