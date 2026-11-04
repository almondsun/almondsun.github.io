/** A single flight owns cover/commit/reveal; pending navigation is latest-wins. */
export function createTransitions<T>(driver: {
  cover(): Promise<void>; commit(destination: T): Promise<void>; reveal(): Promise<void>;
  error?(error: unknown): void;
}) {
  let pending: { destination: T } | undefined;
  let running = false;
  let disposed = false;
  async function run() {
    running = true;
    try {
      while (pending && !disposed) {
        await driver.cover();
        while (pending && !disposed) {
          const next = pending.destination;
          pending = undefined;
          await driver.commit(next);
        }
        if (!disposed) await driver.reveal();
      }
    } catch (error) {
      pending = undefined;
      driver.error?.(error);
    } finally { running = false; }
  }
  return {
    get busy() { return running; },
    request(destination: T) { if (disposed) return; pending = { destination }; if (!running) void run(); },
    dispose() { disposed = true; pending = undefined; },
  };
}
