import {
	useCallback,
	useEffect,
	useState
} from "react";

export function useFetchJson<T extends {}>( Url : string, Options? : RequestInit ) {
	const [ IsLoading, setIsLoading ] = useState( true );
	const [ Result, setResult ] = useState<T>( () => ( {} as T ) );
	const [ Success, setSuccess ] = useState( false );

	const DoFetch = useCallback( async( NewUrl? : string, NewOptions? : RequestInit ) => {
		setIsLoading( () => true );

		const Result = await fetch( NewUrl || Url, NewOptions || Options );
		const JSON = await Result.json();

		if ( Result.ok ) {
			setResult( () => JSON );
		}
		setSuccess( () => Result.ok );
		setIsLoading( () => false );
	}, [ Url, Options ] );

	useEffect( () => {
		DoFetch().then().catch( console.error );
	}, [] );

	return {
		DoFetch,
		Result,
		IsLoading,
		Success
	};
}