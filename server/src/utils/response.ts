export function ok<T>(data: T, meta?: Record<string, any>) {
    return { ok: true, data, meta };
}
export function fail(message: string, code = 'BAD_REQUEST', details?:any) {
    return { ok: false, code, message, details };
} 
