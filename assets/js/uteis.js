let pathname = location.pathname.split('/')[2]
pathname === 'index.html' || pathname === "" ? pathname = 'home' : ''

let GetHTML = (url, method, callback, params = null) => {
    let obj;
    try {
        obj = new XMLHttpRequest();
    } catch (e) {
        try {
            obj = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                obj = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                console.log("Your browser does not support Ajax.");
                return false;
            }
        }
    }
    obj.open(method, url, true);
    obj.setRequestHeader("Content-Type", "text/html");
    obj.onreadystatechange = function () {
        if (obj.readyState == 4) {
            callback(obj);
        }
    }
    obj.send(JSON.stringify(params));
    return obj;
}

let dateTimeToUTC = (date, a = undefined) => {
    var data = new Date(date);

    return !!a 
    ? data.toLocaleString('pt-BR',).replace(/(\d*)\/(\d*)\/(\d*).*/, '$1/$2/$3') 
    : data.toLocaleString('pt-BR',).replace(/(\d*)\/(\d*)\/(\d*)\s(\d*):(\d*):(\d*).*/, '$1/$2/$3 às $4:$5:$6');
}

let formatar_cpfcnpj = valor => {

    return valor.length > 11 ? valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

let ValidarCNPJ = cnpj => {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length != 14)
        return false;

    var tamanhoTotal = cnpj.length - 2
    var cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    var digitosVerificadores = cnpj.substring(tamanhoTotal);
    var soma = 0;
    var pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(0))
        return false;

    tamanhoTotal = tamanhoTotal + 1;
    cnpjSemDigitos = cnpj.substring(0, tamanhoTotal);
    soma = 0;
    pos = tamanhoTotal - 7;
    for (i = tamanhoTotal; i >= 1; i--) {
        soma += cnpjSemDigitos.charAt(tamanhoTotal - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitosVerificadores.charAt(1))
        return false;

    return true;
}

let ValidarCPF = cpf => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    if (
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" ||
        cpf == "01234567890")
        return false;
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}