function randomString( count : number = 11 ) {
    let str = Math.random().toString(36).substr(2,11);
    while( str.length < count ) {
        str += Math.random().toString(36).substr(2,11);
    }
    return str.substr( 0, count );
}

function randomInt (min : number, max : number)
{
    return Math.floor( min + Math.random() * (max - min));
}



export {
    randomString,
    randomInt
}
