export const createPromiseFunc = func =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await func();
      return resolve(res);
    } catch (e) {
      return reject(e);
    }
  });
