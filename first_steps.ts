console.log("Welcome to Deno!");


const res = await fetch("https://deno.com");
const body = await res.text();
console.log(body);


