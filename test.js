const Methods = [ "checkout", "copy", "delete", "get", "head", "lock", "merge", "mkactivity", "mkcol", "move", "m-search", "notify", "options", "patch", "post", "purge", "put", "report", "search", "subscribe", "trace", "unlock", "unsubscribe" ];

let out = "";
for ( let method of Methods ) {
	method = method.charAt( 0 ).toUpperCase() + method.slice( 1 );
	out += `fetch${ method }, `;
}

console.log( out );