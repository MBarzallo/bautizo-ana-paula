import { Routes, Route } from "react-router-dom";
import {
  CalendarDays,
  Church,
  Clock,
  Cross,
  Heart,
  MapPin,
  Sparkles,
  UsersRound,
  Flower2,
  Music,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import "./App.css";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

function InvitationPage() {
  const MAPS_URL = "https://maps.app.goo.gl/DHLpjtGZhxodKx5C9?g_st=iw";

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    personas: "",
    asistencia: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmitConfirmation = async (event) => {
    event.preventDefault();
    setSubmitMessage("");

    if (!formData.nombre.trim()) {
      setSubmitMessage("Por favor ingresa tu nombre.");
      return;
    }

    if (!formData.asistencia) {
      setSubmitMessage("Por favor selecciona si podrás asistir.");
      return;
    }

    if (
      formData.asistencia === "si" &&
      (!formData.personas || Number(formData.personas) < 1)
    ) {
      setSubmitMessage("Por favor ingresa el número de personas.");
      return;
    }

    try {
      setIsSubmitting(true);

      await addDoc(collection(db, "confirmaciones"), {
        nombre: formData.nombre.trim(),
        telefono: formData.telefono.trim(),
        personas: formData.asistencia === "si" ? Number(formData.personas) : 0,
        asistencia: formData.asistencia,
        mensaje: formData.mensaje.trim(),
        evento: "bautizo-ana-paula",
        fechaRegistro: serverTimestamp(),
      });

      setFormData({
        nombre: "",
        telefono: "",
        personas: "",
        asistencia: "",
        mensaje: "",
      });

      setSubmitMessage("Gracias, tu confirmación fue registrada con éxito.");
    } catch (error) {
      console.error(error);
      setSubmitMessage(
        "No se pudo guardar la confirmación. Intenta nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="baptism-page">
      <FloatingDecorations />

      <nav className="top-nav">
        <a href="#inicio">Ana Paula</a>
        <a href="#bendicion">Bendición</a>
        <a href="#detalles">Detalles</a>
        <a href="#confirmar">Confirmar</a>
      </nav>

      <section id="inicio" className="hero-section">
        <div className="hero-hydrangeas">
          <img
            src="/images/hortensia-azul.webp"
            className="hydrangea h1"
            alt=""
          />
          <img
            src="/images/hortensia-rosada.webp"
            className="hydrangea h2"
            alt=""
          />
          <img
            src="/images/hortensia-rama.webp"
            className="hydrangea h3"
            alt=""
          />
          <img
            src="/images/hortensia-azul.webp"
            className="hydrangea h4"
            alt=""
          />
        </div>

        <motion.div
          className="hero-overlay-content"
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-glass">
            <motion.div
              className="mini-label"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
            >
              <Flower2 size={16} />
              Invitación especial
              <Flower2 size={16} />
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9 }}
            >
              Bautizo de
            </motion.h1>

            <motion.h2
              className="hero-name"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.9 }}
            >
              Ana Paula
            </motion.h2>

            <motion.div
              className="hero-cross"
              initial={{ opacity: 0, rotate: -12, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <Cross size={28} />
            </motion.div>

            <motion.p
              className="hero-phrase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 1 }}
            >
              Ana Paula ha deseado recibir la bendición de Dios, y con amor
              queremos acompañarla en este momento tan especial.
            </motion.p>

            <motion.div
              className="hero-date-pill"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <span>Sábado 20 de junio</span>
              <small>10:00 · Iglesia de San Blas</small>
            </motion.div>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.8 }}
            >
              <a href="#confirmar" className="btn-primary">
                Confirmar asistencia
              </a>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <MapPin size={18} />
                Ver ubicación
              </a>
            </motion.div>
          </div>
        </motion.div>

        <a href="#bendicion" className="scroll-indicator">
          <span></span>
          Desliza
        </a>
      </section>

      <Section id="bendicion" className="blessing-section">
        <div className="blessing-decor blessing-decor-left">
          <img src="/images/hortensia-azul.webp" alt="" />
        </div>

        <div className="blessing-decor blessing-decor-right">
          <img src="/images/hortensia-rosada.webp" alt="" />
        </div>

        <motion.div
          className="section-heading blessing-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          <span>Con fe y amor</span>

          <h2>Un día lleno de bendición</h2>

          <div className="blessing-cross-center">
            <Cross size={34} />
          </div>

          <p>
            Hoy celebramos la decisión de Ana Paula de acercarse a Dios, rodeada
            del amor de su familia y de quienes acompañan su camino.
          </p>
        </motion.div>

        <motion.div
          className="blessing-message"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p>
            “Que Dios ilumine su vida, cuide sus pasos y llene su corazón de
            amor, ternura y esperanza.”
          </p>
        </motion.div>

        <div className="blessing-grid blessing-grid-premium">
          <BlessingCard
            delay={0.05}
            icon={<Cross />}
            title="Bendición"
            text="Un momento sagrado para recibir la gracia de Dios y comenzar un camino lleno de luz."
          />

          <BlessingCard
            delay={0.2}
            icon={<Heart />}
            title="Amor familiar"
            text="Celebramos este día rodeados de cariño, unión y alegría junto a quienes más la aman."
          />

          <BlessingCard
            delay={0.35}
            icon={<Sparkles />}
            title="Esperanza"
            text="Una nueva etapa para Ana Paula, llena de protección, fe y hermosos momentos."
          />
        </div>
      </Section>

      <Section id="detalles" className="details-section">
        <div className="details-flower details-flower-left">
          <img src="/images/hortensia-azul.webp" alt="" />
        </div>

        <div className="details-flower details-flower-right">
          <img src="/images/hortensia-rosada.webp" alt="" />
        </div>

        <motion.div
          className="details-card details-card-premium"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-heading compact details-heading">
            <span>Detalles del evento</span>
            <h2>Te esperamos</h2>
            <p>
              Será un día muy especial para acompañar a Ana Paula en su bautizo
              y compartir juntos este momento de fe y alegría.
            </p>
          </div>

          <div className="event-date-banner">
            <CalendarDays size={24} />
            <div>
              <small>Fecha</small>
              <strong>Sábado 20 de junio</strong>
            </div>
          </div>

          <div className="event-columns">
            <motion.article
              className="event-box ceremony-box"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
            >
              <div className="event-icon">
                <Church size={28} />
              </div>

              <span>Ceremonia</span>
              <h3>Iglesia de San Blas</h3>
              <p>10:00 de la mañana</p>
            </motion.article>

            <motion.article
              className="event-box reception-box"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="event-icon">
                <Heart size={28} />
              </div>

              <span>Recepción</span>
              <h3>La pérgola</h3>
              <p>12:00 del mediodía</p>
            </motion.article>
          </div>

          <div className="godparents-card">
            <div className="godparents-icon">
              <UsersRound size={23} />
            </div>

            <div>
              <small>Madrina</small>
              <strong>Rocío</strong>
            </div>
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="location-card location-card-premium"
          >
            <div className="location-icon">
              <MapPin size={24} />
            </div>

            <div>
              <strong>Ver ubicación</strong>
              <p>Toca aquí para abrir el local en Google Maps</p>
            </div>
          </a>
        </motion.div>
      </Section>

      <GallerySection />

      <Section
        id="confirmar"
        className="confirm-section confirm-premium-section"
      >
        <div className="confirm-flower confirm-flower-left">
          <img src="/images/hortensia-azul.webp" alt="" />
        </div>

        <div className="confirm-flower confirm-flower-right">
          <img src="/images/hortensia-rosada.webp" alt="" />
        </div>

        <motion.div
          className="confirm-wrapper"
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        >
          <div className="confirm-info-panel">
            <div className="confirm-seal">
              <Cross size={30} />
            </div>

            <span className="confirm-small-title">Confirmación</span>

            <h2>Nos encantaría contar contigo</h2>

            <p>
              Ayúdanos confirmando tu asistencia para acompañar a Ana Paula en
              este día tan especial.
            </p>

            <div className="confirm-mini-details">
              <div>
                <Heart size={18} />
                <span>Tu presencia hará este día aún más especial.</span>
              </div>

              <div>
                <Sparkles size={18} />
                <span>Gracias por acompañar a Ana Paula con cariño.</span>
              </div>
            </div>
          </div>

          <form
            className="confirm-form confirm-form-premium"
            onSubmit={handleSubmitConfirmation}
          >
            <div className="form-row">
              <label>
                <span>Nombre completo</span>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej. María González"
                />
              </label>
            </div>

            <div className="form-row two-columns">
              <label>
                <span>Teléfono</span>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="WhatsApp"
                />
              </label>

              <label>
                <span>Personas</span>
                <input
                  type="number"
                  name="personas"
                  value={formData.personas}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="1"
                />
              </label>
            </div>

            <label>
              <span>¿Podrás asistir?</span>
              <select
                name="asistencia"
                value={formData.asistencia}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="si">Sí, asistiré</option>
                <option value="no">No podré asistir</option>
              </select>
            </label>

            <label>
              <span>Mensaje</span>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                rows="4"
                placeholder="Puedes dejar un mensajito para Ana Paula"
              />
              <p className="text-xs text-[#80604d]">Opcional</p>
            </label>

            <button type="submit" disabled={isSubmitting}>
              <Send size={19} />
              {isSubmitting ? "Enviando..." : "Enviar confirmación"}
            </button>
            {submitMessage && (
  <p className="submit-message">
    {submitMessage}
  </p>
)}

            <p className="form-note">
              Gracias por confirmar con cariño este momento especial.
            </p>
          </form>
        </motion.div>
      </Section>

      <footer className="footer">
        <Music size={17} />
        <span>Con cariño para Ana Paula</span>
        <span>© 2026 Creado por Mateo Barzallo</span>
      </footer>
    </main>
  );
}

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`page-section ${className}`}>
      {children}
    </section>
  );
}

function FloatingDecorations() {
  return (
    <>
      <div className="decor decor-one"></div>
      <div className="decor decor-two"></div>
      <div className="decor decor-three"></div>
      <div className="cross-bg cross-one">
        <Cross size={42} />
      </div>
      <div className="cross-bg cross-two">
        <Cross size={34} />
      </div>
      <div className="cross-bg cross-three">
        <Cross size={28} />
      </div>
    </>
  );
}

function Photo({ src, alt }) {
  return (
    <div className="photo-placeholder">
      <img
        src={src}
        alt={alt}
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
      <div className="placeholder-content">
        <Flower2 size={34} />
        <span>Ana Paula</span>
      </div>
    </div>
  );
}

function BlessingCard({ icon, title, text, delay }) {
  return (
    <motion.article
      className="blessing-card"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay }}
    >
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.article>
  );
}

function DetailItem({ icon, title, text }) {
  return (
    <motion.div
      className="detail-item"
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55 }}
    >
      <div className="detail-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </motion.div>
  );
}

function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryImages = [
    "/images/ana-paula-1.jpeg",
    "/images/ana-paula-2.jpeg",
    "/images/ana-paula-3.jpeg",
    "/images/ana-paula-4.jpeg",
    "/images/ana-paula-5.jpeg",
    "/images/ana-paula-6.jpeg",
  ];

  return (
    <Section className="gallery-section gallery-premium-section">
      <div className="gallery-flower gallery-flower-left">
        <img src="/images/hortensia-azul.webp" alt="" />
      </div>

      <div className="gallery-flower gallery-flower-right">
        <img src="/images/hortensia-rosada.webp" alt="" />
      </div>

      <motion.div
        className="section-heading gallery-heading"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8 }}
      >
        <span>Momentos especiales</span>
        <h2>Galería de Ana Paula</h2>
        <p>
          Pequeños recuerdos llenos de alegría, ternura y amor para celebrar
          este día tan especial.
        </p>
      </motion.div>

      <div className="gallery-bento">
        {galleryImages.map((src, index) => (
          <motion.button
            type="button"
            key={src}
            className={`bento-photo bento-${index + 1}`}
            onClick={() => setSelectedImage(src)}
            initial={{ opacity: 0, y: 38, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: index * 0.08 }}
          >
            <Photo src={src} alt={`Foto ${index + 1} de Ana Paula`} />

            <div className="bento-overlay">
              <span>Ver foto</span>
            </div>
          </motion.button>
        ))}
      </div>

      {selectedImage && (
        <motion.div
          className="image-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="image-modal-content"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>

            <img src={selectedImage} alt="Foto ampliada de Ana Paula" />
          </motion.div>
        </motion.div>
      )}
    </Section>
  );
}

function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(
    sessionStorage.getItem("admin-auth") === "true",
  );
  const [confirmaciones, setConfirmaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogin = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (password === adminPassword) {
      sessionStorage.setItem("admin-auth", "true");
      setIsAuthorized(true);
      setPassword("");
      return;
    }

    setErrorMessage("Clave incorrecta.");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth");
    setIsAuthorized(false);
    setConfirmaciones([]);
  };

  const loadConfirmaciones = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const confirmacionesQuery = query(
        collection(db, "confirmaciones"),
        orderBy("fechaRegistro", "desc"),
      );

      const snapshot = await getDocs(confirmacionesQuery);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setConfirmaciones(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("No se pudieron cargar las confirmaciones.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      loadConfirmaciones();
    }
  }, [isAuthorized]);

  const confirmados = confirmaciones.filter((item) => item.asistencia === "si");
  const noAsisten = confirmaciones.filter((item) => item.asistencia === "no");

  const totalPersonas = confirmados.reduce((total, item) => {
    return total + Number(item.personas || 0);
  }, 0);

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "Sin fecha";

    return timestamp.toDate().toLocaleString("es-EC", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (!isAuthorized) {
    return (
      <main className="admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <div className="admin-login-icon">
            <Cross size={28} />
          </div>

          <span>Panel privado</span>

          <h1>Confirmaciones</h1>

          <p>
            Ingresa la clave para revisar las personas que confirmaron su
            asistencia.
          </p>

          <input
            type="password"
            placeholder="Clave de acceso"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Entrar</button>

          {errorMessage && <p className="admin-error">{errorMessage}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="admin-dashboard-page">
      <section className="admin-dashboard">
        <div className="admin-header">
          <div>
            <span>Panel privado</span>
            <h1>Confirmaciones del bautizo</h1>
            <p>Listado de personas que registraron su respuesta.</p>
          </div>

          <div className="admin-actions">
            <button type="button" onClick={loadConfirmaciones}>
              Actualizar
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="logout-button"
            >
              Salir
            </button>
          </div>
        </div>

        <div className="admin-stats">
          <div>
            <small>Total registros</small>
            <strong>{confirmaciones.length}</strong>
          </div>

          <div>
            <small>Confirmados</small>
            <strong>{confirmados.length}</strong>
          </div>

          <div>
            <small>No asisten</small>
            <strong>{noAsisten.length}</strong>
          </div>

          <div>
            <small>Total personas</small>
            <strong>{totalPersonas}</strong>
          </div>
        </div>

        {isLoading && (
          <p className="admin-loading">Cargando confirmaciones...</p>
        )}

        {errorMessage && <p className="admin-error">{errorMessage}</p>}

        {!isLoading && confirmaciones.length === 0 && (
          <div className="empty-admin">
            Todavía no hay confirmaciones registradas.
          </div>
        )}

        {confirmaciones.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Asistencia</th>
                  <th>Personas</th>
                  <th>Teléfono</th>
                  <th>Mensaje</th>
                  <th>Fecha</th>
                </tr>
              </thead>

              <tbody>
                {confirmaciones.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre || "-"}</td>
                    <td>
                      <span
                        className={
                          item.asistencia === "si"
                            ? "status-badge status-yes"
                            : "status-badge status-no"
                        }
                      >
                        {item.asistencia === "si" ? "Sí asiste" : "No asiste"}
                      </span>
                    </td>
                    <td>{item.personas || 0}</td>
                    <td>{item.telefono || "-"}</td>
                    <td>{item.mensaje || "-"}</td>
                    <td>{formatDate(item.fechaRegistro)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<InvitationPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
