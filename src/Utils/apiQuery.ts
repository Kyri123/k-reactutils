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

async function FetchJsonApi<T>( option : IQueryOptions ) : Promise<T | undefined> {
	const Response = await FetchApi( option );
	if ( Response ) {
		return await Response.json();
	}
	return undefined;
}

async function FetchTextApi( option : IQueryOptions ) : Promise<string | undefined> {
	const Response = await FetchApi( option );
	if ( Response ) {
		return await Response.text();
	}
	return undefined;
}

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

const fetchCheckoutText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Checkout" } );
};

async function fetchCheckoutJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Checkout" } );
}

const fetchCopyText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Copy" } );
};

async function fetchCopyJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Copy" } );
}

const fetchDeleteText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Delete" } );
};

async function fetchDeleteJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Delete" } );
}

const fetchGetText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Get" } );
};

async function fetchGetJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Get" } );
}

const fetchHeadText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Head" } );
};

async function fetchHeadJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Head" } );
}

const fetchLockText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Lock" } );
};

async function fetchLockJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Lock" } );
}

const fetchMergeText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Merge" } );
};

async function fetchMergeJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Merge" } );
}

const fetchMkactivityText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Mkactivity" } );
};

async function fetchMkactivityJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Mkactivity" } );
}

const fetchMkcolText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Mkcol" } );
};

async function fetchMkcolJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Mkcol" } );
}

const fetchMoveText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Move" } );
};

async function fetchMoveJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Move" } );
}

const fetchMSearchText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "M-search" } );
};

async function fetchMSearchJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "M-search" } );
}

const fetchNotifyText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Notify" } );
};

async function fetchNotifyJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Notify" } );
}

const fetchOptionsText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Options" } );
};

async function fetchOptionsJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Options" } );
}

const fetchPatchText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Patch" } );
};

async function fetchPatchJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Patch" } );
}

const fetchPostText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Post" } );
};

async function fetchPostJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Post" } );
}

const fetchPurgeText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Purge" } );
};

async function fetchPurgeJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Purge" } );
}

const fetchPutText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Put" } );
};

async function fetchPutJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Put" } );
}

const fetchReportText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Report" } );
};

async function fetchReportJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Report" } );
}

const fetchSearchText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Search" } );
};

async function fetchSearchJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Search" } );
}

const fetchSubscribeText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Subscribe" } );
};

async function fetchSubscribeJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Subscribe" } );
}

const fetchTraceText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Trace" } );
};

async function fetchTraceJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Trace" } );
}

const fetchUnlockText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Unlock" } );
};

async function fetchUnlockJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Unlock" } );
}

const fetchUnsubscribeText = async( opt : Omit<IQueryOptions, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Unsubscribe" } );
};

async function fetchUnsubscribeJson<T>( opt : Omit<IQueryOptions, "method"> ) {
	return FetchJsonApi<T>( { ...opt, method: "Unsubscribe" } );
}

export {
	fetchCheckoutText,
	fetchCheckoutJson,
	fetchCopyText,
	fetchCopyJson,
	fetchDeleteText,
	fetchDeleteJson,
	fetchGetText,
	fetchGetJson,
	fetchHeadText,
	fetchHeadJson,
	fetchLockText,
	fetchLockJson,
	fetchMergeText,
	fetchMergeJson,
	fetchMkactivityText,
	fetchMkactivityJson,
	fetchMkcolText,
	fetchMkcolJson,
	fetchMoveText,
	fetchMoveJson,
	fetchMSearchText,
	fetchMSearchJson,
	fetchNotifyText,
	fetchNotifyJson,
	fetchOptionsText,
	fetchOptionsJson,
	fetchPatchText,
	fetchPatchJson,
	fetchPostText,
	fetchPostJson,
	fetchPurgeText,
	fetchPurgeJson,
	fetchPutText,
	fetchPutJson,
	fetchReportText,
	fetchReportJson,
	fetchSearchText,
	fetchSearchJson,
	fetchSubscribeText,
	fetchSubscribeJson,
	fetchTraceText,
	fetchTraceJson,
	fetchUnlockText,
	fetchUnlockJson,
	fetchUnsubscribeText,
	fetchUnsubscribeJson,
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