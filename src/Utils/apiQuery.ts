import _ from "lodash";

type TQueryMethods = "POST" | "GET" | "PUT" | "DELETE" | string
type TQueryContentType = "application/json" | string

interface IFetchFunction {
	<D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) : Promise<Response | undefined>;
}

interface IFetchMainFunction {
	<D extends object>( opt : IQueryOptions<D> ) : Promise<Response | undefined>;
}

interface IFetchJsonMainFunction {
	<D extends object, T extends object>( opt : IQueryOptions<D> ) : Promise<T | undefined>;
}

interface IFetchTextMainFunction {
	<D extends object>( opt : IQueryOptions<D> ) : Promise<string | undefined>;
}

interface IFetchJsonFunction {
	<D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) : Promise<T | undefined>;
}

interface IFetchTextFunction {
	<D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) : Promise<string | undefined>;
}


interface IQueryOptions<T extends object> {
	method? : TQueryMethods;
	auth? : string;
	path : string;
	data? : T;
	contentType? : TQueryContentType;
	initOptions? : RequestInit;
	debug? : boolean;
	raw? : boolean;
}

const FetchApi : IFetchMainFunction = async <T extends object>( option : IQueryOptions<T> ) : Promise<Response | undefined> => {
	const method = option.method?.toUpperCase() || "GET";
	const init : RequestInit = _.merge( {
		method,
		headers: {
			"Content-Type": option.contentType || "application/json"
		}
	}, option.initOptions );

	if ( option.auth ) {
		init.headers![ "Authorization" ] = `Bearer ${ option.auth }`;
	}

	if ( option.data ) {
		if ( method === "GET" && Object.keys( option.data ).length > 0 ) {
			option.path = option.path + "?" + Object.keys( option.data ).map( ( key ) => {
				return encodeURIComponent( key ) + "=" + encodeURIComponent( option.data![ key ] );
			} ).join( "&" );
		}
		else if ( Object.keys( option.data ).length > 0 ) {
			init.body = JSON.stringify( option.data );
		}
	}

	const Response = await fetch( option.path, init );
	if ( option.debug ) {
		console.log( Response );
	}

	if ( option.raw ) {
		return Response || undefined;
	}

	if ( Response && Response.ok && Response.status === 200 ) {
		return Response;
	}
	return undefined;
};

const FetchJsonApi : IFetchJsonMainFunction = async <D extends object, T = unknown>( option : IQueryOptions<D> ) : Promise<T | undefined> => {
	const Response = await FetchApi( option );
	if ( Response ) {
		return await Response.json();
	}
	return undefined;
};

const FetchTextApi : IFetchTextMainFunction = async <D extends object>( option : IQueryOptions<D> ) : Promise<string | undefined> => {
	const Response = await FetchApi( option );
	if ( Response ) {
		return await Response.text();
	}
	return undefined;
};

const fetchCheckout : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Checkout" } );
};

const fetchCopy : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Copy" } );
};

const fetchDelete : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Delete" } );
};

const fetchGet : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Get" } );
};

const fetchHead : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Head" } );
};

const fetchLock : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Lock" } );
};

const fetchMerge : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Merge" } );
};

const fetchMkactivity : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Mkactivity" } );
};

const fetchMkcol : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Mkcol" } );
};

const fetchMove : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Move" } );
};

const fetchMSearch : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "M-search" } );
};

const fetchNotify : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Notify" } );
};

const fetchOptions : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Options" } );
};

const fetchPatch : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Patch" } );
};

const fetchPost : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Post" } );
};

const fetchPurge : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Purge" } );
};

const fetchPut : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Put" } );
};

const fetchReport : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Report" } );
};

const fetchSearch : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Search" } );
};

const fetchSubscribe : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Subscribe" } );
};

const fetchTrace : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Trace" } );
};

const fetchUnlock : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Unlock" } );
};

const fetchUnsubscribe : IFetchFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return await FetchApi( { ...opt, method: "Unsubscribe" } );
};

const fetchCheckoutText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Checkout" } );
};

const fetchCheckoutJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Checkout" } );
};

const fetchCopyText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Copy" } );
};

const fetchCopyJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Copy" } );
};

const fetchDeleteText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Delete" } );
};

const fetchDeleteJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Delete" } );
};

const fetchGetText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Get" } );
};

const fetchGetJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Get" } );
};

const fetchHeadText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Head" } );
};

const fetchHeadJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Head" } );
};

const fetchLockText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Lock" } );
};

const fetchLockJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Lock" } );
};

const fetchMergeText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Merge" } );
};

const fetchMergeJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Merge" } );
};

const fetchMkactivityText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Mkactivity" } );
};

const fetchMkactivityJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Mkactivity" } );
};

const fetchMkcolText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Mkcol" } );
};

const fetchMkcolJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Mkcol" } );
};

const fetchMoveText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Move" } );
};

const fetchMoveJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Move" } );
};

const fetchMSearchText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "M-search" } );
};

const fetchMSearchJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "M-search" } );
};

const fetchNotifyText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Notify" } );
};

const fetchNotifyJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Notify" } );
};

const fetchOptionsText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Options" } );
};

const fetchOptionsJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Options" } );
};

const fetchPatchText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Patch" } );
};

const fetchPatchJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Patch" } );
};

const fetchPostText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Post" } );
};

const fetchPostJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Post" } );
};

const fetchPurgeText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Purge" } );
};

const fetchPurgeJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Purge" } );
};

const fetchPutText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Put" } );
};

const fetchPutJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Put" } );
};

const fetchReportText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Report" } );
};

const fetchReportJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Report" } );
};

const fetchSearchText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Search" } );
};

const fetchSearchJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Search" } );
};

const fetchSubscribeText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Subscribe" } );
};

const fetchSubscribeJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Subscribe" } );
};

const fetchTraceText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Trace" } );
};

const fetchTraceJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Trace" } );
};

const fetchUnlockText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Unlock" } );
};

const fetchUnlockJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Unlock" } );
};

const fetchUnsubscribeText : IFetchTextFunction = async <D extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchTextApi( { ...opt, method: "Unsubscribe" } );
};

const fetchUnsubscribeJson : IFetchJsonFunction = async <D extends object, T extends object>( opt : Omit<IQueryOptions<D>, "method"> ) => {
	return FetchJsonApi<D, T>( { ...opt, method: "Unsubscribe" } );
};


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
	FetchApi,
	IFetchFunction,
	IFetchJsonFunction,
	IFetchMainFunction,
	IFetchJsonMainFunction,
	IFetchTextMainFunction,
	IFetchTextFunction,
	FetchTextApi,
	FetchJsonApi
};