export async function fetchProducts() {
  const res = await fetch('http://localhost:3011/products/')
  const data = await res.json()
  return data
}
