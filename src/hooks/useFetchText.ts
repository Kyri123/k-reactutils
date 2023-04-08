import {
	useCallback,
	useEffect,
	useState
} from "react";

export function useFetchText( Url : string, Options? : RequestInit, InitValue? : string ) {
	const [ IsLoading, setIsLoading ] = useState( () => true );
	const [ Result, setResult ] = useState<string | undefined>( () => InitValue );
	const [ Success, setSuccess ] = useState( () => false );

	const DoFetch = useCallback( async( NewUrl? : string, NewOptions? : RequestInit ) => {
		setIsLoading( () => true );

		const Result = await fetch( NewUrl || Url, NewOptions || Options );
		const TEXT = await Result.text();

		if ( Result.ok ) {
			setResult( () => TEXT );
		}
		setSuccess( () => Result.ok );
		setIsLoading( () => false );
	}, [ Url, Options ] );

	useEffect( () => {
		DoFetch().then().catch( console.error );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	return {
		DoFetch,
		Result,
		IsLoading,
		Success
	};
}