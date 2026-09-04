-- ============================================================
-- EXTENSIÓN DEL ESQUEMA artetours PARA ALINEAR CON EL FRONTEND
-- Columnas y tablas nuevas detectadas en la Auditoría Fase 3
-- ============================================================
-- EJECUTAR DENTRO DE: SET search_path TO artetours;
-- ============================================================

-- -----------------------------------------------------------
-- 1. CATEGORÍAS_TOUR: agregar columna color (UI selector de color)
-- -----------------------------------------------------------
ALTER TABLE artetours.categorias_tour
  ADD COLUMN IF NOT EXISTS color VARCHAR(7);

COMMENT ON COLUMN artetours.categorias_tour.color
  IS 'Color hex para UI badge (frontend)';

-- -----------------------------------------------------------
-- 2. TURISTAS: agregar columna vip (cliente VIP)
-- -----------------------------------------------------------
ALTER TABLE artetours.turistas
  ADD COLUMN IF NOT EXISTS vip BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN artetours.turistas.vip
  IS 'Bandera de cliente VIP';

-- -----------------------------------------------------------
-- 3. USUARIOS: agregar columnas position/department para perfil administrativo
-- -----------------------------------------------------------
ALTER TABLE artetours.usuarios
  ADD COLUMN IF NOT EXISTS cargo VARCHAR(120),
  ADD COLUMN IF NOT EXISTS departamento VARCHAR(120);

COMMENT ON COLUMN artetours.usuarios.cargo IS 'Cargo del empleado (settings perfil admin)';
COMMENT ON COLUMN artetours.usuarios.departamento IS 'Departamento (settings perfil admin)';

-- -----------------------------------------------------------
-- 4. TABLA NUEVA: preferencias_usuario (Settings: perfil, notificaciones, seguridad, preferencias UI)
--    Las facturación e integraciones se manejarán a nivel admin global
--    en tabla nueva "ajustes_sistema"
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS artetours.preferencias_usuario (
  id_usuario              BIGINT PRIMARY KEY REFERENCES artetours.usuarios(id_usuario) ON DELETE CASCADE,
  -- Notificaciones
  notif_email_reservas    BOOLEAN NOT NULL DEFAULT TRUE,
  notif_email_pagos       BOOLEAN NOT NULL DEFAULT TRUE,
  notif_email_usuarios    BOOLEAN NOT NULL DEFAULT FALSE,
  notif_push_all          BOOLEAN NOT NULL DEFAULT TRUE,
  notif_push_urgente      BOOLEAN NOT NULL DEFAULT TRUE,
  notif_push_pagos        BOOLEAN NOT NULL DEFAULT TRUE,
  -- Seguridad
  fa_activado             BOOLEAN NOT NULL DEFAULT FALSE,
  session_timeout_min     INTEGER NOT NULL DEFAULT 30,
  alert_sesiones_nuevas   BOOLEAN NOT NULL DEFAULT TRUE,
  -- Preferencias UI
  idioma                  VARCHAR(10) NOT NULL DEFAULT 'es',
  moneda                  VARCHAR(5) NOT NULL DEFAULT 'COP',
  zona_horaria            VARCHAR(60) NOT NULL DEFAULT 'America/Bogota',
  formato_fecha           VARCHAR(20) NOT NULL DEFAULT 'DD/MM/YYYY',
  pestaña_default         VARCHAR(50) NOT NULL DEFAULT 'dashboard',
  vista_compacta          BOOLEAN NOT NULL DEFAULT FALSE
);

-- -----------------------------------------------------------
-- 5. TABLA NUEVA: ajustes_sistema (clave / valor)
--    Contiene: Datos de facturación, integraciones (Stripe, WhatsApp, GA, SMTP)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS artetours.ajustes_sistema (
  clave        VARCHAR(100) PRIMARY KEY,
  valor        TEXT,
  tipo         VARCHAR(30) NOT NULL DEFAULT 'string',
  actualizado  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO artetours.ajustes_sistema (clave, valor, tipo) VALUES
  ('factura_empresa',       '',     'string'),
  ('factura_nit',           '',     'string'),
  ('factura_direccion',     '',     'string'),
  ('factura_ciudad',        '',     'string'),
  ('factura_pais',          '',     'string'),
  ('factura_email',         '',     'string'),
  ('stripe_api_key',        '',     'secret'),
  ('stripe_enabled',        'false','bool'),
  ('whatsapp_numero',       '',     'string'),
  ('whatsapp_habilitado',   'false','bool'),
  ('google_analytics_id',   '',     'string'),
  ('smtp_host',             '',     'string'),
  ('smtp_port',             '587',  'number'),
  ('smtp_usuario',          '',     'string'),
  ('smtp_password',         '',     'secret'),
  ('smtp_tls',              'true', 'bool')
ON CONFLICT (clave) DO NOTHING;

-- -----------------------------------------------------------
-- 6. TRIGGER: actualizar actualizado en ajustes_sistema
-- -----------------------------------------------------------
CREATE OR REPLACE FUNCTION artetours.trg_ajustes_actualizado()
RETURNS TRIGGER AS $$
BEGIN
  NEW.actualizado = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_ajustes_actualizado ON artetours.ajustes_sistema;
CREATE TRIGGER trg_ajustes_actualizado
BEFORE UPDATE ON artetours.ajustes_sistema
FOR EACH ROW EXECUTE FUNCTION artetours.trg_ajustes_actualizado();

-- -----------------------------------------------------------
-- 7. ROL: agregar activo para Roles CRUD (opcional, lo pedía el formulario)
-- -----------------------------------------------------------
ALTER TABLE artetours.roles
  ADD COLUMN IF NOT EXISTS activo BOOLEAN NOT NULL DEFAULT TRUE;

