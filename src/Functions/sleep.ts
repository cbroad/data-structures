export async function sleep() : Promise<void>;
export async function sleep( ms:number ) : Promise<void>;
export async function sleep( ms:number, signal:AbortSignal ) : Promise<void>;
export async function sleep( ms:number=1000, signal?:AbortSignal ) : Promise<void> {
    return new Promise<void>( ( resolve, reject ) => {
        const timer = setTimeout( onComplete, ms );
        signal?.addEventListener( "abort", onAbort );
        function onAbort( err:Event ) {
            clearTimeout( timer );
            reject( err );
        }
        function onComplete() {
            signal?.removeEventListener( "abort", onAbort );
            resolve();
        }
    } );
}