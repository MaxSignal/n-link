// Thin wrappers around the Tauri 2 global API (`app.withGlobalTauri` in tauri.conf.json).
// The bundled TypeScript is too old for the @tauri-apps/api v2 typings, so we use the globals.
/* eslint-disable @typescript-eslint/no-explicit-any */
type Event<T> = { event: string; id: number; payload: T };
type DialogFilter = { name: string; extensions: string[] };
type OpenDialogOptions = { filters?: DialogFilter[]; multiple?: boolean; directory?: boolean };

const tauri = () => (window as any).__TAURI__;

export function invoke<T = unknown>(cmd: string, args?: Record<string, unknown>): Promise<T> {
    return tauri().core.invoke(cmd, args);
}

export function listen<T = unknown>(event: string, handler: (event: Event<T>) => void): Promise<() => void> {
    return tauri().event.listen(event, handler);
}

export function openDialog(options: OpenDialogOptions): Promise<string | string[] | null> {
    return tauri().dialog.open(options);
}

export function openUrl(url: string): Promise<void> {
    return tauri().opener.openUrl(url);
}
