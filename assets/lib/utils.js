export function dateFormat(ladate) {
    var date = new Date(ladate)
    var dd = date.getDate();
    var mm = date.getMonth() + 1;

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
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
    let operators=[];
    operators["="] = "equals"; // =	Equal
    operators["<=>"] = "seq"; // <=>	Equal (Safe to compare NULL values)
    operators["!="] = "neq"; // !=	Not Equal
    operators[">"] = "dgt"; // >	Greater Than
    // operators["dgt"] = ">"; // >	Greater Than
    operators[">="] = "dgte"; // >=	Greater Than or Equal
    // operators["dgte"] = ">="; // >=	Greater Than or Equal
    operators["<"] = "dlt"; // <	Less Than
    // operators["dlt"] = "<"; // <	Less Than
    operators["<="] = "dlte"; // <=	Less Than or Equal
    // operators["<="] = "dlte";

    if(operators[op] !== undefined){
        return operators[op];
    }
    return op;
   

}