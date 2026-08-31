function enviarParaWhatsApp() {
    const numeroWhatsApp = "5579996582975"; // Substitua pelo número da Transvello
    
    const empresa = document.getElementById('empresa').value;
    const tipo = document.getElementById('tipo').value;
    const origem = document.getElementById('origem').value;
    const destino = document.getElementById('destino').value;
    
    // Mensagem formatada
    const texto = `Olá, Sou da *${empresa}* e gostaria de solicitar um orçamento para *${tipo}*. Com origem *${origem}* e destino *${destino}*`;
    
    // encodeURIComponent converte os espaços e caracteres especiais automaticamente
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    
    // Abre em uma nova aba
    window.open(url, '_blank');
}