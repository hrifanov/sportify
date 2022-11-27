export async function* asyncQueueGenerator() {
  while (true) {
    const action = yield;
    try {
      await action();
    } catch (err) {
      console.error(err);
    }
  }
}
