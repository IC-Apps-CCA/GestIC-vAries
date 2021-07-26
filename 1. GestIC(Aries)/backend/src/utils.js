/*
let body = {
    name: "aaaa",
    id: 1,
    password: "pppp"
}

let bodyDB = {
    user_name: "aaaa",
    user_id: 1,
    user_password: "pppp"
}

console.log(body)

const dict = [
    ["name", "user_name"],
    ["id", "user_id"],
    ["password", "user_password"]]

// back -> db
parse = (array = []) => {
    let a = Object.fromEntries(dict);
    let b = Object.entries(array).map(
        (it) => [a[it[0]],it[1]])
    let c = Object.fromEntries(b)
    console.log(a);
    console.log(b);
    console.log(c)
}

parse2 = (array = []) => {
    let a = Object.fromEntries(dict);
    let b = Object.entries(array).map(
        (it) => [dict.find((dict) => dict[0] == it[0])[1],it[1]])
    let c = Object.fromEntries(b)
    console.log(a);
    console.log(b);
    console.log(c)
}

// db -> back
unparse = (array = []) => {
    let b = Object.entries(array).map(
        (it) => [dict.find((dict) => dict[1] == it[0])[0],it[1]])
    let c = Object.fromEntries(b)
    console.log(b);
    console.log(c)
}

console.log("parse (back-> db)");
console.log(1)
parse(body)

console.log(2)
parse2(body)

console.log("unparse (db -> back)")
unparse(bodyDB)
*/
const bcrypt = require('bcrypt')
password="1234"

const hashPassword = async password => {
	const salt = await bcrypt.genSalt()
	const hash = await bcrypt.hash(password, salt)

	console.log(hash);
}

hashPassword(password);

