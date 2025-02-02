
export function formDate(date: Date | string): string {
    if (!date) return ''; // Manejar valores nulos o indefinidos
    const fecha = new Date(date); // Asegurar que sea un objeto Date
    return fecha.toISOString().split('T')[0]; // Retorna YYYY-MM-DD
  }