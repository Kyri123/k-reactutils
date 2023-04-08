import {
	useEffect,
	useState
} from "react";

export function useCopy<T = any>( InitRef? : T, AutoReset : number | undefined = 2500 ) : [
	( CopyString : string, Ref? : T ) => void,
	( Ref? : T ) => boolean,
		T | undefined,
	() => void
] {
	const [ Copy, setCopy ] = useState( "" );
	const [ CurrentCopyRef, setRef ] = useState<T | undefined>( InitRef );

	const ClearCopy = () => {
		setCopy( "" );
	};

	const DoCopy = ( CopyString : string, Ref? : T ) => {
		setCopy( CopyString );
		setRef( Ref );
	};

	useEffect( () => {
		let Timeout : NodeJS.Timeout | null = null;
		if ( IsCopied() && AutoReset && AutoReset > 0 ) {
			Timeout = setTimeout( ClearCopy, AutoReset );
		}

		return () => {
			if ( Timeout ) {
				clearTimeout( Timeout );
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ Copy, AutoReset ] );

	const IsCopied = ( Ref? : T ) => {
		if ( Ref ) {
			return Copy !== "" && CurrentCopyRef === Ref;
		}
		return Copy !== "";
	};

	return [ DoCopy, IsCopied, CurrentCopyRef, ClearCopy ];
}