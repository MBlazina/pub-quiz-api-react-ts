function generateRandom64BitInt() {
  const randomInt = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
  console.log("random: " + randomInt);
  return randomInt;
}

export async function generateUniqueIdCheckArray(array: []) {
  let newId = generateRandom64BitInt().toString();
  while (array.some((item: any) => item.id === newId)) {
    newId = generateRandom64BitInt().toString();
  }
  console.log(newId);
  return newId;
}
