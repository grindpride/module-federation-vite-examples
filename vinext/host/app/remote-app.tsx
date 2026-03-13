"use client";

import * as React from "react";
import { type ComponentType } from "react";
import { getVinextReact } from "./nextApp";

type RemoteComponentState = {
  error: string | null;
  RemoteComponent: ComponentType | null;
};

const react = getVinextReact(React);

(globalThis as typeof globalThis & { __VINEXT_REACT__?: typeof React }).__VINEXT_REACT__ = react;

export default function RemoteApp() {
  const [state, setState] = react.useState<RemoteComponentState>({
    error: null,
    RemoteComponent: null,
  });

  react.useEffect(() => {
    let cancelled = false;

    // @ts-ignore
    void import("remote/remote-app")
      .then((module) => {
        const RemoteModule = (module as { default?: ComponentType | null }).default;
        if (!RemoteModule) {
          throw new Error("Remote module did not expose a default component.");
        }
        return RemoteModule;
      })
      .then((RemoteModule) => {
        if (!cancelled) {
          setState({ error: null, RemoteComponent: RemoteModule });
        }
      })
      .catch((loadError) => {
        if (!cancelled) {
          setState({
            error: loadError instanceof Error ? loadError.message : String(loadError),
            RemoteComponent: null,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [setState]);

  if (state.error) {
    return (
      <div
        style={{
          background: "#4b1f1f",
          borderRadius: "10px",
          color: "white",
          maxWidth: "260px",
          padding: "20px",
        }}
      >
        Failed to load remote: {state.error}
      </div>
    );
  }

  const { RemoteComponent } = state;
  return RemoteComponent ? <RemoteComponent /> : null;
}
