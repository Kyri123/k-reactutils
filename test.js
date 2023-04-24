const Methods = [ "checkout", "copy", "delete", "get", "head", "lock", "merge", "mkactivity", "mkcol", "move", "m-search", "notify", "options", "patch", "post", "purge", "put", "report", "search", "subscribe", "trace", "unlock", "unsubscribe" ];

let out = "";
for ( let method of Methods ) {
	method = method.charAt( 0 ).toUpperCase() + method.slice( 1 );
	out += ` 
 
const fetch${ method.replace( "m-s", "MS" ) }Text: IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
\treturn FetchTextApi( { ...opt, method: "${ method }" } );
};

const fetch${ method.replace( "m-s", "MS" ) }Json: IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) {
\treturn FetchJsonApi<D, T>( { ...opt, method: "${ method }" } );
}`;
}

console.log( out );