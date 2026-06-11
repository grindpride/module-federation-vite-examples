import {
  type MfRemoteModule,
  resolveMfRemoteModule,
  unwrapNamedExports,
} from "./mfResolveRemote";

const MF_REMOTE_LOAD_HINT =
  "Start all three apps: remoteShared (4174), remoteFeature (4175), host (4173).";

export async function mfImport<T>(
  label: string,
  loader: () => Promise<T & Partial<MfRemoteModule>>
): Promise<T> {
  const loaded = await loader();
  const resolved = await resolveMfRemoteModule(loaded, label);

  if (resolved == null) {
    throw new Error(`Module Federation remote returned empty module (${label}). ${MF_REMOTE_LOAD_HINT}`);
  }

  return unwrapNamedExports(resolved) as T;
}
