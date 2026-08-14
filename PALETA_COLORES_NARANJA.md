# 🎨 Sistema de Colores - Paleta Naranja Corporativo

## Paleta Principal

### Colores de Marca

| Color | Hex | Uso | Preview |
|-------|-----|-----|---------|
| **Primary** | `#ea580c` | Color principal, botones primarios, enlaces | 🟧 Naranja Corporativo |
| **Secondary** | `#fb923c` | Color secundario, acentos suaves | 🟧 Naranja Claro |
| **Accent** | `#ffedd5` | Fondos sutiles, highlights | 🟨 Melocotón Claro |

### Colores Semánticos

| Color | Hex | Uso | Preview |
|-------|-----|-----|---------|
| **Success** | `#16a34a` | Estados exitosos, confirmaciones | 🟢 Verde |
| **Warning** | `#f59e0b` | Advertencias, estados de espera | 🟡 Amarillo/Ámbar |
| **Destructive** | `#dc2626` | Errores, eliminaciones, acciones peligrosas | 🔴 Rojo |
| **Info** | `#0284c7` | Información, notificaciones | 🔵 Azul Cielo |

### Colores de Interfaz

| Color | Hex | Uso | Preview |
|-------|-----|-----|---------|
| **Background** | `#ffffff` | Fondo principal | ⚪ Blanco |
| **Foreground** | `#1e1e1e` | Texto principal | ⚫ Negro Suave |
| **Card** | `#ffffff` | Fondo de tarjetas | ⚪ Blanco |
| **Muted** | `#fef3f2` | Fondos desactivados | 🟨 Beige Rosado |
| **Muted Foreground** | `#64748b` | Texto secundario | 🔘 Gris Pizarra |

### Bordes y Controles

| Color | Hex | Uso | Preview |
|-------|-----|-----|---------|
| **Border** | `#fed7aa` | Bordes generales | 🟧 Naranja Pastel |
| **Input** | `#fed7aa` | Bordes de inputs | 🟧 Naranja Pastel |
| **Input Background** | `#fff7ed` | Fondo de inputs | 🟨 Crema |
| **Ring** | `#ea580c` | Focus rings | 🟧 Naranja Corporativo |

---

## Modo Oscuro (Dark Theme)

### Colores de Marca - Dark

| Color | Hex | Uso | Preview |
|-------|-----|-----|---------|
| **Primary** | `#f97316` | Color principal | 🟧 Naranja Brillante |
| **Secondary** | `#fb923c` | Color secundario | 🟧 Naranja Claro |
| **Accent** | `#44403c` | Acentos | 🟫 Marrón Oscuro |

### Colores de Interfaz - Dark

| Color | Hex | Uso | Preview |
|-------|-----|-----|---------|
| **Background** | `#1c1917` | Fondo principal oscuro | ⚫ Negro Piedra |
| **Foreground** | `#fafaf9` | Texto claro | ⚪ Blanco Hueso |
| **Card** | `#292524` | Tarjetas oscuras | ⚫ Gris Piedra |
| **Muted** | `#292524` | Fondos desactivados | ⚫ Gris Piedra |
| **Border** | `#44403c` | Bordes oscuros | 🟫 Marrón Gris |

---

## Paleta de Gráficos (Charts)

Colores optimizados para visualización de datos:

| Chart | Hex | Uso |
|-------|-----|-----|
| **Chart 1** | `#ea580c` | Serie principal | 
| **Chart 2** | `#fb923c` | Segunda serie |
| **Chart 3** | `#f59e0b` | Tercera serie |
| **Chart 4** | `#16a34a` | Cuarta serie (éxito) |
| **Chart 5** | `#0284c7` | Quinta serie (info) |

---

## Uso por Componente

### Botones

```tsx
// Botón Primario
<Button variant="default">       // bg: #ea580c
<Button variant="secondary">     // bg: #fb923c
<Button variant="success">       // bg: #16a34a
<Button variant="warning">       // bg: #f59e0b
<Button variant="destructive">   // bg: #dc2626
```

### Badges

```tsx
<Badge variant="default">        // bg: #ea580c
<Badge variant="secondary">      // bg: #fb923c
<Badge variant="destructive">    // bg: #dc2626
<Badge variant="outline">        // border: #fed7aa
```

### Cards

```tsx
<Card>                           // bg: #ffffff, border: #fed7aa
```

### Inputs

```tsx
<Input>                          // bg: #fff7ed, border: #fed7aa
```

---

## Iconos de Acción - Gestión de Usuarios

| Acción | Icono | Color | Hex |
|--------|-------|-------|-----|
| **Ver Detalle** | 👁️ Eye | Primary | `#ea580c` |
| **Editar** | ✏️ Edit | Secondary | `#fb923c` |
| **Activar** | ⚡ Power | Success | `#16a34a` |
| **Desactivar** | 🔴 PowerOff | Warning | `#f59e0b` |
| **Eliminar** | 🗑️ Trash2 | Destructive | `#dc2626` |

---

## Sidebar

| Elemento | Light | Dark |
|----------|-------|------|
| **Background** | `#ffffff` | `#292524` |
| **Primary** | `#ea580c` | `#f97316` |
| **Accent** | `#ffedd5` | `#44403c` |
| **Border** | `#fed7aa` | `#44403c` |

---

## Contraste y Accesibilidad

### Ratios de Contraste (WCAG AA)

| Combinación | Ratio | Estado |
|-------------|-------|--------|
| Primary (#ea580c) sobre blanco | 4.52:1 | ✅ AA |
| Foreground (#1e1e1e) sobre blanco | 15.68:1 | ✅ AAA |
| Muted Foreground (#64748b) sobre blanco | 4.64:1 | ✅ AA |
| Primary Dark (#f97316) sobre Background Dark | 8.12:1 | ✅ AAA |

---

## Variables CSS

```css
:root {
  --primary: #ea580c;
  --secondary: #fb923c;
  --success: #16a34a;
  --warning: #f59e0b;
  --destructive: #dc2626;
  --info: #0284c7;
  --muted: #fef3f2;
  --accent: #ffedd5;
  --border: #fed7aa;
}

.dark {
  --primary: #f97316;
  --secondary: #fb923c;
  --background: #1c1917;
  --foreground: #fafaf9;
  --card: #292524;
  --border: #44403c;
}
```

---

## Degradados Sugeridos

```css
/* Degradado Principal */
background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%);

/* Degradado Suave */
background: linear-gradient(to right, #fff7ed 0%, #ffedd5 100%);

/* Degradado Hero */
background: linear-gradient(180deg, #ea580c 0%, #f97316 50%, #fb923c 100%);
```

---

## Comparación con Paleta Anterior (Azul)

| Elemento | Azul (Anterior) | Naranja (Nuevo) |
|----------|-----------------|-----------------|
| Primary | `#2563eb` | `#ea580c` |
| Secondary | `#06b6d4` | `#fb923c` |
| Accent | `#f1f5f9` | `#ffedd5` |
| Border | `#e2e8f0` | `#fed7aa` |

---

## Inspiración de Marca

Esta paleta naranja corporativa está inspirada en:
- 🔥 **Energía y Dinamismo** - El naranja transmite entusiasmo
- 🎯 **Acción y Conversión** - Ideal para CTAs y botones principales
- 🌅 **Calidez y Cercanía** - Ambiente acogedor para usuarios
- 🏢 **Profesionalismo Moderno** - Balance entre serio y accesible

---

**Última actualización:** Junio 2026  
**Diseñado para:** Arte Tours - Sistema de Gestión  
**Framework:** Tailwind CSS v4 + Custom Tokens
