export default async function parseData(file: Blob) {
  const text = await file.text()
  return text.split('\n')
}
