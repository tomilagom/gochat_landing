# GoChat landing — guía para Claude

Landing bilingüe (ES/EN) para GoChat (chatbot de IA). Astro 4 + CSS plano, deploy automático a GitHub Pages.

---

## Convenciones del proyecto

### Bilingüe ES/EN
- EN vive en la raíz (`/`), ES en `/es/`. Cada página y componente tiene su par.
- En componentes, la copy va en un bloque ternario al tope del frontmatter:
  ```astro
  const copy = isES ? { ... } : { ... };
  ```
  **Cualquier string visible nuevo debe agregarse en ambos idiomas.** No mezclar idiomas dentro del mismo bloque.
- Para links internos, usar `localizedHref(path, lang)` de `src/lib/i18n.ts`, no concatenar `/es` a mano.
- Las traducciones son humanas y profesionales. No traducir literal desde EN ni viceversa: el ES tiene su propio fraseo.
- ES usa **tuteo** (`tú eliges`, `responde`), no voseo (`vos elegís`, `respondé`). No mezclar.

### Sistema de diseño (CSS plano, `src/styles/global.css`)
- Paleta: violeta GoChat/Hyppo (primary) + verde acento. Las variables están en `:root` en `global.css` — usarlas, no hardcodear hex.
- Las secciones blancas/paper usan **blobs** (círculos blureados) como decoración. El blur debe **bleed continuo entre secciones** — no cortarse en línea recta en el borde. Si vas a separar dos secciones decoradas, dejá que los blobs se monten.
- Animaciones y transiciones existentes son sutiles. Si agregás efectos nuevos, mantené esa escala.

### Frontend: menos texto, más interacción
Regla pedida explícitamente por el usuario: **no dumpear texto en pantalla**. Si una tarjeta tiene más contenido, esconderlo detrás de hover o click. Mejor un blurb corto y reveal-on-interaction que un párrafo visible.

---

## Reglas de copy (sin tells de LLM)

Toda copy visible (ES y EN) debe leerse como escrita por una persona. El sitio se chequea por estas cosas y el usuario las nota.

### No usar
- **Em-dash (`—`)** como puntuación estilística. Usar coma, punto, dos puntos, paréntesis o conjunción (`y`, `o`, `pero`, `que`). Excepción única: el carácter `—` en las tablas (`Comparison.astro`, `AlternativePage.astro`) significa "no aplica" y se mantiene.
- **Em-dash en títulos** (`"GoChat — The AI..."`) → middot (`·`) o reescribir.
- **Patrón triádico + em-dash + frase resumen** (`"X, Y, Z — frase que cierra."`). Es el tell más fuerte. Reescribir como puntos separados o dos puntos.
- **Vocabulario marketing-IA**: seamless / fluida, robust / robusto, powerful / potente (sin sustancia), leverage, empower, unleash, harness, elevate, revolutionize, "supera los límites", "experiencia perfecta", "sin esfuerzo", "en el mundo actual".
- **Frases hueco-vendedoras**: "Go beyond the limits of...", "todo lo que necesitas y más".
- **Adjetivos pareados gratis**: "automated and personalized", "rápido y eficiente" cuando no agregan info.
- **Emojis** salvo que el usuario lo pida explícitamente (vale tanto para copy como para código y commits).

### Sí usar
- Frases cortas con punto. Si la idea tiene tres elementos, mejor tres oraciones o lista con dos puntos.
- Concreto sobre genérico: "responde en segundos, no en días" > "experiencia de respuesta optimizada".
- Conjunciones naturales en lugar de em-dash.

---

## Workflow

### Antes de commitear cambios de copy
```bash
grep -rn "—" src/ --include="*.astro"
```
Lo que quede debe estar solo en: comentarios CSS/HTML, o tablas comparativas donde `'—'` es "no aplica". Si aparece em-dash dentro de un string de UI, reescribirlo.

### Antes de pushear cualquier cambio
```bash
npm run build
```
Astro chequea templates en build. **No hay typecheck ni lint en CI** — el build de GitHub Pages corre `astro build` directo. Si rompe localmente, rompe en prod.

### Deploy
Push a `main` → GitHub Action (`.github/workflows/`) corre `withastro/action@v3` y publica a `gochat.ar` (CNAME en `public/`). No tocar `dist/` a mano.

---

## Gotchas

- **`public/media/` vs `media/`**: las imágenes que se sirven van en `public/media/` (Astro las copia tal cual). Hay también una carpeta `media/` en raíz con assets de referencia — no son lo mismo, no romper paths al refactorizar.
- **`Comparison.astro` y `AlternativePage.astro`**: el `'—'` en celdas de tabla es semántico ("no aplica"). No sustituirlo en un sweep de em-dashes.
- **Cambios masivos en strings**: el contenido bilingüe se duplica. Si vas a tocar muchos strings, hacé el ES y el EN en la misma pasada para no dejar el sitio descoordinado.
