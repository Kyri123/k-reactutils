import {
	useEffect,
	useState
}                       from "react";
import copytoclipboard  from "copy-to-clipboard";
import { clearTimeout } from "timers";

export function useCopy<T extends any = any>( InitRef?: T, AutoReset: number | undefined = 2500 ) : [
	( CopyString: string, Ref?: T ) => void,
	( Ref?: T ) => boolean,
		T | undefined,
	() => void
] {
	const [ Copy, setCopy ] = useState("");
	const [ CurrentCopyRef, setRef ] = useState< T | undefined >( InitRef );

	const ClearCopy = () => {
		setCopy( "" );
	}

	const DoCopy = ( CopyString: string, Ref?: T ) => {
		setCopy( CopyString );
		setRef( Ref );
	}

	useEffect( () => {
		let Timeout: NodeJS.Timeout | null = null;
		if( IsCopied() && AutoReset && AutoReset > 0 ) {
			Timeout = setTimeout( ClearCopy, AutoReset );
		}

		return () => {
			if( Timeout ) {
				clearTimeout( Timeout );
			}
		}
	}, [ Copy ] )

	const IsCopied = (Ref?: T) => {
		if( Ref ) {
			return Copy !== "" && CurrentCopyRef === Ref;
		}
		return Copy !== "";
	}

	return [ DoCopy, IsCopied, CurrentCopyRef, ClearCopy ]
}