import {
	useEffect,
	useRef,
	useState
} from "react";

export interface IUseLocalStorage<T> {
	// Get the storage value
	Storage : T,
	// Set the storage value
	SetStorage : ( Value : T ) => void,
	// Reset the storage to default
	ResetStorage : () => void
}

export function useLocalStorage<T = any>( Key : string, InitValue : T ) : IUseLocalStorage<T> {
	const InitRef = useRef<T>( InitValue );

	// update if InitValue was updated
	useEffect( () => {
		InitRef.current = InitValue;
	}, [ InitValue ] );

	const DoInitStorage = () => {
		const LocalStorageValue = window.localStorage.getItem( Key );

		if ( LocalStorageValue ) {
			if ( typeof InitRef.current === "object" ) {
				const Storage = {
					...InitRef.current,
					...JSON.parse( LocalStorageValue )
				};

				window.localStorage.setItem( Key, typeof InitValue === "object" ? JSON.stringify( Storage ) : ( Storage as string | number ).toString() );
				return Storage;
			}

			return LocalStorageValue;
		}


		window.localStorage.setItem( Key, typeof InitValue === "object" ? JSON.stringify( InitRef.current ) : ( InitRef.current as string | number ).toString() );
		return InitRef.current;
	};

	const [ Storage, setStorage ] = useState( DoInitStorage );

	// update if storage was updated
	useEffect( () => {
		const Event = ( e : StorageEvent ) => {
			if ( e.newValue !== Storage && e.key === Key ) {
				if ( typeof InitRef.current === "object" && e.newValue ) {
					setStorage( () => JSON.parse( e.newValue! ) );
					return;
				}
				setStorage( () => e.newValue );
			}
		};

		window.addEventListener( "storage", Event );

		return () => {
			window.removeEventListener( "storage", Event );
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	const SetStorage = ( Value : T ) => {
		window.localStorage.setItem( Key, typeof InitValue === "object" ? JSON.stringify( Value ) : ( Value as string | number ).toString() );
		setStorage( Value );
		return;
	};

	const ResetStorage = () => {
		window.localStorage.removeItem( Key );
		setStorage( DoInitStorage() );
	};

	return {
		Storage: Storage,
		SetStorage: SetStorage,
		ResetStorage: ResetStorage
	};
}