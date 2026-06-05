import { http } from "@/api/http";

export const getReservation = () =>
  http.get("/reservations");

export const createReservation = (data) =>
  http.post("/reservations", data);


export async function updateReserva(id, data) {
    try {
        const response = await http.patch(`/reservations/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar reserva:", error);
        throw error;
    }
}

export async function deleteSala(id) {
    try {
        await http.delete(`/reservations/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar reserva:", error);
        throw error;
    }
}