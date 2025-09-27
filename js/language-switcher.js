// Language switcher functionality
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = {};
        this.init();
    }

    init() {
        this.loadTranslations();
        this.updateUI(); // Update UI first to set correct active states
        this.setupEventListeners();
        this.translatePage();
    }

    setupEventListeners() {
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedLang = e.target.getAttribute('data-lang');
                if (selectedLang && selectedLang !== this.currentLang) {
                    this.currentLang = selectedLang;
                    localStorage.setItem('language', this.currentLang);
                    this.updateUI();
                    this.translatePage();
                }
            });
        });
    }

    updateUI() {
        const langOptions = document.querySelectorAll('.lang-option');
        
        langOptions.forEach(option => {
            const lang = option.getAttribute('data-lang');
            if (lang === this.currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        document.documentElement.lang = this.currentLang;
    }

    translatePage() {
        // Only apply translations if switching to Spanish
        if (this.currentLang === 'es' && this.translations.es) {
            this.applyTranslations(this.translations.es);
        } else if (this.currentLang === 'en') {
            // Restore English text if user is switching back from Spanish
            this.restoreEnglishText();
        }
    }

    restoreEnglishText() {
        // Restore original English text for elements that were translated
        document.querySelectorAll('[data-original-text]').forEach(element => {
            const key = element.getAttribute('data-translate');
            // Use innerHTML for elements that had HTML formatting
            if (key === 'aboutBackgroundText' || key === 'aboutExperienceDescription') {
                element.innerHTML = element.getAttribute('data-original-text');
            } else {
                element.textContent = element.getAttribute('data-original-text');
            }
            element.removeAttribute('data-original-text');
        });

        // Restore page title
        const titleElement = document.querySelector('title');
        if (titleElement && titleElement.hasAttribute('data-original-text')) {
            titleElement.textContent = titleElement.getAttribute('data-original-text');
            titleElement.removeAttribute('data-original-text');
        }

        // Restore CV link to English version
        const cvLink = document.querySelector('[data-cv-link]');
        if (cvLink && cvLink.hasAttribute('data-original-href')) {
            cvLink.href = cvLink.getAttribute('data-original-href');
            cvLink.removeAttribute('data-original-href');
        }
    }

    applyTranslations(translations) {
        // Translate elements with data-translate attribute to Spanish
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            
            if (translations[key]) {
                // Store original English text if not already stored
                if (!element.hasAttribute('data-original-text')) {
                    // Only use innerHTML for elements that contain HTML formatting
                    if (key === 'aboutBackgroundText' || key === 'aboutExperienceDescription') {
                        element.setAttribute('data-original-text', element.innerHTML);
                    } else {
                        element.setAttribute('data-original-text', element.textContent);
                    }
                }
                
                // Special handling for elements that need HTML formatting (like line breaks)
                if (key === 'aboutBackgroundText' || key === 'aboutExperienceDescription') {
                    element.innerHTML = translations[key].replace(/\n\n/g, '<br><br>');
                } else {
                    element.textContent = translations[key];
                }
            }
        });

        // Update page title to Spanish
        const titleElement = document.querySelector('title');
        if (titleElement && translations.pageTitle) {
            if (!titleElement.hasAttribute('data-original-text')) {
                titleElement.setAttribute('data-original-text', titleElement.textContent);
            }
            titleElement.textContent = translations.pageTitle;
        }

        // Update CV link to Spanish version
        const cvLink = document.querySelector('[data-cv-link]');
        if (cvLink) {
            if (!cvLink.hasAttribute('data-original-href')) {
                cvLink.setAttribute('data-original-href', cvLink.href);
            }
            cvLink.href = 'files/CV_ES_AitorDiez.pdf';
        }
    }

    loadTranslations() {
        // Only Spanish translations needed - English text stays in HTML
        this.translations.es = {
            // Navigation
            navHome: "Inicio",
            navAbout: "Sobre Mí",
            navProjects: "Proyectos",
            
            // Home page
            pageTitle: "Inicio",
            heroIntro: "Hola mundo, mi nombre es",
            heroBadge: "Ciencia de Datos & IA • Ingeniería Informática",
            heroDesc: "Soy un estudiante de Ingeniería Informática y Ciencia de Datos al que le encanta transformar datos complicados en ideas útiles. Disfruto explorando el aprendizaje automático, construyendo proyectos innovadores y aplicando tecnología para resolver problemas del mundo real. Actualmente, me enfoco en desarrollar modelos predictivos y soluciones analíticas que generen impacto en el ámbito empresarial y tecnológico.",
            btnSendMail: "Enviar un correo",
            btnViewResume: "Ver Currículum",
            
            // About page
            aboutPageTitle: "Sobre Mí",
            aboutNavigation: "Navegación",
            aboutNavIntro: "Introducción",
            aboutNavBackground: "Trasfondo",
            aboutNavEducation: "Educación", 
            aboutNavExperience: "Experiencia",
            aboutNavSkills: "Habilidades Técnicas",
            aboutNavCertifications: "Certificaciones",
            aboutNavGallery: "Galería Personal",
            aboutNavInterests: "Intereses",
            aboutTitle: "Sobre Mí",
            aboutIntroText: "¡Hola! Soy Aitor Díez Mateo, estudio Ingeniería Informática y Ciencia de Datos. Me encanta todo lo que tenga que ver con transformar datos complicados en ideas útiles. Creo mucho en cómo la tecnología puede ayudarnos a resolver problemas reales y marcar la diferencia.",
            aboutBackgroundTitle: "Contexto personal",
            aboutBackgroundText: "Desde que era pequeño, me ha apasionado la forma en que funciona el mundo. Recuerdo pasar horas explorando ideas, haciendo preguntas y disfrutando la emoción de resolver problemas, ya fueran problemas matemáticos o simplemente descifrar cómo encajan las cosas.\n\nMi amor por las matemáticas creció naturalmente hacia una atracción por los grandes desafíos, donde la paciencia y la creatividad van de la mano. Al mismo tiempo, la tecnología me fascinó, no solo como una herramienta, sino como algo que constantemente remodela cómo vivimos, nos conectamos y entendemos el mundo.\n\nSobre todo, la curiosidad siempre ha sido mi fuerza motriz. Me encanta aprender, descubrir nuevas perspectivas y encontrar belleza en el proceso de entender. Para mí, cada desafío no es solo un problema que resolver, sino una oportunidad para crecer.",
            
            // Education section
            aboutEducationDegree: "Doble Grado en Ingeniería Informática y Ciencia de Datos e IA",
            aboutEducationInstitution: "Universidad de Deusto, España",
            aboutEducationDuration: "Sept. 2022 - Junio 2027",
            aboutEducationDescription: "Actualmente cursando un programa integral que combina la informática tradicional con ciencia de datos e inteligencia artificial de vanguardia. El currículum cubre desde principios de ingeniería de software hasta algoritmos avanzados de aprendizaje automático, análisis estadístico y procesamiento de big data.",
            aboutEducationGPA: "GPA:",
            aboutEducationAverage: "Nota media:",
            aboutEducationCoursework: "Materias Clave:",
            aboutEducationCourse1: "Algoritmos Avanzados y Estructuras de Datos",
            aboutEducationCourse2: "Aprendizaje Automático y Aprendizaje Profundo",
            aboutEducationCourse3: "Análisis Estadístico y Minería de Datos",
            aboutEducationCourse4: "Ingeniería de Software y Diseño de Sistemas",
            aboutEducationCourse5: "Sistemas de Bases de Datos y Tecnologías de Big Data",
            aboutEducationCourse6: "Visión por Computador y Procesamiento de Lenguaje Natural",
            aboutEducationHonors: "Matrículas de Honor:",
            aboutHonor1: "Cálculo",
            aboutHonor2: "Estructura de Computadores",
            aboutHonor3: "Bases de Datos (SQL)",
            aboutHonor4: "Programación de Aplicaciones (Java)",
            aboutHonor5: "Metodología y Lenguajes de Programación",
            aboutHonor6: "Ciencia de Datos (R)",
            aboutHonor7: "Estadística Avanzada",
            aboutHonor8: "Programación de Bajo Nivel (C/C++)",
            aboutHonor9: "Modelado Avanzado de la Información",
            aboutHonor10: "Procesamiento de Big Data (PySpark)",
            aboutHonor11: "Aprendizaje Profundo (PyTorch)",
            
            // Experience section
            aboutExperienceTitle: "Experiencia",
            aboutExperienceJobTitle: "Becario de Investigación en Aprendizaje Automático",
            aboutExperienceCompany: "DeustoTech, Bilbao, España",
            aboutExperienceDuration: "Febrero 2024 - Presente",
            aboutExperienceDescription: "Beca concedida en el Grupo de Investigación Sostenible de Deusto, enfocándose en el campo de Energía en Edificios bajo la supervisión del <a href=\"https://www.robertogaray.com\">Dr. Roberto Garay Martínez</a>. Desarrollé e implementé modelos predictivos para estimar el consumo eléctrico en edificios basándose en variables exógenas, contribuyendo a la investigación sobre eficiencia energética y optimización de Smart Grid.",
            
            // Skills section
            aboutSkillsTitle: "Habilidades Técnicas",
            aboutSkillsProgramming: "Lenguajes de Programación",
            aboutSkillsML: "Aprendizaje Automático e IA",
            aboutSkillsData: "Análisis de Datos y Visualización",
            aboutSkillsWeb: "Desarrollo Web",
            aboutSkillsTools: "Herramientas y Plataformas",
            aboutSkillsProgrammingTable: "Competencia en Lenguajes de Programación",
            aboutSkillsLanguageTable: "Competencia Lingüística",
            aboutSkillsTableLanguage: "Idioma",
            aboutSkillsTableProficiency: "Nivel de Competencia",
            aboutSkillsTableLevel: "Nivel",
            aboutSkillsSpanish: "Español",
            aboutSkillsEnglish: "Inglés",
            aboutSkillsBasque: "Euskera",
            aboutSkillsNative: "Nativo",
            
            // Certifications section
            aboutCertificationsTitle: "Certificaciones",
            aboutCert1Title: "Ciencia de Datos Aplicada con Python",
            aboutCert1Issuer: "Emitido por IBM",
            aboutCert1Date: "Julio 2024",
            aboutCert1Description: "Especialización integral que cubre todo el pipeline de ciencia de datos usando Python, incluyendo análisis de datos, visualización y técnicas de aprendizaje automático.",
            aboutCert2Title: "Análisis de Datos con Python",
            aboutCert2Issuer: "Emitido por IBM", 
            aboutCert2Date: "Julio 2024",
            aboutCert2Description: "Técnicas avanzadas de análisis de datos usando librerías de Python incluyendo Pandas, NumPy y métodos estadísticos para extraer insights de conjuntos de datos complejos.",
            aboutCert3Title: "Visualización de Datos con Python",
            aboutCert3Issuer: "Emitido por IBM",
            aboutCert3Date: "Julio 2024", 
            aboutCert3Description: "Creación de visualizaciones de datos atractivas y dashboards usando librerías de Python como Matplotlib, Seaborn y Plotly para narrativa efectiva de datos.",
            aboutCert4Title: "Python para Ciencia de Datos",
            aboutCert4Issuer: "Emitido por IBM",
            aboutCert4Date: "Julio 2024",
            aboutCert4Description: "Curso fundamental que cubre los fundamentos de programación Python específicamente adaptados para aplicaciones de ciencia de datos, incluyendo estructuras de datos y algoritmos.",
            aboutCert5Title: "Introducción al Aprendizaje Automático Cuántico y Optimización Cuántica",
            aboutCert5Issuer: "Emitido por la Universidad de Deusto",
            aboutCert5Date: "Septiembre 2025 - Noviembre 2025",
            aboutCert5Description: "Curso fundamental que cubre los principios de la computación cuántica y una introducción a algoritmos de aprendizaje automático cuántico y técnicas de optimización cuántica.",
            aboutCert5Credential: "Credencial no disponible hasta completar",
            aboutCertViewCredential: "Ver Credencial",
            
            // Gallery section
            aboutGalleryTitle: "Galería Personal",
            aboutGalleryIntro: "Un vistazo a mi mundo a través de algunos momentos personales que definen quién soy más allá de lo académico y la tecnología.",
            
            // Interests section
            aboutInterestsTitle: "Intereses y Pasiones",
            aboutInterestsTech: "💻 Tecnología",
            aboutInterestsTechDesc: "Apasionado por la evolución de la tecnología y su impacto en la sociedad. Me encanta explorar cómo la innovación da forma a nuestro mundo. Disfruto especialmente trabajando con Inteligencia Artificial y descubriendo nuevas formas de aprovechar su potencial para resolver desafíos del mundo real.",
            aboutInterestsSports: "🏃‍♂️ Deporte y Bienestar",
            aboutInterestsSportsDesc: "Corredor habitual y entusiasta del fitness. Encuentro que la actividad física me ayuda a mantenerme enfocado y creativo en mi trabajo técnico.",
            aboutInterestsFamily: "👨‍👩‍👧‍👦 Familia y Amigos",
            aboutInterestsFamilyDesc: "Valoro profundamente el tiempo pasado con la familia y amigos cercanos. Creo que las relaciones personales sólidas proporcionan la base para el crecimiento personal y el éxito. Disfruto compartiendo experiencias, aprendiendo de otros y creando recuerdos duraderos juntos.",
            
            // Projects page  
            projectsPageTitle: "Proyectos",
            projectsNavigation: "Proyectos",
            projectsTitle: "Mis Proyectos",
            projectsIntro: "Una colección de mi trabajo que abarca aprendizaje automático y ciencia de datos. Cada proyecto representa un viaje de aprendizaje y demuestra diferentes aspectos de mis habilidades técnicas.",
            
            // Projects navigation
            projectNav1: "Análisis de Carga Térmica de Edificios",
            projectNav2: "Predicciones Changepoint",
            projectNav3: "Simpsons DaVinci",
            projectNav4: "Recomendador de Películas",
            projectNav5: "Riesgo de Impago Home Credit",
            projectNav6: "Demos de PySpark",
            
            // Project 1: Building Heat Load Analysis
            project1Title: "Análisis de Carga Térmica de Edificios",
            project1Description: "Reimplementación en Python de un pipeline de investigación la para caracterización de carga térmica de edificios, migrando una metodología de R a un flujo de trabajo Snakemake reproducible y listo para HPC. Modela el comportamiento energético por horas con firmas de puntos de cambio, agrupa patrones diarios típicos con K-means, y entrena modelos CART para producir salidas listas para predicción y diagnósticos detallados.",
            
            // Project 2: Predictions Changepoint
            project2Title: "Predicciones Changepoint",
            project2Description: "Un sistema Python listo para producción para pronósticos de cargas energéticas de edificios usando un pipeline de ML de dos etapas: primero clasifica los días en clusters a partir de características meteorológicas y temporales, luego predice cargas por horas con modelos lineales específicos de cada cluster. Soporta predicciones por lotes con modelos .pkl de scikit-learn y parámetros CSV, y está basado en investigación revisada por pares de changepoint, clustering y CART.",
            
            // Project 3: Simpsons DaVinci
            project3Title: "Simpsons DaVinci",
            project3Description: "Simpsons-DaVinci es un proyecto integral de aprendizaje profundo que implementa y evalúa múltiples arquitecturas de Redes Generativas Adversarias (GAN), incluyendo DCGAN, Wasserstein GAN, Autoencoder-GAN y StyleGAN2, para generar imágenes sintéticas en el estilo distintivo de dibujos animados de Los Simpsons, proporcionando insights sobre estabilidad de entrenamiento, calidad de imagen y rendimiento arquitectónico entre diferentes modelos generativos.",
            
            // Project 4: Movie Recommender
            project4Title: "Recomendador de Películas",
            project4Description: "Un recomendador de películas de aprendizaje profundo construido sobre MovieLens 100k, comparando NCF, NeuMF híbrido con características de contenido, y un autoencoder entre tareas de clasificación y regresión.",
            
            // Project 5: Home Credit Default Risk
            project5Title: "Riesgo de Impago Home Credit",
            project5Description: "Un pipeline de ML de extremo a extremo para riesgo crediticio: desde datos desordenados hasta modelos explicables listos para producción, aprovechando ADASYN, Optuna y ALE para pasar de conjeturas básicas a predicciones de alta precisión adecuadas para préstamos responsables.",
            
            // Project 6: PySpark Demos
            project6Title: "Demos de PySpark",
            project6Description: "Demostración de Procesamiento de Big Data con PySpark: Proyectos Spark de extremo a extremo que incluyen sistemas de recomendación (películas), análisis de streaming en tiempo real con Kafka, y modelos predictivos MLlib en datos de taxis de NYC, todo orquestado con pipelines de Airflow de grado de producción. Demuestra computación distribuida escalable, ingeniería de características rigurosa y selección de modelos, y automatización de flujos de trabajo confiable con análisis claro, visualizaciones y reportes.",
            
            // Footer
            footerCopyright: "© 2025 Aitor Díez Mateo"
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});