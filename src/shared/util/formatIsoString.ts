export function formatISOString(iso: string){
  return iso.substring(0, 10).split("-").reverse().join(".")
}