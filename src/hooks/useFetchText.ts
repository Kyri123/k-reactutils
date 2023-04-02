import {
	useCallback,
	useEffect,
	useState
} from "react";

export function useFetchJson( Url: string, Options? : RequestInit ) {
	const [ IsLoading, setIsLoading ] = useState( () => true );
	const [ Result, setResult ] = useState< string >( () => "" );
	const [ Success, setSuccess ] = useState( () => false );

	const DoFetch = useCallback( async ( NewUrl?: string, NewOptions?: RequestInit ) => {
		setIsLoading( () => true );

		const Result = await fetch( NewUrl || Url, NewOptions || Options );
		const TEXT = await Result.text();

		if( Result.ok ) {
			setResult( () => TEXT );
		}
		setSuccess( () => Result.ok );
		setIsLoading( () => false );
	}, [ Url, Options ] );

	useEffect( () => {
		DoFetch().then().catch( console.error );
	}, [] )

	return {
		DoFetch,
		Result,
		IsLoading,
		Success
	}
}