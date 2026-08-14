# 👥 Gestión de Usuarios - Guía Completa

## 🎯 Funcionalidades Implementadas

### 1. ✅ AGREGAR Usuario
**Ubicación:** Botón "Crear Usuario" en la parte superior derecha

**Funcionalidad:**
- Modal completo con formulario de creación
- Campos obligatorios marcados con asterisco (*)
- Validación automática de campos requeridos
- Botón de crear deshabilitado hasta completar campos obligatorios

**Campos del Formulario:**
- ✓ Nombre Completo *
- ✓ Correo Electrónico *
- ✓ Teléfono *
- ✓ Rol * (Admin, Guía, Recepcionista)
- ✓ Departamento * (Administración, Operaciones, Ventas)
- ✓ Estado * (Activo, Inactivo)
- ✓ Dirección

**Notificación:** Toast de confirmación "Usuario creado exitosamente"

---

### 2. 👁️ VER DETALLE
**Ubicación:** Icono de ojo (👁️) azul en la columna de acciones

**Funcionalidad:**
- Panel lateral (Sheet) con información completa del usuario
- Avatar con iniciales
- Información organizada en secciones

**Secciones del Detalle:**
- **Información Personal:**
  - Teléfono
  - Rol
  - Departamento
  - Dirección

- **Información del Sistema:**
  - ID de usuario
  - Fecha de creación
  - Último acceso

**Acciones Rápidas desde el Detalle:**
- Botón Editar
- Botón Activar/Desactivar
- Botón Eliminar Usuario (rojo, parte inferior)

---

### 3. ✏️ EDITAR Usuario
**Ubicación:** Icono de lápiz (✏️) azul en la columna de acciones

**Funcionalidad:**
- Modal con formulario precargado
- Todos los campos editables
- Actualización en tiempo real

**Campos Editables:**
- Nombre Completo
- Correo Electrónico
- Teléfono
- Rol
- Departamento
- Estado
- Dirección

**Notificación:** Toast de confirmación "Usuario actualizado exitosamente"

---

### 4. ⚡ ACTIVAR Usuario
**Ubicación:** Icono de encendido (⚡) verde en la columna de acciones

**Funcionalidad:**
- Toggle rápido de estado inactivo → activo
- Sin confirmación (acción reversible)
- Cambio visual inmediato del badge de estado

**Características:**
- Icono verde cuando el usuario está inactivo
- Al hacer clic, activa al usuario instantáneamente
- Badge cambia de "Inactivo" (gris) a "Activo" (azul)

**Notificación:** Toast "Usuario activado exitosamente"

---

### 5. 🔴 DESACTIVAR Usuario
**Ubicación:** Icono de apagado (🔴) naranja en la columna de acciones

**Funcionalidad:**
- Toggle rápido de estado activo → inactivo
- Sin confirmación (acción reversible)
- Cambio visual inmediato del badge de estado

**Características:**
- Icono naranja cuando el usuario está activo
- Al hacer clic, desactiva al usuario instantáneamente
- Badge cambia de "Activo" (azul) a "Inactivo" (gris)

**Notificación:** Toast "Usuario desactivado exitosamente"

---

### 6. 🗑️ ELIMINAR Usuario
**Ubicación:** Icono de papelera (🗑️) rojo en la columna de acciones

**Funcionalidad:**
- Alert Dialog de confirmación obligatoria
- Advertencia clara con nombre del usuario
- Acción NO reversible

**Proceso:**
1. Click en icono rojo de papelera
2. Aparece modal de confirmación con:
   - Icono grande de advertencia
   - Título "¿Estás seguro?"
   - Descripción de la acción
   - Nombre y email del usuario a eliminar
3. Opciones:
   - **Cancelar** (con icono X)
   - **Eliminar** (botón rojo con icono de papelera)

**Notificación:** Toast "Usuario eliminado exitosamente"

---

## 🔍 FILTROS AVANZADOS

**Ubicación:** Botón "Filtros" con icono de embudo

**Características:**
- Panel expandible debajo del header
- Indicador visual (!) cuando hay filtros activos
- Botón "Limpiar" para resetear

**Tipos de Filtros:**

### 1. Búsqueda por Texto
- Campo de búsqueda en tiempo real
- Busca en: Nombre, Email y Teléfono
- Filtrado automático mientras escribes

### 2. Filtro por Rol
Opciones:
- Todos
- Administrador
- Guía
- Recepcionista

### 3. Filtro por Estado
Opciones:
- Todos
- Activos
- Inactivos

### 4. Filtro por Departamento
Opciones:
- Todos
- Administración
- Operaciones
- Ventas

**Combinación:** Todos los filtros se pueden combinar simultáneamente

---

## 📊 ORDENAR Columnas

**Funcionalidad:** Click en el encabezado de cualquier columna para ordenar

**Columnas Ordenables:**
1. Nombre
2. Email
3. Rol
4. Estado
5. Fecha de Creación

**Estados de Ordenamiento:**
- Sin orden (↕️) - Estado inicial
- Ascendente (↑) - Primer click
- Descendente (↓) - Segundo click
- Sin orden (↕️) - Tercer click (vuelve al inicio)

**Indicadores Visuales:**
- Icono cambia según el estado
- Color primario cuando está ordenado
- Gris cuando no hay orden

---

## 📥 EXPORTAR Datos

**Ubicación:** Botón "Exportar" con icono de descarga

**Formatos Disponibles:**

### 1. Exportar CSV
**Estado:** ✅ Funcional
- Descarga archivo .csv
- Incluye datos filtrados actuales
- Nombre: `usuarios-YYYY-MM-DD.csv`
- Columnas: ID, Nombre, Email, Teléfono, Rol, Estado, Departamento, Fecha Creación

**Notificación:** Toast "Datos exportados a CSV"

### 2. Exportar Excel
**Estado:** 🚧 En desarrollo
- Opción preparada para implementación futura

**Notificación:** Toast "Exportación a Excel en desarrollo"

---

## 📄 PAGINACIÓN

**Características:**
- 10 usuarios por página
- Navegación inteligente con botones
- Información de página actual y total

**Controles:**
- Botón "Anterior" (◀️)
- Números de página (máximo 5 visibles)
- Botón "Siguiente" (▶️)

**Información Mostrada:**
```
Página X de Y (Z resultados totales)
```

**Comportamiento:**
- Botones deshabilitados en primera/última página
- Números de página centrados en la página actual
- Adaptación dinámica al número total de páginas

---

## 📊 KPIs y Estadísticas

**Cards Informativos en la parte superior:**

### 1. Total Usuarios
- Cuenta todos los usuarios del sistema
- Color: Negro/Blanco (según tema)

### 2. Usuarios Activos
- Solo usuarios con estado "Activo"
- Color: Verde (success)

### 3. Usuarios Inactivos
- Solo usuarios con estado "Inactivo"
- Color: Rojo (destructive)

### 4. Resultados Filtrados
- Número de usuarios después de aplicar filtros
- Color: Azul (primary)

### 5. Acciones Rápidas (Leyenda)
- Tarjeta especial con iconos y descripciones
- Muestra todas las acciones disponibles
- Colores correspondientes a cada acción
- Fondo azul claro con borde primario

---

## 🎨 Códigos de Color de Iconos

Para facilitar la identificación visual:

| Acción | Icono | Color | Significado |
|--------|-------|-------|-------------|
| Ver Detalle | 👁️ | Azul Primary | Información/Vista |
| Editar | ✏️ | Azul Claro | Modificación |
| Activar | ⚡ | Verde | Acción Positiva |
| Desactivar | 🔴 | Naranja | Advertencia |
| Eliminar | 🗑️ | Rojo | Peligro/Destructivo |

---

## 🎯 Tooltips Informativos

**Todos los iconos de acción tienen tooltips al pasar el mouse:**
- "Ver Detalle"
- "Editar Usuario"
- "Activar Usuario" / "Desactivar Usuario"
- "Eliminar Usuario"

**Aparecen:** Al pasar el mouse sobre el icono
**Desaparecen:** Al quitar el mouse

---

## 🔔 Sistema de Notificaciones

**Tipo:** Toast notifications (esquina inferior derecha)

**Eventos que disparan notificaciones:**
- ✅ Usuario creado
- ✅ Usuario actualizado
- ✅ Usuario eliminado
- ✅ Usuario activado
- ✅ Usuario desactivado
- ✅ Datos exportados
- ℹ️ Filtros limpiados
- ℹ️ Exportación Excel en desarrollo

**Tipos de Toast:**
- `success` - Verde, con check ✓
- `info` - Azul, informativo ℹ️
- `error` - Rojo, con X (para errores)

---

## 📱 Diseño Responsive

**Breakpoints:**
- **Mobile:** < 768px
  - Cards apiladas verticalmente
  - Tabla con scroll horizontal
  - Acciones compactas

- **Tablet:** 768px - 1023px
  - Cards en grid 2x2
  - Tabla completa con scroll
  - Formularios en 2 columnas

- **Desktop:** > 1024px
  - Cards en grid 5 columnas
  - Tabla completa visible
  - Formularios en grid optimizado

---

## ⚙️ Configuración Actual

**Datos de Prueba:** 8 usuarios mock
**Paginación:** 10 por página
**Filtros Activos por Defecto:** Ninguno
**Orden por Defecto:** Sin ordenar

---

## 🚀 Próximas Mejoras Sugeridas

- [ ] Selección múltiple con checkboxes
- [ ] Acciones masivas (eliminar, activar, desactivar)
- [ ] Importar usuarios desde CSV/Excel
- [ ] Asignación de permisos por usuario
- [ ] Historial de cambios
- [ ] Avatar personalizado con foto
- [ ] Envío de email de bienvenida
- [ ] Restablecer contraseña desde admin

---

**Última actualización:** Junio 2026  
**Versión:** 1.0.0  
**Tecnología:** React + TypeScript + Tailwind CSS + Shadcn/ui
