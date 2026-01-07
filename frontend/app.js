// Application Data
const appData = {
  kpis: {
    activeLots: 24,
    expiringLots: 3,
    lowStockProducts: 5,
    activeAlerts: 8
  },
  chartData: {
    stockLevels: [
      {"product": "Premium Chiapas", "stock": 85},
      {"product": "Orgánico Veracruz", "stock": 42},
      {"product": "Descafeinado", "stock": 23},
      {"product": "Espresso Blend", "stock": 67},
      {"product": "Colombia Supremo", "stock": 91},
      {"product": "Guatemala Antigua", "stock": 18}
    ],
    alertsByType: [
      {"type": "Caducidad", "count": 5},
      {"type": "Stock Bajo", "count": 3},
      {"type": "Sistema", "count": 2}
    ]
  },
  lots: [
    {"code": "LOT-2025-015", "product": "Premium Chiapas", "origin": "Chiapas", "roast": "Medio", "initialWeight": "50kg", "currentWeight": "35kg", "roastDate": "2025-09-15", "expiration": "2025-10-15", "status": "Activo"},
    {"code": "LOT-2025-014", "product": "Orgánico Veracruz", "origin": "Veracruz", "roast": "Claro", "initialWeight": "25kg", "currentWeight": "8kg", "roastDate": "2025-09-10", "expiration": "2025-10-10", "status": "Stock Bajo"},
    {"code": "LOT-2025-013", "product": "Espresso Blend", "origin": "México", "roast": "Oscuro", "initialWeight": "40kg", "currentWeight": "25kg", "roastDate": "2025-09-12", "expiration": "2025-10-12", "status": "Activo"},
    {"code": "LOT-2025-012", "product": "Premium Chiapas", "origin": "Chiapas", "roast": "Medio", "initialWeight": "30kg", "currentWeight": "12kg", "roastDate": "2025-09-08", "expiration": "2025-10-08", "status": "Por Caducar"},
    {"code": "LOT-2025-011", "product": "Descafeinado", "origin": "Oaxaca", "roast": "Medio", "initialWeight": "20kg", "currentWeight": "18kg", "roastDate": "2025-09-05", "expiration": "2025-10-05", "status": "Activo"},
    {"code": "LOT-2025-010", "product": "Colombia Supremo", "origin": "Colombia", "roast": "Medio", "initialWeight": "45kg", "currentWeight": "32kg", "roastDate": "2025-09-01", "expiration": "2025-10-01", "status": "Activo"},
    {"code": "LOT-2025-009", "product": "Guatemala Antigua", "origin": "Guatemala", "roast": "Claro", "initialWeight": "30kg", "currentWeight": "5kg", "roastDate": "2025-08-28", "expiration": "2025-09-28", "status": "Stock Bajo"}
  ],
  products: [
    {"id": 1, "name": "Premium Chiapas", "origin": "Chiapas", "grainType": "Arábica", "presentations": ["250g", "500g", "1kg"], "currentStock": 85, "minStock": 20, "status": "available", "unitPrice": 180, "description": "Café premium de las montañas de Chiapas"},
    {"id": 2, "name": "Orgánico Veracruz", "origin": "Veracruz", "grainType": "Arábica", "presentations": ["250g", "500g"], "currentStock": 15, "minStock": 25, "status": "low", "unitPrice": 220, "description": "Café orgánico certificado de Veracruz"},
    {"id": 3, "name": "Descafeinado", "origin": "Oaxaca", "grainType": "Arábica", "presentations": ["250g", "500g", "1kg"], "currentStock": 23, "minStock": 15, "status": "available", "unitPrice": 195, "description": "Café descafeinado mediante proceso suizo"},
    {"id": 4, "name": "Espresso Blend", "origin": "México", "grainType": "Arábica", "presentations": ["500g", "1kg"], "currentStock": 67, "minStock": 30, "status": "available", "unitPrice": 165, "description": "Mezcla especial para espresso"},
    {"id": 5, "name": "Colombia Supremo", "origin": "Colombia", "grainType": "Arábica", "presentations": ["250g", "500g", "1kg"], "currentStock": 91, "minStock": 25, "status": "available", "unitPrice": 240, "description": "Café colombiano grado supremo"},
    {"id": 6, "name": "Guatemala Antigua", "origin": "Guatemala", "grainType": "Arábica", "presentations": ["250g", "500g"], "currentStock": 18, "minStock": 20, "status": "low", "unitPrice": 260, "description": "Café de la región de Antigua Guatemala"}
  ],
  labelTemplates: [
    {"id": 1, "name": "Etiqueta Estándar", "size": "5x7cm", "fields": ["nombre", "origen", "tueste", "fechaCaducidad", "codigoQR"], "description": "Plantilla básica para uso general"},
    {"id": 2, "name": "Etiqueta Premium", "size": "7x10cm", "fields": ["nombre", "origen", "tueste", "peso", "fechaCaducidad", "descripcion", "codigoQR", "logo"], "description": "Plantilla completa con logo y descripción"},
    {"id": 3, "name": "Etiqueta Compacta", "size": "4x5cm", "fields": ["nombre", "fechaCaducidad", "codigoQR"], "description": "Plantilla minimalista para espacios reducidos"},
    {"id": 4, "name": "Etiqueta Promocional", "size": "6x8cm", "fields": ["nombre", "precio", "descuento", "fechaCaducidad", "codigoQR"], "description": "Plantilla para productos en oferta"}
  ],
  alerts: [
    {"id": 1, "type": "expiration", "priority": "high", "title": "Lote próximo a caducar", "message": "El lote LOT-2025-012 (Premium Chiapas) caduca en 3 días", "product": "Premium Chiapas", "lotCode": "LOT-2025-012", "date": "2025-09-20", "status": "active", "assignedTo": "Almacenista"},
    {"id": 2, "type": "stock", "priority": "medium", "title": "Stock bajo mínimo", "message": "Orgánico Veracruz tiene solo 15 unidades (mínimo: 25)", "product": "Orgánico Veracruz", "currentStock": 15, "minStock": 25, "date": "2025-09-20", "status": "active", "assignedTo": "Administrador"},
    {"id": 3, "type": "expiration", "priority": "medium", "title": "Lote próximo a caducar", "message": "El lote LOT-2025-009 (Guatemala Antigua) caduca en 5 días", "product": "Guatemala Antigua", "lotCode": "LOT-2025-009", "date": "2025-09-19", "status": "active", "assignedTo": "Almacenista"},
    {"id": 4, "type": "stock", "priority": "high", "title": "Stock crítico", "message": "Guatemala Antigua por debajo del mínimo: 18/20 unidades", "product": "Guatemala Antigua", "currentStock": 18, "minStock": 20, "date": "2025-09-19", "status": "active", "assignedTo": "Administrador"},
    {"id": 5, "type": "system", "priority": "low", "title": "Respaldo completado", "message": "Respaldo automático de datos completado exitosamente", "date": "2025-09-20", "status": "resolved", "assignedTo": "Sistema"},
    {"id": 6, "type": "system", "priority": "medium", "title": "Actualización disponible", "message": "Nueva versión del sistema disponible v2.1.3", "date": "2025-09-18", "status": "pending", "assignedTo": "Administrador"}
  ],
  users: [
    {"id": 1, "name": "María González", "email": "maria@mexhicafe.com", "role": "Administrador", "status": "activo", "lastLogin": "2025-09-20 14:30", "permissions": ["dashboard", "lots", "labels", "products", "alerts", "reports", "users"], "createdDate": "2025-01-15"},
    {"id": 2, "name": "Carlos Martínez", "email": "carlos@mexhicafe.com", "role": "Almacenista", "status": "activo", "lastLogin": "2025-09-20 09:15", "permissions": ["dashboard", "lots", "labels", "products", "alerts"], "createdDate": "2025-02-10"},
    {"id": 3, "name": "Ana López", "email": "ana@mexhicafe.com", "role": "Barista", "status": "activo", "lastLogin": "2025-09-20 08:45", "permissions": ["dashboard_limited", "products_readonly", "alerts_readonly"], "createdDate": "2025-03-05"},
    {"id": 4, "name": "Pedro Hernández", "email": "pedro@mexhicafe.com", "role": "Almacenista", "status": "inactivo", "lastLogin": "2025-09-10 16:20", "permissions": ["dashboard", "lots", "labels", "products", "alerts"], "createdDate": "2025-01-20"},
    {"id": 5, "name": "Laura Jiménez", "email": "laura@mexhicafe.com", "role": "Barista", "status": "activo", "lastLogin": "2025-09-19 19:30", "permissions": ["dashboard_limited", "products_readonly", "alerts_readonly"], "createdDate": "2025-04-12"}
  ],
  reports: [
    {"id": 1, "name": "Inventario Actual", "type": "inventory", "description": "Estado actual de todos los lotes en inventario", "frequency": "Semanal", "lastGenerated": "2025-09-20", "format": "PDF"},
    {"id": 2, "name": "Análisis de Mermas", "type": "waste", "description": "Reporte de productos vencidos y mermas del período", "frequency": "Mensual", "lastGenerated": "2025-09-01", "format": "CSV"},
    {"id": 3, "name": "Movimientos de Stock", "type": "movements", "description": "Entradas y salidas de inventario detalladas", "frequency": "Diario", "lastGenerated": "2025-09-20", "format": "Excel"},
    {"id": 4, "name": "Resumen Ejecutivo", "type": "executive", "description": "Indicadores clave para toma de decisiones", "frequency": "Semanal", "lastGenerated": "2025-09-18", "format": "PDF"}
  ],
  userRoles: [
    {"id": "admin", "name": "Administrador", "permissions": ["dashboard", "lots", "labels", "products", "alerts", "reports", "users", "logs"], "description": "Acceso completo al sistema"},
    {"id": "warehouse", "name": "Almacenista", "permissions": ["dashboard", "lots", "labels", "products", "alerts"], "description": "Gestión de inventario y operaciones"},
    {"id": "barista", "name": "Barista", "permissions": ["dashboard_limited", "products_readonly", "alerts_readonly"], "description": "Consultas básicas y operación diaria"}
  ],
  sessionLogs: [
    {"usuario": "María González", "email": "admin@mexhi.com", "accion": "Login Exitoso", "fecha": "2025-10-02 09:30", "ip": "192.168.1.100", "navegador": "Chrome 118", "estado": "success"},
    {"usuario": "Carlos Martínez", "email": "carlos@mexhi.com", "accion": "Login Exitoso", "fecha": "2025-10-02 08:15", "ip": "192.168.1.105", "navegador": "Firefox 119", "estado": "success"},
    {"usuario": "Ana López", "email": "ana@mexhi.com", "accion": "Login Fallido", "fecha": "2025-10-02 07:45", "ip": "192.168.1.110", "navegador": "Safari 17", "estado": "failed"},
    {"usuario": "María González", "email": "admin@mexhi.com", "accion": "Logout", "fecha": "2025-10-02 17:45", "ip": "192.168.1.100", "navegador": "Chrome 118", "estado": "success"},
    {"usuario": "Carlos Martínez", "email": "carlos@mexhi.com", "accion": "Crear Lote", "fecha": "2025-10-02 10:30", "ip": "192.168.1.105", "navegador": "Firefox 119", "estado": "success"},
    {"usuario": "Ana López", "email": "ana@mexhi.com", "accion": "Login Exitoso", "fecha": "2025-10-02 08:00", "ip": "192.168.1.110", "navegador": "Safari 17", "estado": "success"},
    {"usuario": "Pedro Hernández", "email": "pedro@mexhi.com", "accion": "Login Fallido", "fecha": "2025-10-01 16:20", "ip": "192.168.1.115", "navegador": "Edge 118", "estado": "failed"}
  ],
  manualSections: [
    {"id": "start", "title": "Primeros Pasos", "content": "<p>Bienvenido a Mexhi Coffee Manager. Esta sección describe los requisitos de navegador y cómo iniciar sesión.</p><p>Para comenzar, usa el menú lateral para acceder a los módulos.</p><ul><li>Inicia sesión con tus credenciales.</li><li>Selecciona tu módulo de interés en la barra lateral.</li><li>Sigue las instrucciones en pantalla.</li></ul>"},
    {"id": "dashboard", "title": "Dashboard", "content": "<p>El Dashboard muestra métricas clave de stock y alertas.</p><p>Usa los KPIs para tomar decisiones rápidas.</p><ul><li>Revisa Lotes Activos y Por Caducar.</li><li>Monitorea Productos en Stock Bajo.</li><li>Haz clic en alertas para más detalles.</li></ul>"},
    {"id": "lots", "title": "Gestión de Lotes", "content": "<p>En este módulo puedes crear, editar y dar seguimiento a los lotes de café.</p><p>Filtra por origen, tueste y fecha para ubicar lotes.</p><ul><li>Haz clic en \"Nuevo Lote\" para registrar.</li><li>Usa filtros avanzados para buscar.</li><li>Selecciona acciones rápidas (Editar, Eliminar, Etiqueta).</li></ul>"},
    {"id": "labels", "title": "Generación de Etiquetas", "content": "<p>Configura e imprime etiquetas para cada lote o producto.</p><p>Selecciona una plantilla y ajusta los campos necesarios.</p><ul><li>Selecciona plantilla en la lista.</li><li>Elige producto y lote.</li><li>Define cantidad y haz clic en \"Generar Etiquetas\".</li></ul>"},
    {"id": "products", "title": "Gestión de Productos", "content": "<p>Administra el catálogo de productos y sus stocks mínimos.</p><p>Usa el botón \"Nuevo Producto\" para agregar.</p><ul><li>Filtra por origen o tipo de grano.</li><li>Actualiza stock mínimo según necesidad.</li><li>Observa indicadores de stock bajo.</li></ul>"},
    {"id": "alerts", "title": "Gestión de Alertas", "content": "<p>Gestiona alertas de caducidad y stock bajo.</p><p>Prioriza por nivel de severidad.</p><ul><li>Revisa la lista de alertas activas.</li><li>Marca como resueltas una vez atendidas.</li><li>Ajusta umbrales en Configuración.</li></ul>"},
    {"id": "reports", "title": "Reportes", "content": "<p>Genera reportes detallados para inventario y ventas.</p><p>Puedes exportar en PDF, CSV o Excel.</p><ul><li>Define rango de fechas y filtros.</li><li>Haz clic en \"Generar Reporte\".</li><li>Descarga el archivo generado.</li></ul>"},
    {"id": "users", "title": "Administración de Usuarios", "content": "<p>Crea y administra cuentas de usuario y permisos.</p><p>Solo disponible para Administradores.</p><ul><li>Haz clic en \"Nuevo Usuario\".</li><li>Define rol y estado.</li><li>Guarda cambios para activar la cuenta.</li></ul>"},
    {"id": "troubleshooting", "title": "Resolución de Problemas", "content": "<p>Encuentra soluciones a problemas comunes.</p><p>Busca tu error o revisa las preguntas frecuentes.</p><ul><li>Verifica tu conexión a internet.</li><li>Actualiza la página y vuelve a intentar.</li><li>Contacta soporte si persiste.</li></ul>"}
  ]
};
async function apiRequest(endpoint, options = {}) {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        ...options
    };
    try {
        const response = await fetch(`http://localhost:3000${endpoint}`, config);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        showToast('Backend no disponible', 'error');
        return null;
    }
}

// Application State
let currentView = 'dashboard';
let currentRole = 'admin';
let stockChart = null;
let alertsChart = null;
let selectedUserId = null;
let selectedTemplate = null;
let currentManualSection = 'start';
let isLoggedIn = false;
let currentUser = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupLoginListeners();
    setupEventListeners();
}

// Login Functions
function setupLoginListeners() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    console.log('🔥 LOGIN INTENTADO');  // ← DEBUG
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Credenciales:', username, password);  // ← DEBUG
    
    if (!username || !password) {
        showToast('Complete todos los campos', 'error');
        return;
    }

    showToast('🔄 Conectando backend...', 'info');  // ← VISIBLE
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo: username, contrasena: password })
        });
        
        const resultado = await response.json();
        console.log('Backend respuesta:', resultado);  // ← DEBUG
        
        if (resultado.success) {
            isLoggedIn = true;
            currentUser = resultado.usuario;
            
            // ⭐ ⭐ ⭐ AQUÍ VA EL CÓDIGO DE TOKEN ⭐ ⭐ ⭐
            if (resultado.token) {
                localStorage.setItem('authToken', resultado.token);
                localStorage.setItem('userRole', resultado.usuario.rol);
                if (typeof api !== 'undefined') {
                    api.token = resultado.token; // Actualizar cliente API
                }
            }
            // ⭐ ⭐ ⭐ FIN ⭐ ⭐ ⭐
            
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('mainApp').classList.remove('hidden');
            
            document.getElementById('currentUserName').textContent = currentUser.nombre || username;
            updateRoleBasedUI();
            loadDashboardData();
            showToast(`¡Bienvenido ${currentUser.nombre}!`, 'success');
        } else {
            showToast(resultado.error || 'Error desconocido', 'error');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showToast('Backend no responde (ver consola)', 'error');
    }
}



function handleLogout() {
    if (confirm('¿Está seguro de cerrar sesión?')) {
        isLoggedIn = false;
        currentUser = null;
        
        // Mostrar inicio de Sesion
        const loginScreen = document.getElementById('loginScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (loginScreen) {
            loginScreen.classList.remove('hidden');
        }
        
        if (mainApp) {
            mainApp.classList.add('hidden');
        }
        
        // Forma clean
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.reset();
        }
        
        // Reiniciar estado app
        currentView = 'dashboard';
        selectedUserId = null;
        selectedTemplate = null;
        
        showToast('Sesión cerrada exitosamente', 'info');
    }
}

function setupEventListeners() {
    // Sidebar
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Links de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const viewName = this.getAttribute('data-view');
            if (viewName && currentView !== viewName) {
                switchView(viewName);
            }
        });
    });
    
    // Seleccion de roles
    const roleSelector = document.getElementById('roleSelector');
    if (roleSelector) {
        roleSelector.addEventListener('change', function(e) {
    if (currentUser.rol !== 'admin') {
        showToast('Solo Administrador puede cambiar rol', 'error');
        this.value = currentRole;  // Revertir
        return;
    }
    currentRole = this.value;
    updateRoleBasedUI();
    showToast(`Rol cambiado a ${this.value}`, 'success');
});
    }
    
    // Modal event listeners
    setupModalListeners();
    
    // Filter event listeners
    setupFilterListeners();
    
    // Search functionality
    setupSearchListeners();
    
    // Action button listeners
    setupActionListeners();
    
    // Responsive sidebar for mobile
    window.addEventListener('resize', handleResize);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar && mainContent) {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
    }
}

function switchView(viewName) {
    const validViews = ['dashboard', 'lots', 'labels', 'products', 'alerts', 'reports', 'users', 'logs', 'manual'];
    if (!validViews.includes(viewName)) {
        return;
    }
    
    // Esconder todas las vistas
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.classList.remove('active');
    });
    
    // Target View
    const targetView = document.getElementById(viewName);
    if (targetView) {
        targetView.classList.add('active');
    } else {
        return;
    }
    
    // Actualizacon de navegacion
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-view="${viewName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update breadcrumb
    updateBreadcrumb(viewName);
    
    // Load view-specific data
    loadViewData(viewName);
    
    currentView = viewName;
}

function updateBreadcrumb(viewName) {
    const breadcrumbMap = {
        'dashboard': 'Dashboard',
        'lots': 'Gestión de Lotes',
        'labels': 'Configuración de Etiquetas',
        'products': 'Catálogo de Productos',
        'alerts': 'Centro de Alertas',
        'reports': 'Centro de Reportes',
        'users': 'Gestión de Usuarios',
        'logs': 'Log de Sesiones',
        'manual': 'Manual de Usuario'
    };
    
    const breadcrumbText = document.getElementById('breadcrumbText');
    if (breadcrumbText) {
        breadcrumbText.textContent = breadcrumbMap[viewName] || 'Dashboard';
    }
}

function updateRoleBasedUI() {
    const role = appData.userRoles.find(r => r.id === currentRole);
    if (!role) return;
    
    // Show/hide navigation items based on role permissions
    const navItems = {
        'lots': '.nav-item-lots',
        'labels': '.nav-item-labels',
        'products': '.nav-item-products',
        'alerts': '.nav-item-alerts',
        'reports': '.nav-item-reports',
        'users': '.nav-item-users',
        'logs': '.nav-item-logs'
    };
    
    Object.entries(navItems).forEach(([permission, selector]) => {
        const element = document.querySelector(selector);
        if (element) {
            if (role.permissions.includes(permission) || role.permissions.includes(permission + '_readonly')) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        }
    });
    
    // Update role selector display
    const roleSelector = document.getElementById('roleSelector');
    if (roleSelector) {
        roleSelector.value = currentRole;
    }
    
    // Reload current view data to apply role restrictions
    loadViewData(currentView);
}

function getRoleName(roleId) {
    const role = appData.userRoles.find(r => r.id === roleId);
    return role ? role.name : roleId;
}

function loadViewData(viewName) {
    switch(viewName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'lots':
            loadLotsData();
            break;
        case 'labels':
            loadLabelsData();
            break;
        case 'products':
            loadProductsData();
            break;
        case 'alerts':
            loadAlertsData();
            break;
        case 'reports':
            loadReportsData();
            break;
        case 'users':
            loadUsersData();
            break;
        case 'logs':
            loadLogsData();
            break;
        case 'manual':
            loadManualData();
            break;
    }
}

function loadDashboardData() {
    // Load recent alerts
    const alertsList = document.getElementById('recentAlertsList');
    if (alertsList) {
        const recentAlerts = appData.alerts.filter(alert => alert.status === 'active').slice(0, 3);
        alertsList.innerHTML = recentAlerts.map(alert => `
            <div class="alert-item ${alert.priority}">
                <div class="alert-icon">
                    <i class="fas fa-${getAlertIcon(alert.type)}"></i>
                </div>
                <div class="alert-content">
                    <p><strong>${alert.message}</strong></p>
                    <p class="alert-date">${formatDate(alert.date)} - ${alert.product}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Load recent lots
    const lotsTable = document.getElementById('recentLotsTable');
    if (lotsTable) {
        const recentLots = appData.lots.slice(0, 5);
        lotsTable.innerHTML = recentLots.map(lot => `
            <tr>
                <td><strong>${lot.code}</strong></td>
                <td>${lot.product}</td>
                <td>${lot.origin}</td>
                <td><span class="status-badge ${getStatusClass(lot.status)}">${lot.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view" title="Ver" onclick="viewLot('${lot.code}')"><i class="fas fa-eye"></i></button>
                        <button class="action-btn edit" title="Editar" onclick="editLot('${lot.code}')"><i class="fas fa-edit"></i></button>
                        <button class="action-btn label" title="Etiqueta" onclick="generateLabel('${lot.code}')"><i class="fas fa-tag"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    // Initialize charts
    setTimeout(() => {
        initializeStockChart();
        initializeAlertsChart();
    }, 100);
}

function loadLotsData() {
    const lotsTable = document.getElementById('lotsTable');
    if (lotsTable) {
        let filteredLots = filterLots(appData.lots);
        
        lotsTable.innerHTML = filteredLots.map(lot => `
            <tr>
                <td><strong>${lot.code}</strong></td>
                <td>${lot.product}</td>
                <td>${lot.origin}</td>
                <td>${lot.roast}</td>
                <td>${lot.initialWeight}</td>
                <td>${lot.currentWeight}</td>
                <td>${formatDate(lot.roastDate)}</td>
                <td>${formatDate(lot.expiration)}</td>
                <td><span class="status-badge ${getStatusClass(lot.status)}">${lot.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view" title="Ver" onclick="viewLot('${lot.code}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit" title="Editar" onclick="editLot('${lot.code}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" title="Eliminar" onclick="deleteLot('${lot.code}')">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="action-btn label" title="Generar Etiqueta" onclick="generateLabel('${lot.code}')">
                            <i class="fas fa-tag"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

function loadLabelsData() {
    // Load template cards
    const templateCards = document.getElementById('templateCards');
    if (templateCards) {
        templateCards.innerHTML = appData.labelTemplates.map(template => `
            <div class="template-card" data-template-id="${template.id}" onclick="selectTemplate(${template.id})">
                <h4>${template.name}</h4>
                <p>Tamaño: ${template.size}</p>
                <p>${template.fields.length} campos</p>
                <p><small>${template.description}</small></p>
            </div>
        `).join('');
    }
    
    // Populate product and lot selectors
    populateProductSelector('labelProduct');
    populateLotSelector('labelLot');
}

function loadProductsData() {
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        let filteredProducts = filterProducts(appData.products);
        
        productsGrid.innerHTML = filteredProducts.map(product => {
            const stockPercentage = Math.min((product.currentStock / product.minStock) * 100, 100);
            const stockClass = product.status === 'low' ? 'low' : 
                              product.status === 'out' ? 'critical' : '';
            
            return `
                <div class="product-card">
                    <div class="product-image">
                        <i class="fas fa-coffee"></i>
                    </div>
                    <div class="product-content">
                        <h3>${product.name}</h3>
                        <div class="product-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${product.origin}</span>
                            <span><i class="fas fa-leaf"></i> ${product.grainType}</span>
                        </div>
                        <div class="stock-info">
                            <span>Stock: ${product.currentStock} / ${product.minStock}</span>
                            <span class="status-badge ${getStatusClass(product.status === 'available' ? 'Activo' : product.status === 'low' ? 'Stock Bajo' : 'Agotado')}">
                                ${product.status === 'available' ? 'Disponible' : product.status === 'low' ? 'Stock Bajo' : 'Agotado'}
                            </span>
                        </div>
                        <div class="stock-bar">
                            <div class="stock-progress ${stockClass}" style="width: ${stockPercentage}%"></div>
                        </div>
                        <div class="product-presentations">
                            <small><strong>Presentaciones:</strong> ${product.presentations.join(', ')}</small>
                        </div>
                        <div class="product-description">
                            <small>${product.description}</small>
                        </div>
                        <div style="margin-top: var(--space-12); text-align: center;">
                            <strong>$${product.unitPrice}/kg</strong>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function loadAlertsData() {
    const alertsContainer = document.getElementById('alertsContainer');
    if (alertsContainer) {
        let filteredAlerts = filterAlerts(appData.alerts);
        
        alertsContainer.innerHTML = filteredAlerts.map(alert => `
            <div class="alert-card ${alert.priority}">
                <div class="alert-card-content">
                    <div class="alert-type-icon ${alert.type}">
                        <i class="fas fa-${getAlertIcon(alert.type)}"></i>
                    </div>
                    <div class="alert-info">
                        <h4>${alert.title}</h4>
                        <p>${alert.message}</p>
                        <small>Asignado a: ${alert.assignedTo} | ${formatDate(alert.date)}</small>
                    </div>
                </div>
                <div class="alert-actions">
                    ${alert.status === 'active' ? `
                        <button class="btn btn--sm btn--outline" onclick="resolveAlert(${alert.id})">
                            <i class="fas fa-check"></i> Resolver
                        </button>
                        <button class="btn btn--sm btn--outline" onclick="dismissAlert(${alert.id})">
                            <i class="fas fa-times"></i> Descartar
                        </button>
                    ` : `
                        <span class="status-badge status-active">
                            ${alert.status === 'resolved' ? 'Resuelto' : 'Pendiente'}
                        </span>
                    `}
                </div>
            </div>
        `).join('');
    }
}

function loadReportsData() {
    // Load scheduled reports
    const scheduledReports = document.getElementById('scheduledReports');
    if (scheduledReports) {
        scheduledReports.innerHTML = appData.reports.map(report => `
            <div class="scheduled-item">
                <div class="report-info">
                    <h4>${report.name}</h4>
                    <p>${report.description}</p>
                    <small>Frecuencia: ${report.frequency} | Formato: ${report.format}</small>
                </div>
                <div class="report-actions">
                    <button class="btn btn--sm btn--outline" onclick="executeScheduledReport(${report.id})">
                        <i class="fas fa-play"></i> Ejecutar
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Load report history
    const reportsHistory = document.getElementById('reportsHistory');
    if (reportsHistory) {
        reportsHistory.innerHTML = appData.reports.map(report => `
            <div class="report-item">
                <div class="report-info">
                    <h4>${report.name}</h4>
                    <p>Último generado: ${formatDate(report.lastGenerated)}</p>
                </div>
                <div class="report-actions">
                    <button class="btn btn--sm btn--outline" onclick="downloadReport(${report.id})">
                        <i class="fas fa-download"></i> Descargar
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Set default dates
    const startDate = document.getElementById('reportStartDate');
    const endDate = document.getElementById('reportEndDate');
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    
    if (startDate) startDate.value = lastMonth.toISOString().split('T')[0];
    if (endDate) endDate.value = today.toISOString().split('T')[0];
}

function loadUsersData() {
    // Load users table
    const usersTable = document.getElementById('usersTable');
    if (usersTable) {
        let filteredUsers = filterUsers(appData.users);
        
        usersTable.innerHTML = filteredUsers.map(user => `
            <tr onclick="selectUser(${user.id})" style="cursor: pointer;" class="${selectedUserId === user.id ? 'selected-row' : ''}">
                <td>
                    <div style="display: flex; align-items: center; gap: var(--space-8);">
                        <i class="fas fa-user"></i>
                        <strong>${user.name}</strong>
                    </div>
                </td>
                <td>${user.email}</td>
                <td><span class="status-badge ${user.role === 'Administrador' ? 'status-active' : 'status-low'}">${user.role}</span></td>
                <td><span class="status-badge ${user.status === 'activo' ? 'status-active' : 'status-expiring'}">${user.status}</span></td>
                <td>${formatDateTime(user.lastLogin)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" title="Editar" onclick="editUser(${user.id}); event.stopPropagation();">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn ${user.status === 'activo' ? 'delete' : 'view'}" title="${user.status === 'activo' ? 'Desactivar' : 'Activar'}" onclick="toggleUserStatus(${user.id}); event.stopPropagation();">
                            <i class="fas fa-${user.status === 'activo' ? 'user-slash' : 'user-check'}"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    // Load permissions matrix
    loadPermissionsMatrix();
}

function loadPermissionsMatrix() {
    const permissionsMatrix = document.getElementById('permissionsMatrix');
    if (permissionsMatrix) {
        const allPermissions = ['dashboard', 'lots', 'labels', 'products', 'alerts', 'reports', 'users'];
        const permissionLabels = {
            'dashboard': 'Dashboard',
            'lots': 'Lotes',
            'labels': 'Etiquetas', 
            'products': 'Productos',
            'alerts': 'Alertas',
            'reports': 'Reportes',
            'users': 'Usuarios'
        };
        
        permissionsMatrix.innerHTML = allPermissions.map(permission => {
            const selectedUser = selectedUserId ? appData.users.find(u => u.id === selectedUserId) : null;
            const hasPermission = selectedUser ? selectedUser.permissions.includes(permission) || selectedUser.permissions.includes(permission + '_readonly') : false;
            
            return `
                <div class="permission-item ${hasPermission ? 'granted' : 'denied'}">
                    <i class="fas fa-${hasPermission ? 'check' : 'times'}"></i>
                    <span>${permissionLabels[permission]}</span>
                </div>
            `;
        }).join('');
    }
}

function loadLogsData() {
    // Only show logs for administrators
    if (currentRole !== 'admin') {
        showToast('Acceso denegado: solo disponible para Administradores', 'error');
        switchView('dashboard');
        return;
    }
    
    // Populate user filter
    const logUserFilter = document.getElementById('logUserFilter');
    if (logUserFilter) {
        const uniqueUsers = [...new Set(appData.sessionLogs.map(log => log.usuario))];
        logUserFilter.innerHTML = '<option value="">Todos los usuarios</option>' +
            uniqueUsers.map(user => `<option value="${user}">${user}</option>`).join('');
    }
    
    // Load logs table
    const logsTable = document.getElementById('logsTable');
    if (logsTable) {
        let filteredLogs = filterLogs(appData.sessionLogs);
        
        logsTable.innerHTML = filteredLogs.map(log => `
            <tr>
                <td><strong>${log.usuario}</strong></td>
                <td>${log.email}</td>
                <td><span class="status-badge ${log.accion.includes('Login Exitoso') ? 'status-active' : log.accion.includes('Login Fallido') ? 'status-expiring' : 'status-low'}">${log.accion}</span></td>
                <td>${log.fecha}</td>
                <td>${log.ip}</td>
                <td>${log.navegador}</td>
                <td><span class="status-badge ${log.estado === 'success' ? 'status-active' : 'status-expiring'}">${log.estado === 'success' ? 'Éxito' : 'Fallo'}</span></td>
            </tr>
        `).join('');
    }
}

function loadManualData() {
    // Load navigation
    const manualNav = document.getElementById('manualNav');
    if (manualNav) {
        manualNav.innerHTML = appData.manualSections.map(section => `
            <a href="#" class="manual-nav-item ${section.id === currentManualSection ? 'active' : ''}" 
               onclick="selectManualSection('${section.id}'); return false;">
                <i class="fas fa-${getManualIcon(section.id)}"></i>
                ${section.title}
            </a>
        `).join('');
    }
    
    // Load content
    loadManualContent();
}

function loadManualContent() {
    const manualContent = document.getElementById('manualContent');
    if (manualContent) {
        const section = appData.manualSections.find(s => s.id === currentManualSection);
        if (section) {
            manualContent.innerHTML = `
                <div class="manual-section">
                    <h2>${section.title}</h2>
                    ${section.content}
                </div>
            `;
        }
    }
}

function selectManualSection(sectionId) {
    currentManualSection = sectionId;
    loadManualData();
}

function getManualIcon(sectionId) {
    const icons = {
        'start': 'play-circle',
        'dashboard': 'tachometer-alt',
        'lots': 'boxes',
        'labels': 'tags',
        'products': 'coffee',
        'alerts': 'bell',
        'reports': 'chart-bar',
        'users': 'users',
        'troubleshooting': 'wrench'
    };
    return icons[sectionId] || 'file-alt';
}

// Chart Initialization
function initializeStockChart() {
    const canvas = document.getElementById('stockChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (stockChart) {
        stockChart.destroy();
    }
    
    stockChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: appData.chartData.stockLevels.map(item => item.product),
            datasets: [{
                label: 'Stock Actual (kg)',
                data: appData.chartData.stockLevels.map(item => item.stock),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                }
            }
        }
    });
}

function initializeAlertsChart() {
    const canvas = document.getElementById('alertsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (alertsChart) {
        alertsChart.destroy();
    }
    
    alertsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: appData.chartData.alertsByType.map(item => item.type),
            datasets: [{
                data: appData.chartData.alertsByType.map(item => item.count),
                backgroundColor: ['#E74C3C', '#F39C12', '#A67B5B'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Utility Functions
function getAlertIcon(type) {
    const icons = {
        'expiration': 'clock',
        'stock': 'exclamation-triangle',
        'system': 'cog'
    };
    return icons[type] || 'bell';
}

function getStatusClass(status) {
    const classes = {
        'Activo': 'status-active',
        'Stock Bajo': 'status-low',
        'Por Caducar': 'status-expiring',
        'Agotado': 'status-expiring'
    };
    return classes[status] || '';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString('es-ES');
}

// Filter Functions
function filterLots(lots) {
    const searchInput = document.getElementById('lotsSearch');
    const originFilter = document.getElementById('originFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const originValue = originFilter ? originFilter.value : '';
    const statusValue = statusFilter ? statusFilter.value : '';
    
    return lots.filter(lot => {
        const matchesSearch = !searchTerm || 
                            lot.code.toLowerCase().includes(searchTerm) || 
                            lot.product.toLowerCase().includes(searchTerm);
        const matchesOrigin = !originValue || lot.origin === originValue;
        const matchesStatus = !statusValue || lot.status === statusValue;
        
        return matchesSearch && matchesOrigin && matchesStatus;
    });
}

function filterProducts(products) {
    const originFilter = document.getElementById('originProductFilter');
    const statusFilter = document.getElementById('statusProductFilter');
    const grainFilter = document.getElementById('grainTypeFilter');
    
    const originValue = originFilter ? originFilter.value : '';
    const statusValue = statusFilter ? statusFilter.value : '';
    const grainValue = grainFilter ? grainFilter.value : '';
    
    return products.filter(product => {
        const matchesOrigin = !originValue || product.origin === originValue;
        const matchesStatus = !statusValue || product.status === statusValue;
        const matchesGrain = !grainValue || product.grainType === grainValue;
        
        return matchesOrigin && matchesStatus && matchesGrain;
    });
}

function filterAlerts(alerts) {
    const typeFilter = document.getElementById('alertTypeFilter');
    const priorityFilter = document.getElementById('alertPriorityFilter');
    const statusFilter = document.getElementById('alertStatusFilter');
    
    const typeValue = typeFilter ? typeFilter.value : '';
    const priorityValue = priorityFilter ? priorityFilter.value : '';
    const statusValue = statusFilter ? statusFilter.value : '';
    
    return alerts.filter(alert => {
        const matchesType = !typeValue || alert.type === typeValue;
        const matchesPriority = !priorityValue || alert.priority === priorityValue;
        const matchesStatus = !statusValue || alert.status === statusValue;
        
        return matchesType && matchesPriority && matchesStatus;
    });
}

function filterUsers(users) {
    const roleFilter = document.getElementById('roleFilter');
    const statusFilter = document.getElementById('statusUserFilter');
    
    const roleValue = roleFilter ? roleFilter.value : '';
    const statusValue = statusFilter ? statusFilter.value : '';
    
    return users.filter(user => {
        const matchesRole = !roleValue || user.role === roleValue;
        const matchesStatus = !statusValue || user.status === statusValue;
        
        return matchesRole && matchesStatus;
    });
}

function filterLogs(logs) {
    const userFilter = document.getElementById('logUserFilter');
    const startDateFilter = document.getElementById('logStartDate');
    const endDateFilter = document.getElementById('logEndDate');
    
    const userValue = userFilter ? userFilter.value : '';
    const startDate = startDateFilter ? startDateFilter.value : '';
    const endDate = endDateFilter ? endDateFilter.value : '';
    
    return logs.filter(log => {
        const matchesUser = !userValue || log.usuario === userValue;
        
        let matchesDateRange = true;
        if (startDate || endDate) {
            const logDate = new Date(log.fecha.replace(' ', 'T'));
            if (startDate) {
                const startDateTime = new Date(startDate);
                matchesDateRange = matchesDateRange && logDate >= startDateTime;
            }
            if (endDate) {
                const endDateTime = new Date(endDate);
                endDateTime.setHours(23, 59, 59, 999);
                matchesDateRange = matchesDateRange && logDate <= endDateTime;
            }
        }
        
        return matchesUser && matchesDateRange;
    });
}

// Event Listeners Setup
function setupFilterListeners() {
    const filterIds = [
        'lotsSearch', 'originFilter', 'statusFilter',
        'originProductFilter', 'statusProductFilter', 'grainTypeFilter',
        'alertTypeFilter', 'alertPriorityFilter', 'alertStatusFilter',
        'roleFilter', 'statusUserFilter',
        'logUserFilter', 'logStartDate', 'logEndDate'
    ];
    
    filterIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', () => {
                setTimeout(() => loadViewData(currentView), 100);
            });
            element.addEventListener('change', () => {
                setTimeout(() => loadViewData(currentView), 100);
            });
        }
    });
    
    // Clear filters buttons
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    const clearLogFiltersBtn = document.getElementById('clearLogFilters');
    if (clearLogFiltersBtn) {
        clearLogFiltersBtn.addEventListener('click', clearLogFilters);
    }
}

function clearAllFilters() {
    const filterElements = document.querySelectorAll('.search-input, .filter-select');
    filterElements.forEach(element => {
        element.value = '';
    });
    loadViewData(currentView);
    showToast('Filtros limpiados', 'info');
}

function clearLogFilters() {
    const logFilters = ['logUserFilter', 'logStartDate', 'logEndDate'];
    logFilters.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });
    loadViewData(currentView);
    showToast('Filtros del log limpiados', 'info');
}

function setupSearchListeners() {
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('input', performGlobalSearch);
    }
    
    const manualSearch = document.getElementById('manualSearch');
    if (manualSearch) {
        manualSearch.addEventListener('input', performManualSearch);
    }
}

function performGlobalSearch() {
    const globalSearch = document.getElementById('globalSearch');
    if (!globalSearch) return;
    
    const searchTerm = globalSearch.value.toLowerCase();
    if (searchTerm.length >= 2) {
        showToast(`Buscando: "${searchTerm}"`, 'info');
    }
}

function performManualSearch() {
    const manualSearch = document.getElementById('manualSearch');
    if (!manualSearch) return;
    
    const searchTerm = manualSearch.value.toLowerCase();
    const manualNav = document.getElementById('manualNav');
    
    if (manualNav) {
        const navItems = manualNav.querySelectorAll('.manual-nav-item');
        navItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (!searchTerm || text.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Filter content
    if (searchTerm) {
        const filteredSections = appData.manualSections.filter(section => 
            section.title.toLowerCase().includes(searchTerm) || 
            section.content.toLowerCase().includes(searchTerm)
        );
        
        if (filteredSections.length > 0) {
            selectManualSection(filteredSections[0].id);
        }
    }
}

function setupActionListeners() {
    // Add lot button
    const addLotBtn = document.getElementById('addLotBtn');
    if (addLotBtn) {
        addLotBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openLotModal();
        });
    }
    
    // Export lots button
    const exportLotsBtn = document.getElementById('exportLotsBtn');
    if (exportLotsBtn) {
        exportLotsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            exportLots();
        });
    }
    
    // Export logs button
    const exportLogBtn = document.getElementById('exportLogBtn');
    if (exportLogBtn) {
        exportLogBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            exportSessionLogs();
        });
    }
    
    // Generate labels button
    const generateLabelsBtn = document.getElementById('generateLabelsBtn');
    if (generateLabelsBtn) {
        generateLabelsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            generateLabels();
        });
    }
    
    // Add product button
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showToast('Funcionalidad de agregar producto en desarrollo', 'info');
        });
    }
    
    // Generate report button
    const generateReportBtn = document.getElementById('generateReportBtn');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            generateReport();
        });
    }
    
    // Add user button
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openUserModal();
        });
    }
    
    // Report type change
    const reportType = document.getElementById('reportType');
    if (reportType) {
        reportType.addEventListener('change', updateReportPreview);
    }
}

// Export Functions
function exportSessionLogs() {
    if (currentRole !== 'admin') {
        showToast('Acceso denegado: solo disponible para Administradores', 'error');
        return;
    }
    
    const filteredLogs = filterLogs(appData.sessionLogs);
    const csvContent = generateCSV(filteredLogs, ['usuario', 'email', 'accion', 'fecha', 'ip', 'navegador', 'estado']);
    downloadCSV(csvContent, 'session_logs.csv');
    showToast('Log de sesiones exportado exitosamente', 'success');
}

function generateCSV(data, headers) {
    const csvHeaders = headers.map(h => h.charAt(0).toUpperCase() + h.slice(1)).join(',');
    const csvRows = data.map(row => 
        headers.map(header => `"${row[header] || ''}"`).join(',')
    );
    return [csvHeaders, ...csvRows].join('\n');
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Modal Functions
function setupModalListeners() {
    // Lot Modal
    const modal = document.getElementById('lotModal');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalSave = document.getElementById('modalSave');
    
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeLotModal();
        });
    }
    
    if (modalCancel) {
        modalCancel.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeLotModal();
        });
    }
    
    if (modalSave) {
        modalSave.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            saveLot();
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLotModal();
            }
        });
    }
    
    // User Modal
    const userModal = document.getElementById('userModal');
    const userModalClose = document.getElementById('userModalClose');
    const userModalCancel = document.getElementById('userModalCancel');
    const userModalSave = document.getElementById('userModalSave');
    
    if (userModalClose) {
        userModalClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeUserModal();
        });
    }
    
    if (userModalCancel) {
        userModalCancel.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeUserModal();
        });
    }
    
    if (userModalSave) {
        userModalSave.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            saveUser();
        });
    }
    
    if (userModal) {
        userModal.addEventListener('click', function(e) {
            if (e.target === userModal) {
                closeUserModal();
            }
        });
    }
}

function openLotModal(lotCode = null) {
    const modal = document.getElementById('lotModal');
    const modalTitle = document.getElementById('modalTitle');
    
    if (!modal) return;
    
    if (lotCode) {
        if (modalTitle) modalTitle.textContent = 'Editar Lote';
        const lot = appData.lots.find(l => l.code === lotCode);
        if (lot) {
            console.log('Editing lot:', lot);
        }
    } else {
        if (modalTitle) modalTitle.textContent = 'Nuevo Lote';
    }
    
    modal.classList.remove('hidden');
}

function closeLotModal() {
    const modal = document.getElementById('lotModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function saveLot() {
    showToast('Lote guardado exitosamente', 'success');
    closeLotModal();
    if (currentView === 'lots') {
        loadLotsData();
    }
}

function openUserModal(userId = null) {
    const modal = document.getElementById('userModal');
    const modalTitle = document.getElementById('userModalTitle');
    
    if (!modal) return;
    
    if (userId) {
        if (modalTitle) modalTitle.textContent = 'Editar Usuario';
        const user = appData.users.find(u => u.id === userId);
        if (user) {
            console.log('Editing user:', user);
        }
    } else {
        if (modalTitle) modalTitle.textContent = 'Nuevo Usuario';
    }
    
    modal.classList.remove('hidden');
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function saveUser() {
    showToast('Usuario guardado exitosamente', 'success');
    closeUserModal();
    if (currentView === 'users') {
        loadUsersData();
    }
}

// Template selection
function selectTemplate(templateId) {
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => card.classList.remove('selected'));
    
    const selectedCard = document.querySelector(`[data-template-id="${templateId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    selectedTemplate = templateId;
    showToast(`Plantilla ${templateId} seleccionada`, 'info');
}

// User selection
function selectUser(userId) {
    selectedUserId = userId;
    const user = appData.users.find(u => u.id === userId);
    
    if (user) {
        // Update user details
        const userDetails = document.getElementById('userDetails');
        if (userDetails) {
            userDetails.innerHTML = `
                <div class="user-info">
                    <div class="user-avatar-large" style="text-align: center; margin-bottom: var(--space-16);">
                        <i class="fas fa-user fa-3x" style="color: var(--color-primary);"></i>
                    </div>
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                    <div class="user-meta">
                        <p><strong>Rol:</strong> ${user.role}</p>
                        <p><strong>Estado:</strong> ${user.status}</p>
                        <p><strong>Último acceso:</strong> ${formatDateTime(user.lastLogin)}</p>
                        <p><strong>Creado:</strong> ${formatDate(user.createdDate)}</p>
                    </div>
                </div>
            `;
        }
        
        // Update permissions matrix
        loadPermissionsMatrix();
        
        // Reload table to show selection
        loadUsersData();
    }
}

// Action Functions
function viewLot(lotCode) {
    showToast(`Visualizando lote: ${lotCode}`, 'info');
}

function editLot(lotCode) {
    openLotModal(lotCode);
}

function deleteLot(lotCode) {
    if (confirm(`¿Está seguro de eliminar el lote ${lotCode}?`)) {
        showToast(`Lote ${lotCode} eliminado`, 'success');
        if (currentView === 'lots') {
            loadLotsData();
        }
    }
}

function generateLabel(lotCode) {
    showToast(`Generando etiqueta para lote: ${lotCode}`, 'info');
    switchView('labels');
}

function generateLabels() {
    const productSelect = document.getElementById('labelProduct');
    const lotSelect = document.getElementById('labelLot');
    
    if (!productSelect || !lotSelect) {
        showToast('Error: elementos de formulario no encontrados', 'error');
        return;
    }
    
    if (!productSelect.value || !lotSelect.value) {
        showToast('Seleccione producto y lote', 'error');
        return;
    }
    
    if (!selectedTemplate) {
        showToast('Seleccione una plantilla de etiqueta', 'error');
        return;
    }
    
    showToast('Etiquetas generadas y enviadas a la cola de impresión', 'success');
}

function exportLots() {
    showToast('Exportando lotes a CSV...', 'info');
    setTimeout(() => {
        showToast('Archivo CSV descargado exitosamente', 'success');
    }, 2000);
}

function resolveAlert(alertId) {
    showToast(`Alerta ${alertId} resuelta`, 'success');
    const alert = appData.alerts.find(a => a.id === alertId);
    if (alert) {
        alert.status = 'resolved';
    }
    if (currentView === 'alerts') {
        loadAlertsData();
    }
}

function dismissAlert(alertId) {
    showToast(`Alerta ${alertId} descartada`, 'info');
    const alertIndex = appData.alerts.findIndex(a => a.id === alertId);
    if (alertIndex > -1) {
        appData.alerts.splice(alertIndex, 1);
    }
    if (currentView === 'alerts') {
        loadAlertsData();
    }
}

function generateReport() {
    const reportType = document.getElementById('reportType');
    const reportFormat = document.getElementById('reportFormat');
    const startDate = document.getElementById('reportStartDate');
    const endDate = document.getElementById('reportEndDate');
    
    if (!reportType || !startDate || !endDate) {
        showToast('Complete todos los campos requeridos', 'error');
        return;
    }
    
    const typeText = reportType.options[reportType.selectedIndex].text;
    const formatText = reportFormat ? reportFormat.options[reportFormat.selectedIndex].text : 'PDF';
    
    showToast(`Generando ${typeText} en formato ${formatText}...`, 'info');
    
    setTimeout(() => {
        showToast(`Reporte "${typeText}" generado y descargado exitosamente`, 'success');
    }, 3000);
}

function updateReportPreview() {
    const reportType = document.getElementById('reportType');
    const preview = document.getElementById('reportPreview');
    
    if (!reportType || !preview) return;
    
    const typeValue = reportType.value;
    const previewData = {
        'inventory': `
            <div class="report-preview-content">
                <h3>Vista Previa - Inventario Actual</h3>
                <ul>
                    <li>Total de lotes activos: 24</li>
                    <li>Productos en stock: 6</li>
                    <li>Valor total inventario: $45,280</li>
                    <li>Productos con stock bajo: 2</li>
                </ul>
            </div>
        `,
        'waste': `
            <div class="report-preview-content">
                <h3>Vista Previa - Análisis de Mermas</h3>
                <ul>
                    <li>Lotes vencidos: 3</li>
                    <li>Pérdida estimada: $2,140</li>
                    <li>Productos más afectados: Premium Chiapas</li>
                    <li>Recomendaciones: Ajustar stock mínimo</li>
                </ul>
            </div>
        `,
        'movements': `
            <div class="report-preview-content">
                <h3>Vista Previa - Movimientos de Stock</h3>
                <ul>
                    <li>Entradas del período: 12 lotes</li>
                    <li>Salidas del período: 8 lotes</li>
                    <li>Rotación promedio: 15 días</li>
                    <li>Producto más movido: Espresso Blend</li>
                </ul>
            </div>
        `,
        'executive': `
            <div class="report-preview-content">
                <h3>Vista Previa - Resumen Ejecutivo</h3>
                <ul>
                    <li>Eficiencia operativa: 87%</li>
                    <li>Satisfacción calidad: 94%</li>
                    <li>Índice rotación: Óptimo</li>
                    <li>Tendencia ventas: +12% vs mes anterior</li>
                </ul>
            </div>
        `
    };
    
    preview.innerHTML = previewData[typeValue] || `
        <div class="preview-placeholder">
            <i class="fas fa-file-alt fa-3x"></i>
            <p>Seleccione un tipo de reporte para ver la vista previa</p>
        </div>
    `;
}

function executeScheduledReport(reportId) {
    const report = appData.reports.find(r => r.id === reportId);
    if (report) {
        showToast(`Ejecutando reporte programado: ${report.name}`, 'info');
        setTimeout(() => {
            showToast(`Reporte "${report.name}" ejecutado y enviado`, 'success');
        }, 2000);
    }
}

function downloadReport(reportId) {
    const report = appData.reports.find(r => r.id === reportId);
    if (report) {
        showToast(`Descargando: ${report.name}`, 'info');
        setTimeout(() => {
            showToast(`Descarga completada: ${report.name}`, 'success');
        }, 1500);
    }
}

function editUser(userId) {
    openUserModal(userId);
}

function toggleUserStatus(userId) {
    const user = appData.users.find(u => u.id === userId);
    if (user) {
        user.status = user.status === 'activo' ? 'inactivo' : 'activo';
        showToast(`Usuario ${user.name} ${user.status === 'activo' ? 'activado' : 'desactivado'}`, 'success');
        if (currentView === 'users') {
            loadUsersData();
        }
    }
}

// Utility Functions
function populateProductSelector(selectId) {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = '<option value="">Seleccionar producto</option>' +
            appData.products.map(product => 
                `<option value="${product.name}">${product.name}</option>`
            ).join('');
    }
}

function populateLotSelector(selectId) {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = '<option value="">Seleccionar lote</option>' +
            appData.lots.map(lot => 
                `<option value="${lot.code}">${lot.code} - ${lot.product}</option>`
            ).join('');
    }
}

// Toast Notification System
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content" style="display: flex; align-items: center; gap: var(--space-8);">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove toast
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, duration);
}

function getToastIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Responsive Handling
function handleResize() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768) {
        if (sidebar) sidebar.classList.add('collapsed');
        if (mainContent) mainContent.classList.add('sidebar-collapsed');
    } else {
        if (sidebar && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    }
}