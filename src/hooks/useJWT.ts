import useLocalStorage from "./useLocalStorage";
import {
	useEffect,
	useState
}                                 from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";

export default function useJWT<T = any & JwtPayload>( StorageKey: string ) {
	const { Storage, SetStorage, ResetStorage } = useLocalStorage<string>( StorageKey, "" );
	const [ Session, setSession ] = useState< T & JwtPayload | undefined >( undefined );

	useEffect( () => {
		try {
			const Decode: T & JwtPayload = jwt_decode( Storage.split( Storage )[ 1 ] );
			setSession( current => Decode );
			return;
		}
		catch( e ) { console.warn( e ) }
		setSession( undefined );
	}, [ Storage ] )

	const SessionActive = () => {
		return SecondsLeft() > 0;
	}

	const SecondsLeft = () => {
		return Math.max( ( Session?.exp || 0 ) - Math.trunc( Date.now() / 1000 ), 0 );
	}

	return {
		Token: Storage,
		UpdateToken: SetStorage,
		SecondsLeft,
		SessionActive,
		Session,
		ClearSession: ResetStorage
	}
}