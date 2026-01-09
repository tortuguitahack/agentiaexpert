// CONFIGURACIÓN MAESTRA - PASARELAS VERIFICADAS
const GATEWAYS = {
    stripe: [
        "https://buy.stripe.com/dRmcN54TZfLA0Ij4C89Ve05",
        "https://buy.stripe.com/cNicN5727fLAfDd9Ws9Ve06",
        "https://buy.stripe.com/6oU3cv5Y38j84YzecI9Ve07"
    ],
    crypto: {
        USDC: "0xeBe965EFe1ab53d2da915134d72e5BdBd5E3C053",
        USDT: "0xeBe965EFe1ab53d2da915134d72e5BdBd5E3C053",
        BTC: "bc1qjjgsx3lwa0wz59l89htcpr28j5s7dtmv99fmw0",
        ETH: "0x2F4bc6f77719AB99BCd6a9b553729bB96C9B8c22"
    },
    bank: {
        USA: { h: "Diego Edgardo Cortez Yañez", r: "101019644", a: "219449048779", b: "Lead Bank" },
        Europe: { h: "Diego Edgardo Cortez Yañez", i: "MT12CFTE28004000000000005456093", b: "OPENPAYD MALTA" },
        Bolivia: { h: "DIEGO EDGARDO CORTEZ YAÑEZ", a: "4069474188", b: "Banco Mercantil Santa Cruz" }
    }
};

// MOTOR DE VENTAS MASIVAS
let salesCount = 0;
const target = 5000;

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    startUrgencyEngine();
});

function renderProducts() {
    const container = document.getElementById('products-container');
    // Generación dinámica de productos de alta demanda
    const products = [
        { id: 'p1', name: "SISTEMA IMPERIO DIGITAL V1", price: 49.99 },
        { id: 'p2', name: "LICENCIA MASTER ASSETS", price: 99.00 },
        { id: 'p3', name: "CONJUNTO DE ACTIVOS PRIME", price: 149.00 }
    ];
    
    container.innerHTML = products.map(p => `
        <div class="product-card glass-card">
            <h3>${p.name}</h3>
            <p class="price">$${p.price} USD</p>
            <button onclick="triggerCheckout('${p.name}')" class="buy-btn">COMPRAR AHORA (ACCESO INSTANTÁNEO)</button>
        </div>
    `).join('');
}

// LÓGICA DE CIERRE DE VENTA
window.triggerCheckout = (prodName) => {
    const modal = document.getElementById('payment-modal');
    modal.style.display = 'block';
    console.log(`Iniciando cierre para: ${prodName}`);
};

// ACCIONES DE PAGO REALES
document.getElementById('stripe-confirm').onclick = () => {
    // Rotación de enlaces para evitar bloqueos
    const randomStripe = GATEWAYS.stripe[Math.floor(Math.random() * GATEWAYS.stripe.length)];
    window.location.href = randomStripe;
};

// MOSTRAR DATOS BANCARIOS SEGÚN REGIÓN
document.getElementById('bank-region').onchange = (e) => {
    const info = GATEWAYS.bank[e.target.value] || GATEWAYS.bank.USA;
    document.getElementById('bank-info-display').innerHTML = `
        <div class="bank-card">
            <p><strong>BANCO:</strong> ${info.b}</p>
            <p><strong>TITULAR:</strong> ${info.h}</p>
            <p><strong>CUENTA/IBAN:</strong> ${info.a || info.i}</p>
            ${info.r ? `<p><strong>ROUTING:</strong> ${info.r}</p>` : ''}
            <p class="alert">Envíe comprobante para activación inmediata.</p>
        </div>
    `;
};

// MOTOR DE URGENCIA (PSICOLOGÍA DE ALTO IMPACTO)
function startUrgencyEngine() {
    setInterval(() => {
        const toast = document.createElement('div');
        toast.className = 'venta-notificacion';
        toast.innerHTML = `🛒 Nuevo pedido de ${prodAleatorio()} - $${(Math.random()*100).toFixed(2)} USD`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }, 8000);
}

function prodAleatorio() {
    return ["Pack Digital", "Licencia Prime", "Master Class", "Asset Pro"][Math.floor(Math.random()*4)];
}

window.copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copiado al portapapeles. Proceda con el pago.");
};
// --- MOTOR DE PRUEBA SOCIAL (ALTO MANDO) ---
const nombres = ["Carlos M.", "Lucía R.", "Andrés G.", "Sofía V.", "Mateo L.", "Roberto D."];
const paises = ["Bolivia", "España", "México", "USA", "Chile", "Colombia"];

function lanzarPruebaSocial() {
    const n = nombres[Math.floor(Math.random() * nombres.length)];
    const p = paises[Math.floor(Math.random() * paises.length)];
    
    const div = document.createElement('div');
    div.className = 'venta-notificacion';
    div.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <div style="font-size:1.5em;">✅</div>
            <div>
                <strong>${n} de ${p}</strong><br>
                <span>Acaba de descargar el Pack Prime 📥</span>
            </div>
        </div>
    `;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// Iniciar ráfaga de prueba social cada 8 segundos
setInterval(lanzarPruebaSocial, 8000);

// --- CONTADOR DE STOCK AGRESIVO ---
let stockTotal = 5000;
const stockElement = document.createElement('div');
stockElement.id = "global-stock";
stockElement.style = "text-align:center; color:#ff0044; font-weight:900; padding:10px; font-size:1.2em;";
document.querySelector('main').prepend(stockElement);

function actualizarStock() {
    stockTotal -= Math.floor(Math.random() * 3) + 1;
    if(stockTotal < 12) stockTotal = 12; // Nunca llega a cero para permitir la venta
    stockElement.innerHTML = `⚠️ URGENTE: SOLO QUEDAN ${stockTotal} LICENCIAS DISPONIBLES`;
}
setInterval(actualizarStock, 4000);
