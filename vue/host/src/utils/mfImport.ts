type MfModule = {
  default?: unknown;
  __mf_remote_pending?: Promise<unknown>;
};

const MF_REMOTE_LOAD_HINT =
  "Start all three apps: remoteShared (4174), remoteFeature (4175), host (4173).";

export async function mfImport<T>(loader: () => Promise<T & Partial<MfModule>>): Promise<T> {
  let mod = await loader();

  const remotePending =
    mod != null && "__mf_remote_pending" in mod
      ? (mod as Partial<MfModule>).__mf_remote_pending
      : undefined;

  if (remotePending) {
    mod = (await remotePending) as T & Partial<MfModule>;
  }

  if (mod == null) {
    throw new Error(`Module Federation remote returned empty module. ${MF_REMOTE_LOAD_HINT}`);
  }

  return mod;
}

export async function mfImportDefault<T>(
  loader: () => Promise<{ default?: T } & Partial<MfModule>>
): Promise<T> {
  const mod = await mfImport(loader);
  const component = mod.default ?? mod;

  if (component == null) {
    throw new Error(`Module Federation remote has no default export. ${MF_REMOTE_LOAD_HINT}`);
  }

  return component as T;
}
