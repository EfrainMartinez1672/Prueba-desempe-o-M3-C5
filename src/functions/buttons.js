import { getReservation } from "../services/reservation.service"
import { updateReserva, deleteSala, createReservation } from "../services/reservation.service";
import { getSession } from "../utils";

let currentEditingId = null;
const user = getSession();
function btnsFunctions() {
    let container = document.getElementById('reservationsContainer')

    container.addEventListener('click', async (event) => {
        if (event.target.id.includes("btnEdit")) {
            alert("hola")
            event.preventDefault

            const id = event.target.dataset.id
            salaEdit(id)
        }
        if (event.target.id.includes("btnDelete")) {
            alert("hello")
            const id = event.target.dataset.id;
            deleteSalaConfirm(id)
        }
    })
    let container2 = document.getElementById('form-edit')
    container2.addEventListener('submit', saveSala)

    let conatiner3 = document.getElementById('navcito')
    conatiner3.addEventListener('click', (event) => {
        openCreateModal();
    })
}

function showForm() {
    const form = document.getElementById('form-edit');
    if (form) {
        form.classList.remove('hidden')
        form.classList.remove('block')
    }
    }

function hideForm() {
    const form = document.getElementById('form-edit');
    if (form) {
        form.classList.remove('block')
        form.classList.remove('hidden')
    }
}

function openCreateModal() {
    currentEditingId = null;
    const form = document.getElementById('form-edit');
    if (form) form.reset();
    document.querySelector('#form-edit h2').textContent = "Crear nueva reserva";
    showForm();
}

async function salaEdit(id) {
    const salaId = id.trim() 
    
    if (!salaId) {
        alert("Error: ID inválido");
        return;
    }
    currentEditingId = salaId;

    const salaReservas = await getReservation()

    const salaReservada = salaReservas.find(t => 
        t.id === salaId || 
        t.id == salaId
    );

    if (!salaReservada) {
        alert(`No se encontró reserva con ID: ${salaId}`)
        return
    }
    showForm();
    
    document.getElementById('newSala').value = salaReservada.workspace || "N/A";
    document.getElementById('newFecha').value = salaReservada.date || "N/A";
    document.getElementById('newTime').value = salaReservada.startHour || "N/A";
    document.getElementById('endTime').value = salaReservada.endHour || "N/A";
    document.getElementById('newMotivo').value = salaReservada.reason || "N/A";
    document.getElementById('newStatus').value = salaReservada.status || "N/A";
    
}
async function saveSala(e) {
    e.preventDefault();
    // ... (mantengo igual)
    const salaData = {
        workspace: document.getElementById('newSala').value,
        date: document.getElementById('newFecha').value,
        startHour: document.getElementById('newTime').value,
        endHour: document.getElementById('endTime').value,
        reason: document.getElementById('newMotivo').value,
        status: document.getElementById('newStatus').value
    };

    try {
        if (currentEditingId) {
            await updateReserva(currentEditingId, salaData);
            alert("✅ Ticket actualizado");
        } else {
            salaData.userId = Number(user.id);
            createReservation(salaData)
            alert("hola")
        }

        hideForm();
    } catch (error) {
        console.error(error);
        alert("❌ Error al guardar");
    }
}

async function deleteSalaConfirm(id) {
    if (!id) {
        alert("Error: No se encontró el ID del ticket");
        return;
    }

    if (confirm("¿Eliminar esta reserva?")) {
        await deleteSala(id);
        alert("✅ reserva eliminado");
    }
}
export {btnsFunctions} 