export function dateFormat(ladate, format = "default") {
    var date = new Date(ladate)
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var heures = date.getHours();
    var minutes = date.getMinutes();
    var secondes = date.getSeconds();


    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    ladate = dd + '/' + mm + '/' + yyyy;

    if (format == "avecheure") {
        ladate += " " + heures + ":" + minutes + ":" + secondes
    }

    return ladate;
}



export function datetimeformat(ladate) {
    return new Date(ladate).toLocaleDateString(
        'en-gb',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );
}

export function convertoperator(op) {
    let operators = [];
    operators["="] = "equals"; // =	Equal
    operators["<=>"] = "seq"; // <=>	Equal (Safe to compare NULL values)
    operators["!="] = "neq"; // !=	Not Equal
    operators[">"] = "gt"; // >	Greater Than
    // operators["dgt"] = ">"; // >	Greater Than
    operators[">="] = "gte"; // >=	Greater Than or Equal
    // operators["dgte"] = ">="; // >=	Greater Than or Equal
    operators["<"] = "lt"; // <	Less Than
    // operators["dlt"] = "<"; // <	Less Than
    operators["<="] = "lte"; // <=	Less Than or Equal
    // operators["<="] = "dlte";

    if (operators[op] !== undefined) {
        return operators[op];
    }
    return op;


}
export function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
export function findWithAttr(array, attr, values) {
    var indexes = [];
    for (var i = 0; i < array.length; i += 1) {
        if (values.includes(array[i][attr])) {
            indexes.push(i);
        }

    }
    return indexes;
}
export function findOneWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}