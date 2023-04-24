import _ from "lodash";

type TQueryMethods = "POST" | "GET" | "PUT" | "DELETE" | string
type TQueryContentType = "application/json" | string

interface IQueryOptions {
	method? : TQueryMethods;
	auth? : string;
	path : string;
	data : object;
	contentType? : TQueryContentType;
	initOptions? : RequestInit;
}

const FetchApi = async( option : IQueryOptions ) : Promise<Response | undefined> => {
	const init : RequestInit = _.merge( {
		method: option.method?.toUpperCase() || "GET",
		headers: {
			"Content-Type": option.contentType || "application/json"
		}
	}, option.initOptions );

	if ( option.auth ) {
		init.headers![ "Authorization" ] = `Bearer ${ option.auth }`;
	}

	if ( option.method === "GET" && Object.keys( option.data ).length > 0 ) {
		option.path = option.path + "?" + Object.keys( option.data ).map( ( key ) => {
			return encodeURIComponent( key ) + "=" + encodeURIComponent( option.data[ key ] );
		} ).join( "&" );
	}
	else if ( option.method !== "GET" ) {
		init.body = JSON.stringify( option.data );
	}

	const Response = await fetch( option.path, init );
	if ( Response && Response.ok && Response.status === 200 ) {
		return Response;
	}
	return undefined;
};

const fetchCheckout = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Checkout" } );
};

const fetchCopy = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Copy" } );
};

const fetchDelete = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Delete" } );
};

const fetchGet = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Get" } );
};

const fetchHead = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Head" } );
};

const fetchLock = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Lock" } );
};

const fetchMerge = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Merge" } );
};

const fetchMkactivity = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Mkactivity" } );
};

const fetchMkcol = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Mkcol" } );
};

const fetchMove = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Move" } );
};

const fetchMSearch = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "M-search" } );
};

const fetchNotify = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Notify" } );
};

const fetchOptions = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Options" } );
};

const fetchPatch = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Patch" } );
};

const fetchPost = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Post" } );
};

const fetchPurge = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Purge" } );
};

const fetchPut = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Put" } );
};

const fetchReport = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Report" } );
};

const fetchSearch = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Search" } );
};

const fetchSubscribe = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Subscribe" } );
};

const fetchTrace = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Trace" } );
};

const fetchUnlock = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Unlock" } );
};

const fetchUnsubscribe = async( opt : Omit<IQueryOptions, "method"> ) => {
	return await FetchApi( { ...opt, method: "Unsubscribe" } );
};


export {
	fetchCheckout,
	fetchCopy,
	fetchDelete,
	fetchGet,
	fetchHead,
	fetchLock,
	fetchMerge,
	fetchMkactivity,
	fetchMkcol,
	fetchMove,
	fetchMSearch,
	fetchNotify,
	fetchOptions,
	fetchPatch,
	fetchPost,
	fetchPurge,
	fetchPut,
	fetchReport,
	fetchSearch,
	fetchSubscribe,
	fetchTrace,
	fetchUnlock,
	fetchUnsubscribe,
	IQueryOptions,
	TQueryMethods,
	TQueryContentType,
	FetchApi
};