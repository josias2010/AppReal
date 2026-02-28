// ============================================
// CONFIGURACIÓN SUPABASE
// ============================================
const SUPABASE_URL = 'https://lyklppmmtrzrqoickzmd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5a2xwcG1tdHJ6cnFvaWNrem1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTQyNTUsImV4cCI6MjA4Nzg3MDI1NX0.42uUpfpGR6h4klDYsOAHOo22iKQ9m23m6-HfU7qNWW0';

console.log('✅ Script cargado correctamente');
console.log('📡 Conectando a:', SUPABASE_URL);

// ============================================
// FUNCIÓN DE PRUEBA SIMPLE
// ============================================
function probarSupabase() {
    console.log('🧪 Probando Supabase...');
    
    const testData = {
        email: "prueba@test.com",
        password: "123456",
        fecha: new Date().toLocaleString(),
        hora: new Date().toLocaleTimeString()
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
        console.log('📥 Respuesta status:', response.status);
        if (response.ok) {
            console.log('✅ DATOS GUARDADOS');
            alert('✅ Revisa Supabase - Debería haber un nuevo registro');
        } else {
            console.log('❌ Error:', response.status);
            alert('❌ Error ' + response.status);
        }
    })
    .catch(error => {
        console.log('❌ Error de red:', error);
        alert('❌ Error: ' + error);
    });
}

// Hacer la función global
window.probarSupabase = probarSupabase;
