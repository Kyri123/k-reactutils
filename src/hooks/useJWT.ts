import { useLocalStorage }        from "./useLocalStorage";
import {
	useEffect,
	useState
}                                 from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";

export function useJWT<T = any & JwtPayload>( StorageKey : string ) {
	const { Storage, SetStorage, ResetStorage } = useLocalStorage<string>( StorageKey, "" );
	const [ Session, setSession ] = useState<T & JwtPayload | undefined>( undefined );

	useEffect( () => {
		try {
			const Decode : T & JwtPayload = jwt_decode( Storage.split( Storage )[ 1 ] );
			setSession( () => Decode );
			return;
		}
		catch ( e ) {
			console.warn( e );
		}
		setSession( undefined );
	}, [ Storage ] );

	const SessionActive = () => {
		return SecondsLeft() > 0;
	};

	const GetRaw = () : T | undefined => {
		if ( !Session ) {
			return Session;
		}

		let RawSession = { ...Session };

		delete RawSession.exp;
		delete RawSession.aud;
		delete RawSession.iat;
		delete RawSession.iss;
		delete RawSession.nbf;
		delete RawSession.jti;
		delete RawSession.sub;

		return RawSession;
	};

	const SecondsLeft = () => {
		return Math.max( ( Session?.exp || 0 ) - Math.trunc( Date.now() / 1000 ), 0 );
	};

	return {
		Token: Storage,
		UpdateToken: SetStorage,
		SecondsLeft,
		SessionActive,
		Session,
		ClearSession: ResetStorage,
		GetRawSession: GetRaw
	};
}