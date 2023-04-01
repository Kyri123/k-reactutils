import {
	useEffect,
	useState
}                      from "react";
import copytoclipboard from "copy-to-clipboard";

export function useCopy<T extends any = any>( InitRef: T | undefined = undefined ) : [
	( CopyString: string, Ref?: T ) => void,
	( Ref?: T ) => boolean,
		T | undefined,
	() => void
] {
	const [ Copy, setCopy ] = useState("");
	const [ CurrentCopyRef, setRef ] = useState< T | undefined >( InitRef );

	useEffect( () => {
		if( Copy !== "" ) {
			copytoclipboard( Copy );
		}
		let Timeout = setTimeout( ClearCopy, 2000 );
		return () => {
			if( Timeout ) {
				clearTimeout( Timeout );
			}
		}
	}, [ Copy ] )

	const ClearCopy = () => {
		setCopy( "" );
	}

	const DoCopy = ( CopyString: string, Ref?: T ) => {
		setCopy( CopyString );
		setRef( Ref );
	}

	const IsCopied = (Ref?: T) => {
		if( Ref ) {
			return Copy !== "" && CurrentCopyRef === Ref;
		}
		return Copy !== "";
	}

	return [ DoCopy, IsCopied, CurrentCopyRef, ClearCopy ]
}